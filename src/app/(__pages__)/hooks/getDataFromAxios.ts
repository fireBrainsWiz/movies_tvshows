import axios from "axios"
import { TMDBOptions } from "@/app/client/helpers/TMDB_API"
import { MediaTypeInfoType } from "@/app/lib/MediaTypeInfoTypes"

export default async function getDataFromAxios(
  { URL}: { URL: string}
  ): Promise<[] | object> {

  try {
    const res = await axios(URL, TMDBOptions)
    // setData((prev: object) => ({...prev, ...res.data}))
    return res.data
  } catch (error: any) {
    // console.log(error)
    return error
  } 
    
}
export  async function getInfoDataFromAxios(
  { URL}: { URL: string}
  ): Promise<any> {

  try {
    const res = await axios(URL, TMDBOptions)
    // setData((prev: object) => ({...prev, ...res.data}))
    return res.data
  } catch (error: any) {
    // console.log(error)
    return error
  } 
    
}
