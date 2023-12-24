'use client'

import Link from 'next/link'
import {useRouter, useSearchParams} from 'next/navigation'

export default function Card() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const title = searchParams.get('title')
  const activeSlide = searchParams.get('active-slide')
  const lastSlide = searchParams.get('last-slide')
  
  return (
    <div>
      <button type="button" onClick={() => router.back()}
        className="bg-amber-400 rounded p-2 px-4 m-2" 
      >
          router.back
      </button>
      <button type="button" onClick={() => router.push('top-rated?last-slide=' + lastSlide)}
        className="bg-sky-400 rounded p-2 px-4 m-2" 
      >
          router.push
      </button>
      <Link href={`top-rated?last-slide=${lastSlide}&active-slide=${activeSlide}`}>
          Go back
      </Link>
      <h1 className="text-3xl text-center py-6">
        Card here
        {lastSlide}
      </h1>
    </div>
  )
}