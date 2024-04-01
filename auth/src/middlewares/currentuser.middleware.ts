import { NextFunction, Response, Request, } from "express";
import jwt from "jsonwebtoken";

interface UserPayload  {
  id: string;
  email: string;
}

//Reaching existing type definition and making modification
// telling TS inside Express project, find interface of Request i.e 
// already defined and add currentUser of type UserPayload
declare global {
  namespace Express {
    interface Request{
      currentUser?: UserPayload;   // may or may not be defined
    }
  }
}

//middleware 

export const currentUser = ( 
  req: Request,
  res: Response,
  next: NextFunction
  ) => {
    // !req.session?.jwt   =  !req.session.jwt || !req.session  // ts things
    if (!req.session?.jwt) {
      return next();
    }

     try {
     const payload = jwt.verify(req.session.jwt, process.env.JWT_SECRET!) as UserPayload; 
     req.currentUser = payload;   
  } catch (error) {
    res.send({currentUser: null})  
  }

  next();
}