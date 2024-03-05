import { Router } from "express";
import { UserControllers } from "../controllers/user.controller";
import { ensure } from "../middlewares/ensure.middleware";
import { userCreateSchema } from "../schemas/user.schema";
import { ValidateToken } from "../middlewares/validateToken.middleware";

export const userRouter = Router()

const userControllers = new UserControllers()

userRouter.post("/", ensure.validBody(userCreateSchema), ensure.emailIsUnique, userControllers.register)

userRouter.post("/login", userControllers.login)

userRouter.get("/profile", ValidateToken.execute, userControllers.getUser)