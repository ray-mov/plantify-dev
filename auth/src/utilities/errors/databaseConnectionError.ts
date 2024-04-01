import {CustomError} from "./customError";


class DatabaseConnectionError extends CustomError{

  statusCode = 500;
  reason = "error connecting db"
  
  constructor(){
    super("error connecting db");
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors(){
    return [
      { message: this.reason}
    ]
  }
};

export default DatabaseConnectionError