import { auth } from "@/auth";
import { RoleEnum } from "@prisma/client";

interface Props {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: Props) {
  const session = await auth();

  if (session?.user?.role !== RoleEnum.Admin) return null;

  return <>{children}</>;
}
