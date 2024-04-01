import { NextFunction, Response, Request, } from "express";
import { NotAuthorizedError } from "../utilities/errors/notAuthorizedError";


export const authRequired = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

if (!req.currentUser) {
  throw new NotAuthorizedError();
}
next();
}