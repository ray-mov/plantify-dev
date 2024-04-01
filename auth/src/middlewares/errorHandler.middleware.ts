import { NextFunction, Response, Request, } from "express";
import {CustomError} from "../utilities/errors/customError";


const errorHandler = (err:Error, req:Request, res:Response, next:NextFunction) => {

 if (err instanceof CustomError) { 
  return res.status(err.statusCode).send({error: err.serializeErrors() 
  });
 };

res.send(400).send({
  error: [
    {message: "Something went wrong"}
  ]
});
};


export default errorHandler;