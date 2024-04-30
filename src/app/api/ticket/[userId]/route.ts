import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const user = await prisma.user.findUnique({
    where: {
      id: params.userId,
    },
    select: {
      ticket: {
        select: {
          id: true,
          publicKey: true,
        },
      },
    },
  });

  return NextResponse.json({
    publicKey: user?.ticket?.publicKey,
    id: user?.ticket?.id,
  });
}
