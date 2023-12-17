'use client'

import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {useState, useEffect} from 'react'
import toast from "react-hot-toast"
axios.defaults.withCredentials = true

export default function SignupPage() {
  const router = useRouter() 
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",    
    confirmPassword: "",    
  })

  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)

  async function onSignup() {
    try {
      setLoading(true)
      const res = await axios.post("/api/auth/users/signup", user)
    
      console.log(res.data.error)
      if (res.data.error) throw new Error(res.data.error)
      
      toast("now log in")
      router.push("/login")

    } catch (err: any) {
      console.log('signup failed ', err)
      toast(err.message)
      
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user.email.trim() && user.username.trim() && user.password.trim() && user.confirmPassword.trim() && user.password === user.confirmPassword) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])


  return (
    <div className="min-h-screen bg-slate-100  pt-20">
      <h1 className="text-center p-4">{loading? 'loading...' : 'sign up'}</h1>
      <form 
        method="post"
        className="flex flex-col gap-6 p-4 bg-stone-50 max-w-sm mx-auto rounded border"
        onSubmit={(e) => {
          e.preventDefault()
          onSignup()
        }}
      >
        <div className="bg-blue-400p flex flex-wrap">
          <label htmlFor="username">username</label>
          <input 
            className="w-full h-[35px]"
            type="text" 
            name="username"
            id="username"
            placeholder="your username"
            value={user.username} 
            onChange={(e) => setUser({...user, username: e.target.value})}
          />
        </div>
      
        <div className="bg-blue-400p flex flex-wrap">
          <label htmlFor="email">email</label>
          <input 
            className="w-full h-[35px]"
            type="email"
            name="email" 
            id="email"
            placeholder="your email"
            value={user.email} 
            onChange={(e) => setUser({...user, email: e.target.value})}
          />
        </div>
      
        <div className="bg-blue-400p flex flex-wrap">
          <label htmlFor="password">password</label>
          <input 
            className="w-full h-[35px]"
            type="password" 
            name="password"
            id="password"
            placeholder="your password"
            value={user.password} 
            onChange={(e) => setUser({...user, password: e.target.value})}
          />
        </div>

        <div className="bg-blue-400p flex flex-wrap">
          <label htmlFor="confirmPassword">confirmPassword</label>
          <input 
            className="w-full h-[35px]"
            type="password" 
            name="confirmPassword"
            id="confirmPassword"
            placeholder="confirm your password"
            value={user.confirmPassword} 
            onChange={(e) => setUser({...user, confirmPassword: e.target.value})}
          />
        </div>

        <button 
          className={`${buttonDisabled || loading? 'bg-stone-600 cursor-not-allowed': 'bg-cyan-600'} p-2 py-1 rounded-md w-1/2 self-center`}
          disabled={buttonDisabled || loading}
        >
            Signup
          </button>
        <p className="flex items-center justify-center gap-2">
          <span className="text-xs ">Already have an account? </span>
        <Link className="bg-blue-800 p-3 py-[3px] rounded-md" href="/login">login</Link>          
        </p>
      </form>
    </div>
  )
}