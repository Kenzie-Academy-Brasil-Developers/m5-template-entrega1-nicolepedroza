import { prisma } from "../database/prisma";
import { AppError } from "../middlewares/App.Error";
import { TaskCreate, TaskCreateReturn, TaskReturn, TaskUpdate, taskReturnSchema } from "../schemas/task.schema";


export class TaskServices{
    async create(body: TaskCreate,
        userId: number): Promise<TaskCreateReturn>{
            const newTask = {...body, userId}
            
            return await prisma.task.create({ data: newTask })
    }

    async findMany(userId: number, categoryName?: string): Promise<Array<TaskReturn>>{
        const allTasks:any = await prisma.task.findMany({where:{
            userId,
            ...(categoryName && {category: {name: {contains: categoryName}}})
        },
        
        include: {category: true}})

        return allTasks
    }

    async findOne(userId: number, id: number): Promise<TaskReturn>{
        const task = await prisma.task.findFirst({
            where: {id},
            include: {category: true}
        })
        if(!task || task.userId !== userId){
            throw new AppError("This user is not the task owner", 403)
        }
        return taskReturnSchema.parse(task)
    }

    async update(userId: number, id: number, body: TaskUpdate): Promise<TaskCreateReturn>{
        const existingTask = await prisma.task.findFirst({where: {id}})
        if(!existingTask || existingTask.userId !== userId){
            throw new AppError("This user is not the task owner", 403)
        }
        const update = await prisma.task.update({where: {id}, data: body})
        
        return update
    }

    async delete(userId: number, id: number): Promise<void>{
        const existingTask = await prisma.task.findFirst({where: {id}})
        if(!existingTask || existingTask.userId !== userId){
            throw new AppError("This user is not the task owner", 403)
        }
        await prisma.task.delete({where: {id}})
    }
}