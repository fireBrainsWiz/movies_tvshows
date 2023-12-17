'use client'

import axios from "axios"
import Link from "next/link"
import {useEffect, useState} from 'react'  

export default function VerifyEmailPage() {
  const [token, setToken] = useState('')
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState('')

  
  // const verifyEmail = useCallback( async () => {
    
    
  // }, [token])

  useEffect(() => {
    setToken(window.location.search.split('=')[1])
  }, [setToken])

  useEffect(() => {
    async function verifyEmail() {
      try {
        const res = await axios.post('/api/auth/users/verifyemail', {token})
        if (res.data.error) throw new Error(res.data.error)
        setVerified(true)
        setError('')
  
      } catch (err: any) {
        setError(err.message)
      }
    }
    verifyEmail()
    
  }, [token, setVerified, setError])

  console.log(token, verified, error)
  


  return (
    <div>
      <h1 className="text-sky-500 text-center p-4 rounded">verify email</h1>
      <h2 className="text-emerald-500 bg-orange-950 m-4 break-words text-center p-4 rounded">{token? `${token}` : "No token"}</h2>

      <div>
        {verified && <h1 className="text-emerald-500 text-center p-4 rounded">
          <Link href="/login">
            email verified, you can login
          </Link>
        </h1>}
        {error && <h1 className="text-rose-500 text-center p-4 rounded">{error}</h1>}
      </div>
    </div>
  )
} 