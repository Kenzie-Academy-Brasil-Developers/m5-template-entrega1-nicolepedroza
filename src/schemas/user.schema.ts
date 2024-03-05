import { z } from "zod";
import { baseSchema } from "./base.schema";

export const userSchema = baseSchema.extend({
    name: z.string().min(1),
    email: z.string().email().min(1),
    password: z.string().min(1)
})

export type TUser = z.infer<typeof userSchema>

export const userCreateSchema = userSchema.omit({id: true})

export const userLogin = userSchema.omit({id: true, name: true})

export type TUserLogin = z.infer<typeof userLogin>

export type TUserCreate = z.infer<typeof userCreateSchema>

export const userCreateReturn = userSchema.omit({password: true})

export type TUserReturn = z.infer<typeof userCreateReturn>


export type TUserLoginReturn = {
    accessToken: string,
    user: TUserReturn
} 