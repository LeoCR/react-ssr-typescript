import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/HttpException";

export const errorMiddleware = async (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  if (error) {
    res.status(status).json({
      status,
      message,
      stack: error.stack,
    });
  }
  next();
};
