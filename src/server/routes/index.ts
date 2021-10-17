import { Router } from "express";
import { courseRouter } from "./course.route";

const appRouter = Router();

appRouter.use("/courses", courseRouter);

export { appRouter };
