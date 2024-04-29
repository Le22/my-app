import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const ticket = await prisma.ticket.findUnique({
    where: {
      id: params.userId,
    },
    select: {
      id: true,
      publicKey: true,
    },
  });

  return NextResponse.json(ticket);
}
