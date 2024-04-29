import prisma from "@/lib/prisma";
import { userFormSchema } from "@/lib/zod";
import { RoleEnum } from "@prisma/client";
import { z } from "zod";

interface Props extends z.infer<typeof userFormSchema> {
  pwHash: string;
}

export async function newUser({
  email,
  password,
  username,
  pass,
  pwHash,
}: Props) {
  async function generateKey() {
    let trying = 0;

    const key = Math.random().toString(36).repeat(32);

    const userSameKey = await prisma.user.findUnique({
      where: {
        key: key,
      },
    });

    if (userSameKey) {
      if (trying > 10) {
        throw new Error("Impossible de generer une cle");
      }
      trying++;
      generateKey();
    }

    return key;
  }

  const key = await generateKey();

  const newUser = await prisma.user.create({
    data: {
      name: username,
      email,
      role: RoleEnum.User,
      password: pwHash,
      key,
      ticket: {
        create: {
          passId: pass,
        },
      },
    },
  });

  return newUser;
}
