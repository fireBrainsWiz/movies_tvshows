'use client'

import {useQuery} from '@tanstack/react-query'
import axios from 'axios'

export default function About() {
  // const {data} = useQuery(
  //   ['about']/*about is id and must be unique*/, 
  //   async () => {
  //     return (await axios('https://jsonplaceholder.typicode.com/todos/1')).data
  // })

  const {data, isLoading, error} = useQuery({
    queryKey: ['about'],
    queryFn: async () => {
      return (await axios('https://jsonplaceholder.typicode.com/todos/1')).data
    }
  })

  if(error) {
    return <div>{error.message}</div>
  }
  return (
    <div className="bg-amber-900 min-h-screen">
      {isLoading ? 'Loading...' : data?.title}
    </div>
  )
}