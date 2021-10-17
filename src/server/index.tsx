import React from "react";
import ReactDOM from "react-dom/server";
import express, { NextFunction, Request, Response } from "express";
import path from "path";
import fs from "fs";
import helmet from "helmet";
import App from "../client/App";
import { appRouter } from "./routes";
import { errorMiddleware } from "./middlewares/error.middleware";
import { NotFoundException } from "./exceptions/NotFoundException";
import { asyncHandler } from "./middlewares/async.middleware";
import * as dotenv from "dotenv";

dotenv.config();

const main = () => {
  const app = express();
  const port = process.env.PORT || 3000;
  app.use(express.static("build"));
  app.get("/", (req: Request, res: Response) => {
    const ReactApp = ReactDOM.renderToString(<App />);
    const indexFile = path.resolve(__dirname + "/index.html");
    fs.readFile(indexFile, "utf8", (err, data) => {
      if (err) {
        console.error("Something went wrong:", err);
        return res.status(500).send("Oops, better luck next time!");
      }
      let tempData = data;
      tempData.replace(
        '<article id="menu-container"></article> ',
        `<article id="menu-container">${ReactApp}</article>`
      );

      return res.send(tempData);
    });
  });
  app.use(helmet());
  app.use(express.json());
  app.use("/api/v1", appRouter);
  app.use((req: Request, res: Response, next: NextFunction) => {
    next(new NotFoundException(404, "Not Found"));
  });
  app.use(errorMiddleware);
  app.use(
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      next();
    })
  );

  app.listen(port);
};

main();
