"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

const formSchema = z.object({
  username: z.string().min(1, { message: "Le nom d'utilisateur est requis" }),
  email: z.string().email({ message: "Entrez une adresse email valide" }),
  password: z
    .string()
    .min(1, { message: "Le mot de passe est requis" })
    .regex(passwordValidation, {
      message:
        "Le mot de passe doit contenir au moins 8 caractères et une majuscule, une minuscule, un chiffre et un caractère speciaux",
    }),
});

export function FormBasket() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom d&apos;utilisateur</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormDescription>
                Le nom d&apos;utilisateur doit comporter votre nom et prénom
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="contact@me.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <Input placeholder="********" {...field} />
              </FormControl>
              <FormDescription>
                Le mot de passe doit contenir au moins 8 caractères et une
                majuscule, une minuscule, un chiffre et un caractère speciaux
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Créez votre compte</Button>
      </form>
    </Form>
  );
}
