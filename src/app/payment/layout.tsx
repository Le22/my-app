import { auth } from "@/auth";

interface Props {
  children: React.ReactNode;
}

export default async function PaymentLayout({ children }: Props) {
  const session = await auth();

  if (!session?.user) return null;
  console.log(session);
  return children;
}
