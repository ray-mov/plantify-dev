import {CustomError} from "./customError";

class NotFoundError extends CustomError{
  statusCode = 404;
  constructor(){
    super('Address not found');
     Object.setPrototypeOf(this, NotFoundError.prototype);
  }  
  
  serializeErrors() {
     return  [
      {message: "Address Not found"}
     ] 
  }
}

export default NotFoundError;