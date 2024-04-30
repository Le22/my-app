import { hashPassword } from "@/lib/password";
import prisma from "../src/lib/prisma";
import { RoleEnum } from "@prisma/client";

async function main() {
  const adminPassword = "#admin-paris-2024-mdp#";

  const hash = await hashPassword(adminPassword);

  await prisma.user.upsert({
    where: { email: "admin-paris-2024" },
    update: {},
    create: {
      name: "admin-paris-2024",
      email: "admin-paris-2024",
      password: hash,
      key: "",
      role: RoleEnum.Admin,
    },
  });

  await prisma.pass.upsert({
    where: {
      id: "1",
    },
    update: {},
    create: {
      id: "1",
      title: "Offre solo",
    },
  });

  await prisma.pass.upsert({
    where: {
      id: "2",
    },
    update: {},
    create: {
      id: "2",
      title: "Offre duo",
    },
  });

  await prisma.pass.upsert({
    where: {
      id: "3",
    },
    update: {},
    create: {
      id: "3",
      title: "Offre familiale",
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
