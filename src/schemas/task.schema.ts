import { z } from "zod";
import { baseSchema } from "./base.schema";
import { categorySchema } from "./category.schema";

export const taskSchema = baseSchema.extend({
    title: z.string(),
    content: z.string(),
    finished: z.boolean().default(false),
    userId: z.number().nullable(),
    category: categorySchema
})


export const taskCreateSchema = taskSchema.omit({id: true, finished: true, category: true, userId: true}).extend({categoryId:  z.number().positive().optional()})

export const taskCreateSchema2 = taskSchema.omit({id: true, category: true}).extend({categoryId:  z.number().positive().nullable()})

export const taskUpdateSchema = taskCreateSchema2.partial()

export const taskReturnCreateSchema = taskSchema.omit({category: true}).extend({categoryId: z.number().positive().nullable()})

export const taskReturnSchema = taskSchema.extend({category: categorySchema})

export type TaskReturn = z.infer<typeof taskReturnSchema>

export type TaskCreateReturn = z.infer<typeof taskReturnCreateSchema>

export type TaskCreate = z.infer<typeof taskCreateSchema>

export type TaskUpdate = z.infer<typeof taskUpdateSchema>
