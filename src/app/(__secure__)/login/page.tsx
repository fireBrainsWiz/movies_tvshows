'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"
import {useState, useEffect} from 'react'
import toast from "react-hot-toast"
import {signIn} from 'next-auth/react'
import { useForm, FieldValues } from "react-hook-form"


export default function LoginPage() {

  const router = useRouter() 

  const { 
    register, 
    handleSubmit, 
    formState: {isSubmitting}, 
    reset
  } = useForm()
  
  const providers = {
    google: {
      id: "google",
      name: "Google",
    },
    github: {
      id: "github",
      name: "Github",
    },
  }

  async function onLogin(data: FieldValues) {
    const user = {
      email: data.email,
      password: data.password
    }
    
    try {
      const res = await signIn('credentials', {
        ...user, 
        redirect: false,
      })

      console.log(res)
      // toast(`welcome back ${res.data.username}`)
      if (res?.error) throw new Error(res.error)
      
      router.push("/")
      reset()
      router.refresh()

    } catch(err: any) {
      // toast.error(err.message)
      const _error = {
        err1: 'if this is your first time logging in, make sure you verify your email',
        err2: 'Also make sure your email and password are correct',
      }
      toast.error(_error.err2)
      toast.error(_error.err1)
    } 
  }



  return (
    <div className="min-h-screen bg-slate-100  pt-20p">
      <h1 className="text-center py-4 text-4xl mb-10">{isSubmitting? "loading..." : "Login"}
      </h1>

      
      <form 
      method="post"
        className="flex flex-col gap-6 p-4 bg-stone-50 max-w-sm mx-auto rounded border"
        onSubmit={handleSubmit(onLogin)}
      >
        <div className="bg-amber-400p flex items-center justify-center text-xl">
          login with 
        </div>

        {Object.values(providers).map((provider) => (
          <div key={provider.name} className="bg-blue-400 h-[50px] rounded-full">
            <button type="button" onClick={() => signIn(provider.id)} className="bg-red-400p w-full h-full rounded-md">
              Sign in with {provider.name}
            </button>
          </div>
        ))}
        

        <Or/>
        <Or2/>


        <div className="bg-blue-400p flex flex-wrap">
          <label htmlFor="email">email</label>
          <input 
            className="w-full h-[40px] rounded indent-[5px]"
            {...register("email", {
                required: 'email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'invalid email address'
                }
            })}
            type="email"
            id="email"
            placeholder="your email"
          />
        </div>
        <div className="bg-blue-400p flex flex-wrap">
          <label htmlFor="password">password</label>
          <input 
            className="w-full h-[40px] rounded indent-[5px]"
            {...register("password", {
                required: 'password is required',
                minLength: {
                  value: 10,
                  message: 'password must be at least 6 characters'
                }
              }
            )
            }
            type="password" 
            id="password"
            placeholder="your password"
          />
        </div>
  
        <button 
          type="submit"
          className=' disabled:bg-stone-600 disabled:cursor-not-allowe bg-blue-800 p-2 py-2 rounded-md w-1/2 self-center'
          disabled={isSubmitting}
        >
            Login
          </button>
        <p className="flex items-center justify-center text-xs">
          <Link className="text-blue-600 " href="/login/forgotpassword">Forgot password?</Link>
        </p>
        <p className="flex items-center justify-center gap-2 mt-5">
          <span className="text-xs ">No aacount yet? </span>
        <Link className="bg-cyan-600 p-3 py-[2px] rounded-md" href="/signup">Create new account</Link>          
        </p>
      </form>
    </div>
  )
}


const Or = () => {
  return (
    <div className="bg-amber-400p flex items-center">
      <span className="bg-stone-500 h-[1px] w-[45%]"></span>
      <span className="bg-yellow-500p h-[20px] w-[10%] flex items-center justify-center">
        or
      </span>
      <span className="bg-stone-500 h-[1px] w-[45%]"></span>
    </div>
  )
}

const Or2 = () => {
  return (
    <div className="grid grid-cols-[45%_10%_45%] items-center">
      <hr />
      <span className="bg-red-500p text-center">or</span>
      <hr />
    </div>
  )
}