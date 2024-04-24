"use client";

import Header from "@/components/generic/Header";
import { Button } from "@/components/ui/button";
import { useCallback } from "react";
import { toast } from "sonner";

const TicketingPage = () => {
  const handleSelectPass = useCallback((pass: string) => {
    localStorage.setItem("pass", pass.toString());
    toast.success("Le pass a été ajouté au panier");
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-10">
      <Header />
      <h1 className="text-5xl font-bold">Billetterie</h1>
      <div className="grid grid-cols-3 gap-10">
        <Button onClick={() => handleSelectPass("1")}>Pass 1 personne</Button>
        <Button onClick={() => handleSelectPass("2")}>Pass 2 personnes</Button>
        <Button onClick={() => handleSelectPass("3")}>Pass 4 personnes</Button>
      </div>
      <div></div>
    </main>
  );
};

export default TicketingPage;
