import { z } from "zod"

const EmailSchema = z.object({
    email: z.string().email({ message: "Invalid email format" }),
})

export default EmailSchema