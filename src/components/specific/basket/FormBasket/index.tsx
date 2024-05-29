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
import { userFormSchema } from "@/lib/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function FormBasket() {
  const router = useRouter();

  const pass =
    typeof window !== "undefined" ? localStorage.getItem("pass") : undefined;

  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      pass: pass!,
    },
  });

  function onSubmit(values: z.infer<typeof userFormSchema>) {
    signIn(
      "credentials",
      {
        email: values.email,
        password: values.password,
        callbackUrl: "/payment",
      },
      {
        userName: values.username,
        pass: values.pass,
      }
    );
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
                <Input type="password" placeholder="********" {...field} />
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
