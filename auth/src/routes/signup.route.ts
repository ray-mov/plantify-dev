import { Router, Request, Response } from "express";
import { body} from "express-validator";
import jwt from "jsonwebtoken";

import { BadRequestError } from "../utilities/errors/badRequestError";
import { User } from "../models/user.model";
import { validationRequest } from "../middlewares/validateRequest.middleware";

const router = Router()
router.post('/api/users/signup', [
  body('email')
    .isEmail()
    .withMessage("Invalid Email"),
  body('password')
    .trim()
    .isLength({ min: 6, max: 12 })
    .withMessage("Password length must be between 6-12 characters")
], validationRequest,
 async (req: Request, res: Response) => {
  
  const { email, password } = req.body;
  const existingUser = await User.findOne({email})

  if (existingUser) {
    throw new BadRequestError('Email already exist')
    // return res.send({})  
  }

  const user = User.build({email, password});
  await user.save();

  const userJwt = jwt.sign({
    id: user.id,
    email: user.email
  }, process.env.JWT_SECRET!)

  req.session = {
    jwt: userJwt
  }
  
  res.status(201).send(user)
})

export { router as signupRouter }