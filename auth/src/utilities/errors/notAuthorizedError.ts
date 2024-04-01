import {CustomError} from "./customError";

export class NotAuthorizedError extends CustomError{
   statusCode = 404;
  constructor(){
    super('Access Denied');
     Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }  
  
  serializeErrors() {
     return  [
      {message: "Access Denied"}
     ] 
  }
}