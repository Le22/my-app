"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pass } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "sonner";

interface Props extends Pick<Pass, "id" | "title"> {}

const CardPass = ({ id, title }: Props) => {
  const router = useRouter();

  const handleSelectPass = useCallback(
    (pass: string) => {
      typeof window !== "undefined" &&
        localStorage.setItem("pass", pass.toString());
      toast.success("Le pass a été ajouté au panier", {
        action: {
          label: "Voir le panier",
          onClick: () => router.push("/basket"),
        },
      });
    },
    [router]
  );

  return (
    <Button
      variant={"outline"}
      className="flex flex-col gap-4 items-stretch justify-between p-4 h-auto w-[200px]"
      onClick={() => handleSelectPass(id)}
    >
      <Badge className="self-start">Pass</Badge>
      <p className="text-xl">{title}</p>
      <Button size={"sm"} variant={"secondary"}>
        Choisir
      </Button>
    </Button>
  );
};

export default CardPass;
