import { connectDB } from "@/backend_folders/dbConfig/dbConfig";
import User from "@/backend_folders/models/userModel";

import {NextRequest, NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendEmail } from "@/backend_folders/helpers/mailer";
import { signupSchema } from "@/app/lib/types";

connectDB()


export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // ----------zod begins 
    const result = signupSchema.safeParse(body)
    let zodErrors = {}
    
    if (!result.success) {
      result.error.issues.forEach( issue => {
        zodErrors = {...zodErrors, [issue.path[0]]: issue.message}
      })
    }
    
    if (Object.keys(zodErrors).length > 0) {
      return  NextResponse.json({error: zodErrors, status: 400})
    }
    // ----------zod ends 

    const {username, email, password} = body
    
    //check if user already exists
    const user = await User.findOne({email})
    if (user) {
      return  NextResponse.json({error: 'User already exists', status: 400})
    }

    const hashedPassword = await bcryptjs.hash(password, 10)
    // const newUser = await User.create({username, email, password: hashedPassword})
    const newUser = new User({username, email, password: hashedPassword})
    const savedUser = await newUser.save()


    // send verification email
    await sendEmail({email, emailType: 'VERIFY', userID: savedUser._id})
    
    return  NextResponse.json({
      user: newUser, 
      savedUser, 
      message: 'User created successfully', 
      success: true
    })

  } catch (error: any) {
    return  NextResponse.json({error: error.message, status: 500})
  }
}