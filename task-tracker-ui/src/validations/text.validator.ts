import { z } from "zod"

export const TextSchema = (fieild: string, max: number, min: number) => {
    return z.object({
        [fieild]: z.string().min(min, { message: `The field must be at least ${min} characters long` }).max(max, { message: `The field must be at most ${max} characters long` }),
    })
}
