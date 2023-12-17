import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import { connectDB } from "@/app/(__secure__)/backend_folders/dbConfig/dbConfig";
import User from "@/app/(__secure__)/backend_folders/models/userModel";

connectDB()

export async function POST(req: NextRequest) {

  try {
    const { token, password } = await req.json()

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() }
    })

    

    if (!user) {
      return NextResponse.json({ error: 'User not found', status: 404 })
    }

    const hashedPassword = await bcryptjs.hash(password, 10)


    user.password = hashedPassword
    user.forgotPasswordToken = undefined
    user.forgotPasswordTokenExpiry = undefined
    await user.save() 

    return NextResponse.json({
      message: 'Password reset successfully',
      success: true
    })

  } catch (err: any) {
    return NextResponse.json({ error: err.message, status: 500 })
  }
}