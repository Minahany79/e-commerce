import { NextFunction, Response, Request } from "express";
import { ResponseHandlingService } from "../services/response-handling.service";
import { StatusCodes } from "../enums/status-codes";
import { ErrorResponse } from "../models/error-response";

export const globalErrorHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  process.on("unhandledRejection", (reason: Error, promise) => {
    if (res.headersSent)
      return;
    else {
      return new ResponseHandlingService(
        res,
        new ErrorResponse(reason.message, StatusCodes.InternalServerError, reason),
        StatusCodes.InternalServerError,
      );
    }
  });

  next();
};
