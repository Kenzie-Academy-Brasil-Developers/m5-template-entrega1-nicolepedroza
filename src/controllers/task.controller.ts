import { Request, Response } from "express";
import { TaskServices } from "../services/task.services";

export class TaskControllers{
    async create(req: Request, res: Response): Promise<Response>{
        const taskServices = new TaskServices()
        const id = res.locals.decode.id

        const newTask = await taskServices.create(req.body, id)

        return res.status(201).json(newTask)
    }

    async findMany(req: Request, res: Response){
        const taskServices = new TaskServices()
        const id = res.locals.decode.id
        const { category } = req.query
        
        const allTasks = await taskServices.findMany(id, category as string)

        return res.status(200).json(allTasks)
    }

    async findOne(req: Request, res: Response){
        const taskServices = new TaskServices()
        const id = res.locals.decode.id

        const task = await taskServices.findOne(id, Number(req.params.id))

        return res.status(200).json(task)
    }

    async update(req: Request, res: Response){
        const taskServices = new TaskServices()
        const id = res.locals.decode.id

        const task = await taskServices.update(id, Number(req.params.id), req.body);

        return res.status(200).json(task);
    }

    async delete(req: Request, res: Response){
        const taskServices = new TaskServices()
        const id = res.locals.decode.id


        await taskServices.delete(id, Number(req.params.id))
        return res.status(204).json()
    }
}