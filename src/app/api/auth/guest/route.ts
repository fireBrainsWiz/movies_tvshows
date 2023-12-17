import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  
  const {guest_session_id, expires_at, success} = await req.json()
  
  try {
    const res = NextResponse.json({
      message: 'Login success',
      success,
      status: 200,
    })
    
    res.cookies.set(
      "TMDB_guest_session_id", guest_session_id, {
        httpOnly: true,
        maxAge: expires_at
      }
    )

    return res

  } catch (error) {
    return NextResponse.json({error})
  }

}