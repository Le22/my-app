// // auth.mock.ts
// import { RoleEnum } from "@prisma/client";
// import { hashPassword, isSamePassword } from "@/lib/password";
// import prisma from "@/lib/prisma";

// const NAMock = {
//   auth: jest.fn().mockImplementation(() => ({
//     session: {
//       jwt: true,
//     },
//     jwt: {
//       secret: process.env.NEXTAUTH_SECRET,
//     },
//     signIn: jest.fn(),
//     signOut: jest.fn(),
//     handlers: {
//       GET: jest.fn(),
//       POST: jest.fn(),
//     },
//   })),
//   signIn: jest.fn().mockImplementation(async (credentials) => {
//     const { email, password } = credentials;
//     const user = await prisma.user.findUnique({ where: { email } });
//     if (!user) {
//       return null;
//     }
//     const samePassword = await isSamePassword(password, user.password);
//     if (!samePassword) {
//       return null;
//     }
//     return {
//       id: user.id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//     };
//   }),
//   signOut: jest.fn(),
//   handlers: {
//     GET: jest.fn(),
//     POST: jest.fn(),
//   },
//   newUser: jest
//     .fn()
//     .mockImplementation(async ({ email, password, username, pass, pwHash }) => {
//       return await prisma.user.create({
//         data: {
//           email,
//           password: pwHash,
//           name: username,
//           role: RoleEnum.User,
//           key: pass,
//         },
//       });
//     }),
// };

// export const {
//   auth,
//   signIn,
//   signOut,
//   handlers: { GET, POST },
// } = NAMock;
