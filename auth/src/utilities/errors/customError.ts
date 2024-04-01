abstract class CustomError extends Error {

  abstract statusCode: number;

  constructor(message: string){
    // for server logs only
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): {
    message: string;
    feild?: string;
  }[]

}

export {CustomError};