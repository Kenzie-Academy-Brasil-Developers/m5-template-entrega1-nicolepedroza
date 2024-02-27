import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import { prisma } from "../database/prisma";
import { AppError } from "./App.Error";


class EnsureMiddleware {
  public validBody =
    (schema: AnyZodObject) =>
    (req: Request, _: Response, next: NextFunction): void => {
      req.body = schema.parse(req.body);
      return next();
    };


  public categoryIdExists = async (
    { body: { categoryId } }: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    if(!categoryId) return next();


    const foundCategory = await prisma.category.findFirst({
      where: { id: Number(categoryId) },
    });

    if (!foundCategory) {
      throw new AppError("Category not found!", 404);
    }

    return next();
  };

  public categoryIdExistsInTask = async (
    { body: { categoryId } }: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    if(!categoryId) return next();

    const foundCategory = await prisma.category.findFirst({
      where: { id: Number(categoryId) },
    });

    if (!foundCategory) {
      throw new AppError("Category not found!", 403);
    }

    return next();
  };

  public paramsTaskIdExists = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { id } = req.params;

    if(!id) next();

    const foundTask = await prisma.task.findFirst({
      where: { id: Number(id) },
      include: { category: true },
    });

    if (!foundTask) {
      throw new AppError("Task not found!", 404);
    }

    res.locals = { ...res.locals, foundTask };

    return next();
  };
  public categoryIdExistsDelete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { id } = req.params;

    if(!id) next();


    const foundCategory = await prisma.category.findFirst({
      where: { id: Number(id) },
    });

    if (!foundCategory) {
      throw new AppError("Category not found!", 404);
    }

    return next();
  };
  public categoryNameExists = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const {category: categoryName} = req.query
    
    if(!categoryName) return next()
    const foundCategories = await prisma.task.findMany({
      where: {category: {name: {contains: categoryName? String(categoryName): undefined}} },
      
    });
    if (foundCategories && foundCategories.length === 0) {
      throw new AppError ("Category not found!", 404)
    }
    return next();

  };
}

export const ensure = new EnsureMiddleware();