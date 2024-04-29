import prisma from "@/lib/prisma";
import { passFormSchema } from "@/lib/zod";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { passId: string } }
) {
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
