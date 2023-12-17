'use client'

import getGuessUserSession from "../helpers/TMDB_API"
import axios from "axios"
import { usePathname, useRouter } from "next/navigation"




export default function ModalContent() {
  const router = useRouter()
  const pathname = usePathname()
  
  async function myLogin() {
    const session = await getGuessUserSession()
    const res = await axios.post('/api/auth/guest', session)
    
    router.push(pathname)
    router.refresh()
  }
  
  return (
    <div className="absolute inset-0 bg-stone-600/60 flex items-center justify-center z-[10]">
      <div className='bg-emerald-400/10p border border-stone-500 rounded-md w-full max-w-md h-[300px] grid  grid-rows-[30%_70%]  overflow-hidden'>
        <p className="w-fullp text-center bg-stone-700 text-3xl flex justify-center items-center">Welcome User</p>
        <div className="flex flex-col items-center justify-center gap-10">
          <button className="bg-emerald-600 rounded-md p-4">Create account with TMDB</button>
          <button 
            onClick={myLogin} 
            className="bg-blue-600 rounded-md p-4">
            Continue as a guest
          </button>
        </div>
      </div>
    </div>
  )
}