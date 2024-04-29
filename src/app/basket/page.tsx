"use client";

import { FormBasket } from "@/components/specific/basket/FormBasket";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const BasketPage = () => {
  const router = useRouter();

  const passId = localStorage.getItem("pass");

  const pass = useQuery({
    queryKey: ["pass", passId],
    queryFn: () => fetch(`api/pass/${passId}`).then((res) => res.json()),
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 relative">
      <Button
        variant={"secondary"}
        onClick={() => router.back()}
        className="absolute top-12 left-12"
      >
        Retour
      </Button>
      <h1 className="text-5xl font-bold">Réserver votre pass</h1>
      <Button
        variant={"outline"}
        className="flex flex-col gap-2 items-start justify-between p-4 h-auto w-[200px]"
      >
        <Badge>Pass</Badge>
        <p className="text-lg">{pass.data?.title}</p>
      </Button>
      <FormBasket />
    </main>
  );
};

export default BasketPage;
