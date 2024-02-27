import { Task } from "@prisma/client";
import { prisma } from "../database/prisma";
import { TaskCreate, TaskCreateReturn, TaskReturn, TaskUpdate } from "../schemas/task.schema";

export class TaskServices{
    async create(body: TaskCreate): Promise<TaskCreateReturn>{
        return await prisma.task.create({ data: body })
    }

    async findMany(categoryName?: string): Promise<Array<TaskReturn>>{
        const allTasks:any = await prisma.task.findMany({where:{
            ...(categoryName && {category: {name: {contains: categoryName}}})
        },
        
        include: {category: true}})

        return allTasks
    }

    async findOne(foundTask: any): Promise<TaskReturn>{
        return {
            id: foundTask.id,
            title: foundTask.title,
            content: foundTask.content ,
            finished: foundTask.finished,
            category: foundTask.category
        }
    }

    async update(id: number, body: TaskUpdate): Promise<TaskCreateReturn>{
        const update = await prisma.task.update({where: {id}, data: body})
        return update
        
    }

    async delete(id: number): Promise<void>{
        await prisma.task.delete({where: {id}})
    }
}