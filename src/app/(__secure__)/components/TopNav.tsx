// 'use client'
import LogInOrOut from "./LogInOrOut"
import {getServerSession} from 'next-auth'
import SessionProvider from "./SessionProvider"

export default async function TopNav() {
  const session = await getServerSession()
  // console.log(session)//{name, email, image}
  // console.log(session?.user)

  return (
    <SessionProvider session={session}>
      <div className="bg-slate-800 p-4">
        <nav>{session && <p>hi session here</p>}</nav>
        <LogInOrOut />
      </div>
    </SessionProvider>
  )
}