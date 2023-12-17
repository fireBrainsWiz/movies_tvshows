'use client'

import axios from "axios"
import { useRouter } from "next/navigation"
import { useState, ChangeEvent, useEffect } from "react"
import toast from "react-hot-toast"


export default function ResetPassword() {
  const router = useRouter()
  
  const [newPassword, setNewPassword] = useState({
    password: "",
    confirmPassword: "",
  })

  const [token, setToken] = useState("")
  

  function onPasswordChange(e: ChangeEvent<HTMLInputElement>) {
    setNewPassword(pv => ({
      ...pv,
      [e.target.name]: e.target.value
    }))
  }
  
  async function save() {
    if(newPassword.password !== newPassword.confirmPassword || !token) {
      toast.error("passwords do not match")
      return
    }

    
    try {
      const res = await  axios.post('/api/auth/users/resetpassword', {token, password: newPassword.password})
      
      if(res.data.error) throw new Error(res.data.error)
      toast(res.data.message)
      router.push('/login')
    
    } catch (err: any) {
      toast(err.message)
    }
  }
  

  useEffect(() => {
    setToken(location.search.split('=')[1])
  }, [setToken])
  
  return (
    <div className="h-screen  py-10">
      <form action="post" 
      onSubmit={(e) => {
        e.preventDefault()
        save()
      }}
      className="bg-slate-500 min-h-[200px] max-w-md mx-auto rounded py-1">
        <div className="flex p-4 flex-wrap">
          <label htmlFor="password" className="w-full">password</label>
          <input 
            className="w-full h-[40px] indent-2"
            placeholder="Enter new password"
            id="password" name="password" type="password" value={newPassword.password} onChange={onPasswordChange}
            />
        </div>
        <div className="flex p-4 flex-wrap">
          <label htmlFor="confirmPassword" className="w-full">confirmPassword</label>
          <input 
            className="w-full h-[40px] indent-2"
            placeholder="confirm password"
            id="confirmPassword" name="confirmPassword" type="password" value={newPassword.confirmPassword} onChange={onPasswordChange}
            />
        </div>
        <button type="submit" className="w-1/3 rounded max-w-md mx-auto block my-10 p-2 bg-blue-500 text-white hover:bg-emerald-300">Save</button>
      </form>
    </div>
  )
}