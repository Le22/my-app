import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const tickets = await prisma.ticket.findMany({
    select: {
      id: true,
      passId: true,
    },
  });

  return NextResponse.json(tickets);
}

export async function PUT(request: Request) {
  try {
    const { userId } = await request.json();

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        key: true,
        ticket: {
          select: {
            id: true,
          },
        },
      },
    });

    const key = Math.random().toString(36).repeat(32);

    const publicKey = user!.key + key;

    const ticket = await prisma.ticket.update({
      where: {
        id: user?.ticket?.id,
      },
      data: {
        key,
        publicKey: publicKey,
      },
    });

    return NextResponse.json({
      id: ticket.id,
      key,
    });
  } catch (error: any) {
    throw new Error(error);
  }
}
