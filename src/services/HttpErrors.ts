export abstract class HttpError extends Error {
  statusCode: number = 500;
  constructor(public message: string) {
    super();
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

// tslint:disable-next-line: max-classes-per-file
export class BadRequestError extends HttpError { statusCode = 400 };
