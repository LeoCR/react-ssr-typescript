import { Transaction } from "sequelize/types";
import { ICourseParams } from "../interfaces/course.interface";
import { sequelize } from "../config/db.config";
import { HttpException } from "../exceptions/HttpException";
import { CourseModel } from "../models/course.model";
import { BadRequestException } from "../exceptions/BadRequestException";

export class CourseController {
  async getCourse(id: number) {
    try {
      const result = await CourseModel.findByPk(id)
        .then((resp) => {
          return {
            success: true,
            message: "Course found succesfully",
            courseId: id,
            result: resp.toJSON(),
          };
        })
        .catch((err) => {
          return {
            success: false,
            message: "Could not find the Course with the ID:" + id,
            courseId: id,
            result: null,
            error: err.message,
          };
        });
      return result;
    } catch (error) {
      throw new HttpException(
        400,
        "Could not find the Course with the ID:" + id
      );
    }
  }
  async postCourse(body: ICourseParams) {
    const result = sequelize.transaction(async (t: Transaction) => {
      const course = await CourseModel.create(
        {
          code: body.code,
          name: body.name,
          createdAt: Number(Date.now()),
          updatedAt: Number(Date.now()),
        },
        { transaction: t }
      );
      return course;
    });
    return result;
  }
  async deleteCourseById(id: number) {
    const result = await CourseModel.destroy({
      where: { id: id },
    })
      .then((num: number) => {
        if (num === 1) {
          return {
            success: true,
            message: "Deleted Course with the ID:" + id + " successfully",
          };
        } else {
          return {
            success: false,
            message: "Could not delete Course with ID:" + id,
            error: null,
          };
        }
      })
      .catch((error) => {
        return {
          success: false,
          message: error.message,
          error,
        };
      });
    return result;
  }
  async updateCourse(id: number, body: ICourseParams) {
    const course = await CourseModel.findByPk(id);
    if (!course) {
      throw new BadRequestException(
        400,
        "The course that you are looking doesn't exists."
      );
    }
    const courseUpdated = await course.update(body, {
      where: { id: id },
    });
    return courseUpdated;
  }
}
