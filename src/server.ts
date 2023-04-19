import express, { Application } from "express";
import cors from "cors";
import { applicationRoutes } from "./routes/index";
import { initDB } from "./config/db/index";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./../swagger";
import config from "../config";
import { morganMiddleware } from "./shared/middlewares/morgan.middleware";
import { globalErrorHandler } from "./shared/middlewares/global-error-handler";

const port = config.PORT || 3000;

export class Server {
  public express: Application;

  constructor() {
    this.express = express();
    this.configuration();
    this.express.use(applicationRoutes);

    initDB()
      .then(() => console.log("DB initialized successfully"))
      .catch((err) => console.log(err));

    this.express.use(morganMiddleware);
    this.express.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }

  public configuration() {
    this.express.use(globalErrorHandler);
    this.express.use(cors());
    this.express.use(express.json());
    this.express.use(express.static("./"));
  }

  public start() {
    this.express.listen(port, () => {
      console.log(`server started at http://localhost:${port}`);
    });
  }
}
