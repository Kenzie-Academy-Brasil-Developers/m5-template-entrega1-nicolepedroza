import { Request, Response } from "express";
import { TaskServices } from "../services/task.services";

export class TaskControllers{
    async create(req: Request, res: Response): Promise<Response>{
        const taskServices = new TaskServices()

        const newTask = await taskServices.create(req.body)

        return res.status(201).json(newTask)
    }

    async findMany(req: Request, res: Response){
        const taskServices = new TaskServices()
        const { category } = req.query
        
        const allTasks = await taskServices.findMany(category as string)

        return res.status(200).json(allTasks)
    }

    async findOne(req: Request, res: Response){
        const taskServices = new TaskServices()
        const {foundTask} = res.locals

        const task = await taskServices.findOne(foundTask)

        return res.status(200).json(task)
    }

    async update(req: Request, res: Response){
        const taskServices = new TaskServices()

        const {id} = req.params
        const task = await taskServices.update(Number(id), req.body);

        return res.status(200).json(task);
    }

    async delete(req: Request, res: Response){
        const taskServices = new TaskServices()

        await taskServices.delete(Number(req.params.id))
        return res.status(204).json()
    }
}