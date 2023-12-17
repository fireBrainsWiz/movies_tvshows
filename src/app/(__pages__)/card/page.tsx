'use client'

import {useSearchParams} from 'next/navigation'

export default function Card() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const title = searchParams.get('title')
  
  return (
    <div>
      card here
    </div>
  )
}