"use client";

import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const PaymentPage = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const session = useSession();

  console.log(session);

  const updateTicket = useMutation({
    mutationKey: ["ticket"],
    mutationFn: ({ userId }: { userId: string }) =>
      fetch(`api/ticket`, {
        method: "PUT",
        body: JSON.stringify({ userId }),
      }),
    onSuccess: (data) => {
      queryClient.refetchQueries({
        queryKey: ["ticket"],
      });
      return data;
    },
  });
  const handleClick = () => {
    updateTicket.mutate(
      { userId: session.data?.user?.id! },
      {
        onSuccess: () => {
          router.push("/ticket");
        },
      }
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 p-24">
      <h1 className="text-5xl font-bold">Paiement</h1>
      <Button onClick={handleClick}>Activer votre pass</Button>
    </main>
  );
};

export default PaymentPage;
