import { connectDB } from "@/app/(__secure__)/backend_folders/dbConfig/dbConfig";
import User from "@/app/(__secure__)/backend_folders/models/userModel";
import bcryptjs from 'bcryptjs'

connectDB()

export default async function loginFn({credentials} : any) {
  // console.log(credentials)
  
  try {
    const {email, password} =  credentials

    // check if user exists
    const user = await User.findOne({email})
    // console.log(user)
    if (!user || !user.isVerified) return null
    
    // validate password
    const validUser = await bcryptjs.compare(password, user.password)
    if (!validUser) return null
  
    return {
      id: user._id,
      name: user.username,
      email: user.email
    }
    
  } catch(error: any) {
    return null
  }
}



