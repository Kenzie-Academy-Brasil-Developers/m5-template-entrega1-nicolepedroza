import { Request, Response } from "express"
import { UserServices } from "../services/user.services"

export class UserControllers{
    async register(req: Request, res: Response): Promise<Response>{
        const userServices = new UserServices()

        const newUser = await userServices.register(req.body)

        return res.status(201).json(newUser)
    }
    
    async login(req: Request, res: Response): Promise<Response>{
        const userServices = new UserServices()

        const loginUser = await userServices.login(req.body)
        return res.status(200).json(loginUser)
    }

    async getUser(req: Request, res: Response): Promise<Response>{
        const userServices = new UserServices()

        const id = res.locals.decode.id

        const getUser = await userServices.getUser(id)
        return res.status(200).json(getUser)
    }
 }