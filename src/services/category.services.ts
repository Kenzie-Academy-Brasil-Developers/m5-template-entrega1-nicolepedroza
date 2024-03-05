import { prisma } from "../database/prisma";
import { AppError } from "../middlewares/App.Error";
import { TCategoryCreate, TCategoryReturn } from "../schemas/category.schema";

export class CategoryServices{
   async create(userId: number, body: TCategoryCreate): Promise<TCategoryReturn>{
      const categoryData = {...body, userId}
      const newCategory = await prisma.category.create({data: categoryData})
      return newCategory
   }
   
   async delete(userId: number, id: number): Promise<void>{
      const category = await prisma.category.findUnique({where: {id}})
      if(!category || category.userId !== userId){
         throw new AppError("This user is not the category owner", 403)
      }
      
      await prisma.category.delete({where: {id}})
  }
}