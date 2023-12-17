import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, 'Please provide a password'],
  },
  name: {
    type: String,
    required: [true, 'Please provide a username'],
    unique: [true, 'Username already exists'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: [true, 'Email already exists'],
  },

  
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const OAuthUser =  mongoose.models.oAuth_users || mongoose.model('oAuth_users', userSchema);//users is the collection name
export default OAuthUser
//mongoose.models.users  cuz maybe users already exists in db, in express we needn't do this
// in mongodb collections are in plural and in lowercase, User will be users 