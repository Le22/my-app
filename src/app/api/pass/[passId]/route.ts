import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { passFormSchema } from "@/lib/zod";
import { RoleEnum } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { passId: string } }
) {
  const session = await auth();

  if (!session?.user?.role)
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  if (session?.user?.role !== RoleEnum.Admin)
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );

  try {
    const { title } = await passFormSchema.parseAsync(await request.json());

    const pass = await prisma.pass.update({
      where: {
        id: params.passId,
      },
      data: {
        title,
      },
    });

    return NextResponse.json(pass);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function GET(
  request: Request,
  { params }: { params: { passId: string } }
) {
  const pass = await prisma.pass.findUnique({
    where: {
      id: params.passId,
    },
    select: {
      id: true,
      title: true,
    },
  });

  return NextResponse.json(pass);
}
