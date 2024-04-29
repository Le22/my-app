"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { passFormSchema } from "@/lib/zod";
import { DialogClose } from "@/components/ui/dialog";

interface Props {
  title?: string;
  id?: string;
  actionText: string;
  onSubmit(values: z.infer<typeof passFormSchema>): void;
}

export function FormPass({ title, id, actionText, onSubmit }: Props) {
  const form = useForm<z.infer<typeof passFormSchema>>({
    resolver: zodResolver(passFormSchema),
    defaultValues: {
      title,
      id,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre du pass</FormLabel>
              <FormControl>
                <Input placeholder="1 personne" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogClose>
          <Button type="submit">{actionText}</Button>
        </DialogClose>
      </form>
    </Form>
  );
}
