
import { TMDBOptions } from '@/app/client/helpers/TMDB_API'
import {useQuery} from '@tanstack/react-query'
import axios from 'axios'

  
  export default function useReactQuery({
    queryString = '',
    URL = ''
  }) {
    const {data, isLoading, error} = useQuery({
      queryKey: [queryString],
      queryFn: async () => {
        return (await axios(URL, TMDBOptions)).data
      }
    })

    return { data, isLoading, error }
  }


  /* [about] is id and must be unique */