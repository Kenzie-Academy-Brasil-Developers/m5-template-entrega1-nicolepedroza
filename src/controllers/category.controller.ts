import { Request, Response } from "express";
import { CategoryServices } from "../services/category.services";

export class CategoryControllers{
    async create(req: Request, res: Response){
        const categoryServices = new CategoryServices()
        const id = res.locals.decode.id

        const newCategory = await categoryServices.create(id, req.body)

        return res.status(201).json(newCategory)
    }
    
    async delete(req: Request, res: Response){
        const categoryServices = new CategoryServices()
        const id = res.locals.decode.id


        await categoryServices.delete(id, Number(req.params.id))
        return res.status(204).json()
    }
 }