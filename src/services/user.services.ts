import { TUserCreate, TUserLogin, TUserLoginReturn, TUserReturn, userCreateReturn } from "../schemas/user.schema";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { prisma } from "../database/prisma";
import { AppError } from "../middlewares/App.Error";

export class UserServices{
    async register(body: TUserCreate): Promise<TUserReturn>{
        
        const hashPassword = await bcrypt.hash(body.password, 10) 

        const newUser = {
            ...body,
            password: hashPassword
        }
        const user = await prisma.user.create({data: newUser})

        return userCreateReturn.parse(user)
    }

    async login(body: TUserLogin): Promise<TUserLoginReturn>{
        const user = await prisma.user.findFirst({where: {email: body.email}})
        
        if(!user){
            throw new AppError("User not exists", 404)    
        }
        
        const compare = await bcrypt.compare(body.password, user.password)
        
        if(!compare){
            throw new AppError("Email and password doesn't match", 401)
        }
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET as string)

        return {accessToken: token, user: userCreateReturn.parse(user)}
    }

    async getUser(id: number): Promise<TUserReturn>{
        const user = await prisma.user.findFirst({where: {id}})
        return userCreateReturn.parse(user)
    }
}