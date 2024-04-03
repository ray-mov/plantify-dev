import express from "express";
import 'express-async-errors';
import { json } from "body-parser";

import cookieSession from "cookie-session";
import * as dotenv from 'dotenv';

import { currentUserRouter } from "./routes/current_user.route";
import { signinRouter } from "./routes/signin.route";
import { signoutRouter } from "./routes/signout.route";
import { signupRouter } from "./routes/signup.route";

import {errorHandler} from "@m9devs/common";
import {NotFoundError} from "@m9devs/common";

const app = express();
app.set('trust proxy', true);   // express will be behind niginx 
dotenv.config();

//app middlewares

app.use(json());
app.use(cookieSession({
  signed:false, //not encrypting cookie 
  secure: true,  //https connection
}))


// routes middlewares

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);


//not found error middleware


app.all('*', async (req,res)=>{
  throw new NotFoundError();
})

//error middleware
app.use(errorHandler);


export {app}