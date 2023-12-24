import { useEffect, useState } from "react"
import axios from "axios"
import { TMDBOptions } from "@/app/client/helpers/TMDB_API"
import { LINKS } from "@/app/lib/types"



export default async function useGetDataFromAxios(
  {page, setIsLoading, setIsError, setData}: { 
    page: number, 
    setIsLoading: any, 
    setIsError: any
    setData: any
  }) {

    useEffect(() => {
      const getData = async () => {
        try {
          setIsLoading(true)
          setIsError(false)
          const res = await axios(`${LINKS.MOVIELISTS.TOPRATED}${page}`, TMDBOptions)
          setData(res.data)
  
        } catch (error) {
          console.log(error)
          setIsError(true)
        } finally {
          setIsLoading(false)
        }
      }
      
      (async () => await getData())()
    }, [page, setIsLoading, setIsError, setData])
  
}
