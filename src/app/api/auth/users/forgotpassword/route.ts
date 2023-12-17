import { connectDB } from "@/app/(__secure__)/backend_folders/dbConfig/dbConfig";
import { sendEmail } from "@/app/(__secure__)/backend_folders/helpers/mailer";
import User from "@/app/(__secure__)/backend_folders/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB()

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    const user = await User.findOne({ email });
    
    if(!user) {
      return NextResponse.json({error: 'That email is not registered with us', status: 404})
    }

    await sendEmail({email, emailType: 'RESET', userID: user._id})

    return NextResponse.json({
      message: 'Password reset link sent to your email',
      success: true
    })
    
  } catch(err: any) {
    return NextResponse.json({error: err.message, status: 500})
  }
}
