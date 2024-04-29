import prisma from "@/lib/prisma";
import { passFormSchema } from "@/lib/zod";
import { NextResponse } from "next/server";

export async function GET() {
  const pass = await prisma.pass.findMany({
    select: {
      id: true,
      title: true,
    },
  });

  return NextResponse.json(pass);
}

export async function POST(request: Request) {
  try {
    const { title } = await passFormSchema.parseAsync(await request.json());

    const pass = await prisma.pass.create({
      data: {
        title,
      },
    });

    return NextResponse.json(pass);
  } catch (error: any) {
    throw new Error(error);
  }
}
