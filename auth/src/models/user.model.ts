import mongoose from "mongoose";
import { PasswordService } from "../utilities/services/passwordService";


//interface for user // pass to build static
interface UserAttributes{
  email: string;
  password: string;
}

// interface of user model that tells build func 
//available for user model

interface UserModel extends mongoose.Model<UserDoc>{
  build(attributes: UserAttributes): UserDoc;
}


// interface for what pproperties a single user has
interface UserDoc extends mongoose.Document {
  email: String;
  password: String;
}

//schema

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
},{ 
  toJSON: {
    transform(doc, ret){
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
      delete ret.__v;
    }
  }
})

//middleware function   
//note : - mongoose dont support async so we get this done argument so we 
//         are responsible for calling done 
userSchema.pre('save', async function(done) {
  if (this.isModified('password')) {
    const hashed = await PasswordService.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
})


//instead of new User using static for type check

userSchema.statics.build = (attributes: UserAttributes) => {
return new User(attributes);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export {User};
