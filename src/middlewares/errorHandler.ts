import { Request, Response, NextFunction } from 'express';
import { HttpError } from './../services/HttpErrors';

const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    console.log('Handler', Object.getPrototypeOf(error));
    if (error instanceof HttpError) {
      res.status(error.statusCode).send({
        status: error.statusCode,
        message: error.message,
      });
    } else {
      res.status(500).send({
        status: 500,
        message: 'Unexpected error',
      });
    }
  } else {
    next();
  }
}

export default errorHandler;
