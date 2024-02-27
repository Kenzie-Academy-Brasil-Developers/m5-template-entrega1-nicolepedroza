import { z } from "zod";
import { baseSchema } from "./base.schema";

export const categorySchema = baseSchema.extend({
    name: z.string()
})

export const categoryCreateSchema = categorySchema.omit({id: true})

export type TCategoryCreate = z.infer<typeof categoryCreateSchema>

export type TCategoryReturn = z.infer<typeof categorySchema>