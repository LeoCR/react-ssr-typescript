import { Optional, Model } from "sequelize";

export interface CourseAttributes {
  id: number;
  name: string;
  code: string;
  createdAt: number;
  updatedAt: number;
}

export interface CourseCreationAttributes
  extends Optional<CourseAttributes, "id"> {}

export interface CourseInstance
  extends Model<CourseAttributes, CourseCreationAttributes>,
    CourseAttributes {}

export interface ICourseParams {
  code: string;
  name: string;
}
