import { Request, Response } from "express";
import { ICourseParams } from "../interfaces/course.interface";
import { CourseController } from "../controllers/course.controller";
import { BadRequestException } from "../exceptions/BadRequestException";

const controller = new CourseController();

export class CourseEndpoint {
  async getCourse(req: Request, res: Response) {
    const courseId = Number(req.params.id);
    if (isNaN(courseId)) {
      throw new BadRequestException(
        400,
        "Invalid Course Id, it should be a valid Integer number"
      );
    }
    const result = await controller.getCourse(Number(courseId));
    res.json(result);
  }
  async createCourse(req: Request, res: Response) {
    const { code, name } = req.body;
    if (!code || !name) {
      throw new BadRequestException(400, "Invalid code or name");
    }
    const result = await controller.postCourse({ code, name });
    res.json(result);
  }
  async deleteCourse(req: Request, res: Response) {
    const courseId = Number(req.params.id);
    if (isNaN(courseId)) {
      throw new BadRequestException(
        400,
        "Invalid Course Id, it should be a valid Integer number"
      );
    }
    const result = await controller.deleteCourseById(Number(courseId));
    res.json(result);
  }
  async updateCourse(req: Request, res: Response) {
    const courseId = Number(req.params.id);
    if (isNaN(courseId)) {
      throw new BadRequestException(
        400,
        "Invalid Course Id, it should be a valid Integer number"
      );
    }
    const { name, code } = req.body;
    if (!code && !name) {
      throw new BadRequestException(400, "Invalid code or name");
    }
    const body: ICourseParams = {
      name,
      code,
    };
    const result = await controller.updateCourse(Number(courseId), body);
    res.json(result);
  }
}
