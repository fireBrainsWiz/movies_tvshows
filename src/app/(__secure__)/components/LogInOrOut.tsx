'use client'
import { useRouter } from 'next/navigation'
import {signIn, signOut, useSession} from 'next-auth/react'

  
export default function LogInOrOut() {
  const router = useRouter()
  const { data: session, status, update } = useSession()
  // console.log({session, status, update})

  return (
    <>
      {
        session
          ? <div className='flex items-center justify-end gap-3 '>
          {session?.user?.name}
          <button onClick={() => signOut()} className='bg-amber-400 rounded p-2 px-4'>Sign out</button>
        </div>
        : <div className='flex items-center justify-end gap-3 '>
        Not signed in 
        <button onClick={() => signIn()} className='bg-emerald-400 rounded p-2 px-4'>Sign in</button>   
        </div>
      }
    </>
  )
}