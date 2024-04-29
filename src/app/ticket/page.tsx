"use client";

import Header from "@/components/generic/Header";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { QRCodeSVG } from "qrcode.react";

const TicketPage = () => {
  const session = useSession();

  const userId = session.data?.user?.id!;

  const ticket = useQuery({
    queryKey: ["ticket"],
    queryFn: () => fetch(`api/ticket/${userId}`).then((res) => res.json()),
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-20 px-10">
      <Header />
      <h1 className="text-5xl font-bold">Votre ticket</h1>
      <QRCodeSVG
        value={ticket.data?.publicKey ?? ""}
        size={260}
        bgColor={"#ffffff"}
        fgColor={"#000000"}
        level={"L"}
        includeMargin={false}
        imageSettings={{
          src: "/assets/paris-2024-logo.svg",
          x: undefined,
          y: undefined,
          height: 64,
          width: 64,
          excavate: true,
        }}
      />
    </main>
  );
};

export default TicketPage;
