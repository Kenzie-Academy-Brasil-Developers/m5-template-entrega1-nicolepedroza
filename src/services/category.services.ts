import { prisma } from "../database/prisma";
import { TCategoryCreate, TCategoryReturn } from "../schemas/category.schema";

export class CategoryServices{
   async create(body: TCategoryCreate): Promise<TCategoryReturn>{
      const newCategory = await prisma.category.create({data: body})
      return newCategory
   }
   
   async delete(id: number): Promise<void>{
      await prisma.category.delete({where: {id}})
  }
}