import { Router, Request, Response } from "express";
import { body} from "express-validator";
import { BadRequestError } from "../utilities/errors/badRequestError";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { validationRequest } from "../middlewares/validateRequest.middleware";
import { PasswordService } from "../utilities/services/passwordService";
const router = Router()


router.post('/api/users/signin', [
  body('email')
    .isEmail()
    .withMessage("Invalid Email"),
  body('password')
    .trim()
    .isLength({ min: 6, max: 12 })
    .withMessage("Password length must be between 6-12 characters")
],validationRequest ,async (req: Request, res: Response) => {

   
  const { email, password } = req.body;
  const existingUser = await User.findOne({email})
  if (!existingUser) {
    throw new BadRequestError('Invalid credentails')
  }

  const passwordsMatch = await PasswordService.compare(existingUser.password.toString(), password)

   if (!passwordsMatch) {
    throw new BadRequestError('Invalid credentails')
  }

  //generating jwt and storing the session

  const userJwt = jwt.sign({
    id: existingUser.id,
    email: existingUser.email
  }, process.env.JWT_SECRET!)

  req.session = {
    jwt: userJwt
  }
  
  res.status(201).send(existingUser)

})

export { router as signinRouter }