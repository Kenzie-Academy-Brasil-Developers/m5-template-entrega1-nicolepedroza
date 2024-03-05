import { NextFunction, Request, Response } from "express";
import { AppError } from "./App.Error";
import jwt from "jsonwebtoken"

export class ValidateToken{
    static execute(req: Request, res: Response, next: NextFunction){
        const authorization = req.headers.authorization

        const token = authorization?.replace("Bearer ", "")

        if(!token){
            throw new AppError("Token is required", 401) 
        }

        jwt.verify(token, process.env.JWT_SECRET as string)

        res.locals.decode = jwt.decode(token)

        return next()
    }
}