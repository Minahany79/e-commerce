import { NextFunction, Response, Request } from "express";
import { ResponseHandlingService } from "../services/response-handling.service";
import { StatusCodes } from "../enums/status-codes";
import { ErrorResponse } from "../models/error-response";

export const globalErrorHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  process.on("unhandledRejection", (reason: ErrorResponse, promise) => {
    if (res.headersSent)
      return;
    else {
      return new ResponseHandlingService(
        res,
        new ErrorResponse(reason.message, reason.statusCode || StatusCodes.InternalServerError, reason),
        reason.statusCode || StatusCodes.InternalServerError,
      );
    }
  });

  next();
};
