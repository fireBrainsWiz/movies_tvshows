'use client'

import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
// import {useState, useEffect} from 'react'
import { FieldValues, useForm } from "react-hook-form"
// import toast from "react-hot-toast"
axios.defaults.withCredentials = true

export default function SignupPage() {
  const router = useRouter() 

  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting}, 
    reset,
    getValues
  } = useForm()


  async function onSignup(data: FieldValues) {
    // try {
    //   setLoading(true)
    //   const res = await axios.post("/api/auth/users/signup", user)
    
    //   console.log(res.data.error)
    //   if (res.data.error) throw new Error(res.data.error)
      
    //   toast("now log in")
    //   router.push("/login")

    // } catch (err: any) {
    //   console.log('signup failed ', err)
    //   toast(err.message)
      
    // } finally {
    //   setLoading(false)
    // }
    reset()
  }



  return (
    <div className="min-h-screen bg-slate-100  pt-20">
      <h1 className="text-center p-4">{isSubmitting? 'loading...' : 'sign up'}</h1>
      <form 
        // method="post"
        className="flex flex-col gap-6 p-4 bg-stone-50 max-w-sm mx-auto rounded border"
        onSubmit={handleSubmit(onSignup)}
      >
        <div className="bg-blue-400p flex flex-wrap">
          <label htmlFor="username">username</label>
          <input 
            className="w-full h-[35px]"
            {
              ...register("username", {
                  required: 'username is required',
                  minLength: {
                    value: 3,
                    message: 'username must be at least 3 characters'
                  }
                }
              )
            }
            type="text" 
            id="username"
            placeholder="your username"
          />
          {
            errors.username && (
              <p className="text-red-500">{`${errors.username.message}`}</p>
            )
          }
        </div>
      
        <div className="bg-blue-400p flex flex-wrap">
          <label htmlFor="email">email</label>
          <input 
            className="w-full h-[35px]"
            {...register("email", {required: 'email is required'})}
            type="email"
            id="email"
            placeholder="your email"
          />
          {
            errors.email && (
              <p className="text-red-500">{`${errors.email.message}`}</p>
            )
          }
        </div>
      
        <div className="bg-blue-400p flex flex-wrap">
          <label htmlFor="password">password</label>
          <input 
            className="w-full h-[35px]"
            {
              ...register("password",
                {
                  required: 'password is required',
                  minLength: {
                    value: 10,
                    message: 'password must be at least 10 characters'
                  }
                }
              )
            }
            type="password" 
            id="password"
            placeholder="your password"
          />
          {
            errors.password && (
              <p className="text-red-500">{`${errors.password.message}`}</p>
            )
          }
        </div>

        <div className="bg-blue-400p flex flex-wrap">
          <label htmlFor="confirmPassword">confirmPassword</label>
          <input 
            className="w-full h-[35px]"
            {
              ...register("confirmPassword",
                {
                  required: 'password is required',
                  validate: (val) => val === getValues('password') || 'passwords do not match',
                })
            }
            type="password" 
            id="confirmPassword"
            placeholder="confirm your password"
          />
          {
            errors.confirmPassword && (
              <p className="text-red-500">{`${errors.confirmPassword.message}`}</p>
            )
          }
        </div>

        <button 
          className=' bg-cyan-600 disabled:bg-stone-600 disabled:cursor-not-allowed p-2 py-1 rounded-md w-1/2 self-center'
          disabled={isSubmitting}
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