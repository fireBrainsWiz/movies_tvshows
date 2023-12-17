import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    unique: [true, 'Username already exists'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: [true, 'Email already exists'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
  
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },

  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
  
  // resetPasswordToken: String,
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  // }
});

const User =  mongoose.models.users || mongoose.model('users', userSchema);//users is the collection name
export default User
//mongoose.models.users  cuz maybe users already exists in db, in express we needn't do this
// in mongodb collections are in plural and in lowercase, User will be users 