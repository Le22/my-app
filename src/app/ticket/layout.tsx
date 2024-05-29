import { auth, signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export default async function TicketLayout({ children }: Props) {
  const session = await auth();

  if (!session?.user)
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-10">
        <form
          action={async () => {
            "use server";
            await signIn();
          }}
        >
          <Button type="submit">Se connecter</Button>
        </form>
      </div>
    );

  const ticket = await prisma.ticket.findUnique({
    where: {
      userId: session?.user?.id!,
    },
    select: {
      publicKey: true,
    },
  });

  if (!ticket?.publicKey) return redirect("/payment");

  return children;
}
