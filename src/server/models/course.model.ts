import { CourseInstance } from "server/interfaces/course.interface";
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config";

export const CourseModel = sequelize.define<CourseInstance>(
  "Course",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    code: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: "TIMESTAMP",
    },
    updatedAt: {
      type: "TIMESTAMP",
    },
  },
  {
    tableName: "course",
  }
);
