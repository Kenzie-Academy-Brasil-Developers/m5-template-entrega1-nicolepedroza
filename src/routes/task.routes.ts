import e, { Router } from "express";
import { TaskControllers } from "../controllers/task.controller";
import { ensure } from "../middlewares/ensure.middleware";
import { taskCreateSchema, taskUpdateSchema } from "../schemas/task.schema";
import { handleErrors } from "../middlewares/handleError.middlewares";

export const taskRouter = Router()

const taskControllers = new TaskControllers()

taskRouter.post("/", ensure.validBody(taskCreateSchema), handleErrors,
ensure.categoryIdExistsInTask, 
taskControllers.create)

taskRouter.get("/", ensure.categoryNameExists, taskControllers.findMany)

taskRouter.use("/:id", ensure.paramsTaskIdExists)

taskRouter.get("/:id", taskControllers.findOne)
taskRouter.patch("/:id", ensure.validBody(taskUpdateSchema),handleErrors,ensure.categoryIdExists, taskControllers.update)
taskRouter.delete("/:id", taskControllers.delete)