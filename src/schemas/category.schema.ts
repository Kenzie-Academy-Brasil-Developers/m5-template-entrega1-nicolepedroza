import { z } from "zod";
import { baseSchema } from "./base.schema";

export const categorySchema = baseSchema.extend({
    name: z.string(),
    userId: z.number().nullable()
})

export const categoryCreateSchema = categorySchema.omit({id: true, userId: true})

export type TCategoryCreate = z.infer<typeof categoryCreateSchema>

export type TCategoryReturn = z.infer<typeof categorySchema>