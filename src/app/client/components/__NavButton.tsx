'use client'

import  Link from 'next/link'
import {signIn, signOut, useSession} from 'next-auth/react'
import { usePathname } from 'next/navigation'


function AuthButton() {
  const {data: session} = useSession()

  return (
    session
    ? <div className='flex items-center justify-end gap-3 '>
        {session?.user?.name}
        <button onClick={() => signOut()} className='bg-amber-400 rounded p-2 px-4'>Sign out</button>
      </div>
    : <div className='flex items-center justify-end gap-3 '>
        Not signed in 
        <button onClick={() => signIn()} className='bg-emerald-400 rounded p-2 px-4'>Sign in</button>   
      </div>
  )
}

const activeRouteStyle = 'bg-emerald-600 p-2 px-4 rounded'
const inactiveRouteStyle = 'bg-neutral-700 p-2 px-4 rounded'

export default function NavMenu() {
  const pathname = usePathname()
  return (
    <div className='bg-stone-500 flex justify-between p-4'>
      <div>
        <ul className='flex gap-4 items-center h-full'>
          <li className={pathname === '/'? activeRouteStyle : inactiveRouteStyle}>
            <Link href='/'>home</Link>
          </li>
          <li  className={pathname === '/about'? activeRouteStyle : inactiveRouteStyle}>
            <Link href='/about'>about</Link>
          </li>
          <li  className={pathname === '/contact'? activeRouteStyle : inactiveRouteStyle}>
            <Link href='/contact'>contact</Link>
          </li>
        </ul>
      </div>
      <AuthButton />
    </div>
  )
}