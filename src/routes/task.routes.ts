import { Router } from "express";
import { TaskControllers } from "../controllers/task.controller";
import { ensure } from "../middlewares/ensure.middleware";
import { taskCreateSchema, taskUpdateSchema } from "../schemas/task.schema";
import { handleErrors } from "../middlewares/handleError.middlewares";
import { ValidateToken } from "../middlewares/validateToken.middleware";

export const taskRouter = Router()

const taskControllers = new TaskControllers()

taskRouter.post("/", ValidateToken.execute,ensure.validBody(taskCreateSchema), handleErrors,
ensure.categoryIdExists, 
taskControllers.create)

taskRouter.get("/", ValidateToken.execute,ensure.categoryNameExists, taskControllers.findMany)

taskRouter.use("/:id", ValidateToken.execute,ensure.paramsTaskIdExists)

taskRouter.get("/:id", taskControllers.findOne)
taskRouter.patch("/:id", ensure.validBody(taskUpdateSchema),handleErrors,ensure.categoryIdExists, taskControllers.update)
taskRouter.delete("/:id", taskControllers.delete)