import { connectDB } from "@/backend_folders/dbConfig/dbConfig";
import User from "@/backend_folders/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(req: NextRequest) {

  try {
    const {token} = await req.json()

    console.log(token)
    const user = await User.findOne({
      verifyToken: token, 
      verifyTokenExpiry: {$gt: Date.now()}//veryfyToken whose expiry is greater than current time (not yet expired)
    })
    console.log(user)

    if (!user) {
      return NextResponse.json({error: 'User not found', status: 404})
    }

    user.isVerified = true
    user.verifyToken = undefined
    user.verifyTokenExpiry = undefined
    await user.save()

    return NextResponse.json({
      message: 'Email verified successfully', 
      success: true
    })
    
  } catch(error: any) {
    return NextResponse.json({error: error.message, status: 500})
  }
  
}