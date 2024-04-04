import mongoose, { set } from "mongoose";
import { app } from "./app";

// appstart + db connection

const startService  = async () => {

// hey TS don't worry I checked here
  if(!process.env.JWT_SECRET){
    throw new Error("JWT_SECRET not available")
  }
   if(!process.env.MONGO_URL){
    throw new Error("MONGO_URL not available")
  }

  try {
    await mongoose.connect(process.env.MONGO_URL, {
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

