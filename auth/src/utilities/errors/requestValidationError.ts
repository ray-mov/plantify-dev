import { ValidationError } from "express-validator";
import {CustomError} from "./customError";


class RequestValidationError extends CustomError {
 statusCode = 400;
 
  constructor(public errors: ValidationError[]){
     super("Invalid request");
     Object.setPrototypeOf(this, RequestValidationError.prototype);
  };

   serializeErrors(){
    return  this.errors.map( err => {  
      if (err.type === "field") {    
        return { message: err.msg, feild: err.path};     
      }
       return { message: err.msg}; 
      }
    )}

}


export default RequestValidationError;