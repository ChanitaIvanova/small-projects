import { z } from "zod"

export const PasswordSchema = z.object({
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
})

export const ConfirmPasswordSchema = z.object({
    password: z.string(),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})