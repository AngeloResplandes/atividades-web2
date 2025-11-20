import { z } from "zod";

export const loginSchema = z.object({
    email: z.email("Formato de e-mail inválido").min(2, "O e-mail é obrigatório"),
    password: z.string().min(8, "A senha é obrigatória"),
});

export const registerSchema = z.object({
    name: z.string().min(2, "O nome é obrigatório"),
    email: z.email("Formato de e-mail inválido").min(1, "O e-mail é obrigatório"),
    password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres"),
});
