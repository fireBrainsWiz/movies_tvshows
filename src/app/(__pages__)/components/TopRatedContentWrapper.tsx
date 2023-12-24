'use client'

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import ScrollIntoViewContainer from "./ScrollIntoViewContainer";


export default function TopRatedContentWrapper() {
  const searchParams = useSearchParams()
  const activeSlide = searchParams.get('active-slide')
  let lastSlide = searchParams.get('last-slide')
  const router = useRouter()
  const [n, setN] = useState(0)
  // console.log({ activeSlide, lastSlide })
  
  // console.log('NNNNNNNNN is: ', n)
  // console.log(searchParams.get('name'))

  useEffect(() => {
  }, [n])
  
  return (
    <div>
      
      <button type="button" onClick={() => router.back()}
        className="bg-amber-400 rounded p-2 px-4 m-2" 
      >
          router.back
      </button>
      <button type="button" onClick={() => router.push('/')}
        className="bg-sky-400 rounded p-2 px-4 m-2" 
      >
          router.push
      </button>
      <Link href={'/'}>
          Go home
      </Link>
      <Link href={'airing-today'} >
          Airing Today
      </Link>
      <h1 className="text-3xl text-center py-6">
        Top Rated Movies
      </h1>
      
      <div>
        {/* {
          name && <ScrollIntoViewContainer setN={setN}/>
        } */}
        <ScrollIntoViewContainer 
          activeSlide={activeSlide}
          lastSlide={lastSlide}
          searchParams={searchParams}
        />
      </div>
    </div>
  )
}