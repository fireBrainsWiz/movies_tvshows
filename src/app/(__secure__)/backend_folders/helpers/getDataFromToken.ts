import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken'


export function getDataFromToken(req: NextRequest) {
  try {
    const encodedToken = req.cookies.get('token')?.value || ''
    const decodedToken: any = jwt.verify(encodedToken, process.env.TOKEN_SECRET as string)
    return decodedToken.id

  } catch(err: any) {
    throw new Error(err.message)
  }
}