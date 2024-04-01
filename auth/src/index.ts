import mongoose, { set } from "mongoose";
import { app } from "./app";

// appstart + db connection

const startService  = async () => {

// hey TS don't worry I checked here
  if(!process.env.JWT_SECRET){
    throw new Error("JWT_SECRET not available")
  }

  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth", {
  })
  console.log('db connected: auth service');
    
  } catch (error) {
    console.log(error)
  }

  app.listen(3000, () => {
  console.log('Listening on port 3000');
})
}

startService();

