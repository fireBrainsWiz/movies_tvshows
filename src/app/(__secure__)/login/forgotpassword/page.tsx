'use client'

import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)

  
  async function submit() {
    
    try {
      const res = await  axios.post('/api/auth/users/forgotpassword', {email})
      
      if(res.data.error) throw new Error(res.data.error)
      toast(res.data.message)
      setEmailSent(true)
    } catch (err: any) {
      console.log(err)
      toast(err.message)
    }
  }
  
  return (
    <div className="h-screen  py-10">
      {
        emailSent ? (
          <p>A link has been sent to your email, please go to your email and check it</p>
        )
        : (
          <form action="post" 
          onSubmit={(e) => {
            e.preventDefault()
            submit()
          }}
          className="bg-slate-500 min-h-[200px] max-w-md mx-auto rounded ">
            <div className="flex p-4 flex-wrap">
              <label htmlFor="email" className="w-full">Email</label>
              <input 
                className="w-full h-[40px] indent-2"
                placeholder="Enter your email"
                id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <button type="submit" className="w-1/3 rounded max-w-md mx-auto block my-10 p-2 bg-blue-500 text-white hover:bg-emerald-300">Receive email</button>
          </form>
        )
      }
    </div>
  )
}