import { z } from "zod";

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

export const userFormSchema = z.object({
  username: z.string().min(1, { message: "Le nom d'utilisateur est requis" }),
  pass: z.string(),
  email: z.string().email({ message: "Entrez une adresse email valide" }),
  password: z
    .string()
    .min(1, { message: "Le mot de passe est requis" })
    .regex(passwordValidation, {
      message:
        "Le mot de passe doit contenir au moins 8 caractères et une majuscule, une minuscule, un chiffre et un caractère speciaux",
    }),
});

export const passFormSchema = z.object({
  title: z.string().min(1, { message: "Le titre est requis" }),
  id: z.string().optional(),
});
