import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod";
import { userFormSchema } from "./lib/zod";
import prisma from "./lib/prisma";
import { RoleEnum } from "@prisma/client";
import bcrypt from "bcrypt";
import { newUser } from "./service/user/newUser";
import { PrismaAdapter } from "@auth/prisma-adapter";

declare module "next-auth" {
  interface User {
    role?: RoleEnum;
    key?: string;
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser {
    role?: RoleEnum;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
        userName: {},
        pass: {},
      },
      async authorize(credentials) {
        try {
          let user = null;

          const { email, password, username, pass } =
            await userFormSchema.parseAsync(credentials);

          const pwHash = await bcrypt.hash(password, 10);

          user = await prisma.user.findUnique({
            where: {
              email,
            },
          });

          if (!user) {
            return await newUser({ email, password, username, pass, pwHash });
          }

          if (pwHash !== user.password) {
            return null;
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          if (error instanceof ZodError) {
            return null;
          }
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      // Assign the user ID and role from JWT to the session
      session.user.id = token.id as string;
      session.user.role = token.role as RoleEnum;
      return session;
    },
  },
  pages: {
    newUser: "/payment",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
