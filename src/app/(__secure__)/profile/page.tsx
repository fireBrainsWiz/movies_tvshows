'use client'

import axios from "axios"
import toast from "react-hot-toast"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"


export default function ProfilePage() {
  const router = useRouter()
  const [userID, setUserID] = useState(null)
  
  async function logout() {
    try{
      const res = await axios('/api/users/logout')
      toast(res.data.message)
      router.push('/login')
      
    }catch(err:any){
      toast(err.message)
    }
  }

  async function getUserDetails() {
    try{
      const res = await axios('/api/users/me')
      console.log(res.data)
      if(res.data.error) throw new Error(res.data.error)
      setUserID(res.data.data._id)

    } catch(err:any){
      toast(err.message)
    }
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Profile Page</p>
      <h2 className="my-10">
        {
          !userID? 'nothing yet' : <Link className="bg-sky-700 px-4 py-2 rounded" href={`/profile/${userID}`}>view profile of {userID}</Link>
        }
      </h2>

      <button className="bg-amber-700 px-4 py-2 rounded-full " onClick={logout}>Logout</button>
      <button className="bg-cyan-700 px-4 py-2 rounded-full " onClick={getUserDetails}>user details</button>
    </div>
  )
}



