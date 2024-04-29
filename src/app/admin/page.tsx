"use client";

import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormPass } from "@/components/specific/pass/FormPass";
import { passFormSchema } from "@/lib/zod";
import { z } from "zod";

const AdminPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const pass = useQuery({
    queryKey: ["pass"],
    queryFn: () => fetch("api/pass").then((res) => res.json()),
  });

  const tickets = useQuery({
    queryKey: ["tickets"],
    queryFn: () => fetch("api/ticket").then((res) => res.json()),
  });

  const createPass = useMutation({
    mutationKey: ["pass"],
    mutationFn: ({ title }: { title: string }) =>
      fetch("api/pass", { method: "POST", body: JSON.stringify({ title }) }),
    onSuccess: (data) => {
      queryClient.refetchQueries({
        queryKey: ["pass"],
      });
      return data;
    },
  });

  const updatePass = useMutation({
    mutationKey: ["pass"],
    mutationFn: ({ title, id }: { title: string; id?: string }) =>
      fetch(`api/pass/${id}`, {
        method: "PUT",
        body: JSON.stringify({ title }),
      }),
    onSuccess: (data) => {
      queryClient.refetchQueries({
        queryKey: ["pass"],
      });
      return data;
    },
  });

  function onCreatePass(values: z.infer<typeof passFormSchema>) {
    createPass.mutate(values);
  }

  function onUpdatePass(values: z.infer<typeof passFormSchema>) {
    updatePass.mutate(values);
  }

  return (
    <main className="flex min-h-screen flex-col gap-20 items-center p-24 relative">
      <Button
        variant={"secondary"}
        onClick={() => router.push("/")}
        className="absolute top-12 left-12"
      >
        Retour accueil
      </Button>
      <h1 className="text-5xl font-bold">Admin</h1>

      <div className="flex items-center justify-between w-full">
        <h2 className="text-3xl font-medium">Liste des pass</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Ajouter</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter un pass</DialogTitle>
            </DialogHeader>
            <FormPass actionText={"Ajouter"} onSubmit={onCreatePass} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col gap-2 w-full divide-y">
        {pass.data?.map((pass: any) => (
          <div key={pass.id} className="flex justify-between items-center p-2">
            <p>{pass.title}</p>
            <div className="flex gap-2 items-center">
              <p className="text-sm text-slate-500">
                <span>
                  {
                    tickets.data?.filter(
                      (ticket: any) => ticket.passId === pass.id
                    ).length
                  }
                </span>{" "}
                ticket(s)
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant={"outline"} size={"sm"} className="">
                    Modifier
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Modifier le pass</DialogTitle>
                  </DialogHeader>
                  <FormPass
                    actionText={"Modifier"}
                    onSubmit={onUpdatePass}
                    title={pass.title}
                    id={pass.id}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default AdminPage;
