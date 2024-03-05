import { Router } from "express";
import { CategoryControllers } from "../controllers/category.controller";
import { ensure } from "../middlewares/ensure.middleware";
import { categoryCreateSchema } from "../schemas/category.schema";
import { handleErrors } from "../middlewares/handleError.middlewares";
import { ValidateToken } from "../middlewares/validateToken.middleware";

export const categoryRouter = Router()

const categoryControllers = new CategoryControllers()

categoryRouter.post("/", ValidateToken.execute, ensure.validBody(categoryCreateSchema), handleErrors, categoryControllers.create)
categoryRouter.delete("/:id", ValidateToken.execute,ensure.categoryIdExistsDelete,categoryControllers.delete)