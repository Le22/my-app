"use client";

import Header from "@/components/generic/Header";
import CardPass from "@/components/specific/pass/CardPass";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";

const TicketingPage = () => {
  const pass = useQuery({
    queryKey: ["pass"],
    queryFn: () => fetch("api/pass").then((res) => res.json()),
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-10">
      <Header />
      <h1 className="text-5xl font-bold">
        Choisissez la formule qui vous convient
      </h1>
      <div className="grid grid-cols-3 gap-10">
        {pass.data ? (
          pass.data.map((pass: any) => <CardPass key={pass.id} {...pass} />)
        ) : (
          <>
            <Skeleton className="w-[200px] h-[100px]" />
            <Skeleton className="w-[200px] h-[100px]" />
            <Skeleton className="w-[200px] h-[100px]" />
          </>
        )}
      </div>
      <div></div>
    </main>
  );
};

export default TicketingPage;
