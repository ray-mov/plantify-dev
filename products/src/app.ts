import express from "express";
import 'express-async-errors';
import { json } from "body-parser";

import cookieSession from "cookie-session";
import * as dotenv from 'dotenv';


import {errorHandler, currentUser} from "@m9devs/common";
import {NotFoundError} from "@m9devs/common";


import { newProductRouter } from "./routes/addProduct.route";

const app = express();
app.set('trust proxy', true);   // express will be behind niginx 
dotenv.config();

//app middlewares

app.use(json());
app.use(cookieSession({
  signed:false, //not encrypting cookie 
  secure: true,  //https connection
}))

app.use(currentUser)


// routes middlewares

app.use(newProductRouter);

// app.use(currentUserRouter);


//not found error middleware


app.all('*', async (req,res)=>{
  throw new NotFoundError();
})

//error middleware
app.use(errorHandler);


export {app}