import "dotenv/config"
import "express-async-errors"
import cors from "cors"
import express, { json } from "express";
import helmet from "helmet";
import { taskRouter } from "./routes/task.routes";
import { categoryRouter } from "./routes/category.routes";
import { handleErrors } from "./middlewares/handleError.middlewares";
import { userRouter } from "./routes/user.routes";

export const app = express();

app.use(cors());

app.use(helmet());

app.use(json());

app.use("/tasks", taskRouter);

app.use("/categories", categoryRouter);

app.use("/users", userRouter);
app.use(handleErrors);