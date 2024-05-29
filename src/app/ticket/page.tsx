"use client";

import Header from "@/components/generic/Header";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { QRCodeSVG } from "qrcode.react";

const TicketPage = () => {
  const session = useSession();

  const ticket = useQuery({
    queryKey: ["ticket"],
    queryFn: () => fetch(`api/ticket/${userId}`).then((res) => res.json()),
  });

  if (!session.data?.user) return null;

  const userId = session.data?.user?.id!;

  ticket.refetch();

  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-20 px-10">
      <Header />
      <h1 className="text-5xl font-bold">
        {session.data?.user?.name} voici votre ticket
      </h1>
      {ticket.isLoading ? (
        <Skeleton className="w-[260px] h-[260px]" />
      ) : (
        <QRCodeSVG
          value={ticket.data?.publicKey ?? ""}
          size={260}
          bgColor={"#ffffff"}
          fgColor={"#333333"}
          level={"Q"}
          includeMargin={false}
        />
      )}
    </main>
  );
};

export default TicketPage;
