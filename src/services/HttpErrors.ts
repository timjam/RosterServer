export abstract class HttpError extends Error {
  statusCode: number = 500;
  type: string = 'HttpError';
  constructor(public message: string) {
    super();
  }
}

/**
 * Type is here just to sanitize the errors at client side.
 * It is technically possible to set the type in the error
 * response to err.constructor.name and get the correct
 * respective type for the error, but that might get
 * obfuscated when the code is minified in production. That's
 * why the type is set as an internal property for each error
 */

// tslint:disable-next-line: max-classes-per-file
export class BadRequestError extends HttpError { statusCode = 400; type = 'BadRequestError' };
