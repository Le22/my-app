import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./lib/prisma";
import { RoleEnum } from "@prisma/client";
import { newUser } from "./service/user/newUser";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { hashPassword, isSamePassword } from "./lib/password";

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
        email: {
          label: "Email ou nom d'utilisateur",
        },
        password: {
          label: "Mot de passe",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        let user = null;

        const params = new URL(req.url).searchParams;

        const username = params.get("userName")!;
        const pass = params.get("pass")!;

        const { email, password }: any = credentials;

        const pwHash = await hashPassword(password);

        user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          return await newUser({ email, password, username, pass, pwHash });
        }

        const samePassword = await isSamePassword(password, user.password);

        if (!samePassword) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
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
  secret: process.env.AUTH_SECRET,
});
