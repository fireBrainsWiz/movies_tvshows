
import { connectDB } from "@/app/(__secure__)/backend_folders/dbConfig/dbConfig";
import { getDataFromToken } from "@/app/(__secure__)/backend_folders/helpers/getDataFromToken";
import User from "@/app/(__secure__)/backend_folders/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB()

export async function GET(req: NextRequest) {
  try {
    const userID = await getDataFromToken(req)
    const user = await User.findById({_id: userID}).select('-password')//don't return the password
    return NextResponse.json({messgae: 'User found', data: user, status: 200})


  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 400 })
  }
}
