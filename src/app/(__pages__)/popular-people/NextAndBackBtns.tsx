'use client'

import { TMDBOptions } from '@/app/client/helpers/TMDB_API'
import { useRouter, usePathname, useParams, } from 'next/navigation'
import { useEffect, useState } from 'react'
import {PopularPeopleList} from './layout'
import { IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from "react-icons/io";



export default function NextAndBackBtns() {
  const router = useRouter()
  const params = useParams()

  const [page, setPage] = useState(Number(params?.page_number) || 1)  
  const [totalPages, setTotalPages] = useState(0)
  // console.log(params?.page_number)



  function backward() {
    if (page <= 1) return

    setPage(page - 1)
    router.push(`/popular-people/${page - 1}`)  
  }

  function forward() {
    if (page >= totalPages) return

    setPage(page + 1)
    router.push(`/popular-people/${page + 1}`)
  }


  useEffect(() => {
    (async () => {
      try {
        const {total_pages}: PopularPeopleList = await fetch(
          'https://api.themoviedb.org/3/person/popular?language=en-US&page=1', 
          TMDBOptions
        ).then(res => res.json()) 

        setTotalPages(total_pages)

      } catch (error) {
        console.error(error)
      }
    })()

  }, [])

  
  return  Number(params?.page_number)? (
    <div className='flex items-center justify-between  p-4  bg-[#222] sticky bottom-0 mt-10 '
    >
      <button
        disabled={page <= 1}
        className='disabled:opacity-10 disabled:cursor-not-allowed'
        onClick={backward}
      >
        <IoIosArrowDropleftCircle size={40} color='#f59e0b'/>
      </button>

      <button
        disabled={page >= totalPages || page >= 499}
        className='disabled:opacity-10 disabled:cursor-not-allowed'
        onClick={forward}  
      >
        <IoIosArrowDroprightCircle size={40} color='#22c55e'/>
      </button>
    </div>
  ) : null
}
