"use client";

import { FormBasket } from "@/components/specific/basket/FormBasket";
import { useMemo } from "react";

const BasketPage = () => {
  const pass = useMemo(() => {
    return localStorage.getItem("pass");
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-5xl font-bold">Réserver votre pass</h1>
      <div className="bg-slate-100 rounded-md flex items-center justify-between p-4">
        <p>Id du Pass</p>
        <p>{pass}</p>
      </div>
      <FormBasket />
    </main>
  );
};

export default BasketPage;
