import { Router, Request, Response } from "express";
import { asyncHandler } from "../middlewares/async.middleware";
import { CourseEndpoint } from "../endpoints/course.endpoint";

const courseRouter = Router();
const courseEndpoint = new CourseEndpoint();

courseRouter.post(
  "/create",
  asyncHandler(async (req: Request, res: Response) => {
    return courseEndpoint.createCourse(req, res);
  })
);
courseRouter.get(
  "/findById/:id",
  asyncHandler(async (req: Request, res: Response) => {
    return courseEndpoint.getCourse(req, res);
  })
);
courseRouter.delete(
  "/deleteById/:id",
  asyncHandler(async (req: Request, res: Response) => {
    return courseEndpoint.deleteCourse(req, res);
  })
);
courseRouter.put(
  "/update/:id",
  asyncHandler(async (req: Request, res: Response) => {
    return courseEndpoint.updateCourse(req, res);
  })
);

export { courseRouter };
