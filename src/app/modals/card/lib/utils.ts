import axios from 'axios'
import { TMDBOptions } from '@/app/client/helpers/TMDB_API'
import { MediaTypeInfoType } from '@/app/lib/MediaTypeInfoTypes'
import { PopularPeopleList } from '@/app/(__pages__)/popular-people/layout'
import { TrailerType } from '@/app/lib/types'

export type StarDirectorWriterType = [
  string | null,
  {
    "id": number,
    "credit_id": string,
    "name": string,
    "gender": number,
    "profile_path": string
  }[],
] | [
  string | null,
  {
    "adult": boolean,
    "gender": number,
    "id": number,
    "known_for_department": string,
    "name": string,
    "original_name": string,
    "popularity": number,
    "profile_path": string,
    "cast_id": number,
    "character": string,
    "credit_id": string,
    "order": number
  }[]
] | [
  string | null,
  {
    "adult": boolean,
    "gender": number,
    "id": number,
    "known_for_department": string,
    "name": string,
    "original_name": string,
    "popularity": number,
    "profile_path": string,
    "cast_id": number,
    "character": string,
    "credit_id": string,
    "order": number
  }[]
]


export function starDirectorWriterCreator(
  whereToLookFrom: MediaTypeInfoType['credits']
    | MediaTypeInfoType['details'],
  description: 'Star' | 'Director' | 'Writer' | null, 
): StarDirectorWriterType {
  if ('cast' in whereToLookFrom) {
    //credits
    let name: string = ''
    let toReturn: 
    | MediaTypeInfoType['credits']['cast']
    | MediaTypeInfoType['credits']['crew'] = []


    if (description === 'Star') {
      name='Star'
      toReturn = whereToLookFrom.cast.filter((item) => {
        return item.known_for_department === 'Acting'
      })

    } else if (description === 'Director') {
      name='Director'
        toReturn =  whereToLookFrom.crew.filter((item) => {
          return item.known_for_department === 'Directing'
      })

    }else if (description === 'Writer') {
      name='Writer'
        toReturn = whereToLookFrom.crew.filter((item) => {
          return item.known_for_department === 'Writing'
      })
    }

    return [
      toReturn.length===0
        ? null : `${toReturn.length===1 
          ? name : name+'s' }`, toReturn
    ]
    
  } else {
    //details
    if (!('created_by' in whereToLookFrom)) return [] as any
    
    return [
      whereToLookFrom.created_by.length===0? null :
      `${whereToLookFrom.created_by.length===1 ? 'Creator' : 'Creators' }`,
      whereToLookFrom.created_by
    ]
  }

    
}


// Wk0cvHzpAIM

// const trailers = {
//   "id": 572802,
//   "results": [
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "Aquaman Recap in 60 Seconds",
//       "key": "Ix0gJwrpexI",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Featurette",
//       "official": true,
//       "published_at": "2023-12-22T22:00:06.000Z",
//       "id": "658a9e155aba326759b9ee69"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "Now Playing",
//       "key": "PoF4B_xPVlg",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Teaser",
//       "official": true,
//       "published_at": "2023-12-22T17:25:13.000Z",
//       "id": "658734232dffd85c8f44ddf0"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "Mouthful of Water Challenge",
//       "key": "_B25AduQRE4",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Featurette",
//       "official": true,
//       "published_at": "2023-12-21T17:34:05.000Z",
//       "id": "6585ba5c28d7fe58b439ff40"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "Aquaman ASMR",
//       "key": "zw5KVWAx_Ao",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Featurette",
//       "official": true,
//       "published_at": "2023-12-20T15:16:37.000Z",
//       "id": "6583adfe08354744c23ecf35"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "Special Event Broadcast",
//       "key": "rgSZs3kVhKM",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Featurette",
//       "official": true,
//       "published_at": "2023-12-19T22:40:31.000Z",
//       "id": "6583ae11880551409d27f538"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "Behind-the-Scenes Featurette | Filmed For IMAX®",
//       "key": "gB--kMMcrUY",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Behind the Scenes",
//       "official": true,
//       "published_at": "2023-12-19T19:51:13.000Z",
//       "id": "6586b8bfea7b0e5ede8f78e6"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "Aquaman's Last Stand",
//       "key": "Wk0cvHzpAIM",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Teaser",
//       "official": true,
//       "published_at": "2023-12-15T23:41:33.000Z",
//       "id": "6583adf2083547446f3ee8e4"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "Black Manta Returns Featurette",
//       "key": "R6ZFWh6Utp0",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Featurette",
//       "official": true,
//       "published_at": "2023-12-14T23:11:29.000Z",
//       "id": "657be2c3ea3949011b3cda21"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "Tickets on Sale",
//       "key": "4cSkHPW-MPE",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Teaser",
//       "official": true,
//       "published_at": "2023-11-20T17:38:18.000Z",
//       "id": "656383b9a6c104011bde45d7"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "Official Trailer",
//       "key": "UGc5Tzz19UY",
//       "site": "YouTube",
//       "size": 2160,
//       "type": "Trailer",
//       "official": true,
//       "published_at": "2023-09-20T17:37:05.000Z",
//       "id": "651299c18e2ba600c7cceb61"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "Teaser",
//       "key": "Fbb4e_Q6wR8",
//       "site": "YouTube",
//       "size": 2160,
//       "type": "Teaser",
//       "official": true,
//       "published_at": "2023-09-11T00:00:09.000Z",
//       "id": "64fe597a2dffd8013bcca93e"
//     }
//   ]
// }


export async function getTrailers(url: string, id: number): Promise<TrailerType[]> {
  let trailer: TrailerType[] = []
  
  try {
    const res = await axios(`${url}${id}/videos?language=en-US`, TMDBOptions)
    if(!res.data?.results) throw new Error('No trailer found')
      // console.log(res.data)
    trailer = res.data.results
    return trailer

  } catch(err: any) {
    console.log(err)
  }

  return trailer
}



const myArr12345vdghdvh = [
{
  "adult": true,
  "gender": 1,
  "id": 123,
  "known_for_department": 'good',
  "name": 'zaa',
  "original_name": 'zaa',
  "popularity": 12,
  "profile_path": 'zaas',
  "cast_id": 1,
  "character": 'wwew',
  "credit_id": 'hg',
  "order": 14
},
{
  "adult": true,
  "gender": 1,
  "id": 123,
  "known_for_department": 'good',
  "name": 'zaa',
  "original_name": 'zaa',
  "popularity": 12,
  "profile_path": 'zaas',
  "cast_id": 1,
  "character": 'wwew',
  "credit_id": 'hg',
  "order": 14
},
{
  "adult": true,
  "gender": 1,
  "id": 123,
  "known_for_department": 'good',
  "name": 'zaa',
  "original_name": 'zaa',
  "popularity": 12,
  "profile_path": 'zaas',
  "cast_id": 1,
  "character": 'wwew',
  "credit_id": 'hg',
  "order": 14
},
{
  "adult": true,
  "gender": 1,
  "id": 123,
  "known_for_department": 'good',
  "name": 'zaa',
  "original_name": 'zaa',
  "popularity": 12,
  "profile_path": 'zaas',
  "cast_id": 1,
  "character": 'wwew',
  "credit_id": 'hg',
  "order": 14
},
{
  "adult": true,
  "gender": 1,
  "id": 123,
  "known_for_department": 'good',
  "name": 'zaa',
  "original_name": 'zaa',
  "popularity": 12,
  "profile_path": 'zaas',
  "cast_id": 1,
  "character": 'wwew',
  "credit_id": 'hg',
  "order": 14
},
{
  "adult": true,
  "gender": 1,
  "id": 123,
  "known_for_department": 'good',
  "name": 'Ebou',
  "original_name": 'zaa',
  "popularity": 12,
  "profile_path": 'zaas',
  "cast_id": 1,
  "character": 'wwew',
  "credit_id": 'hg',
  "order": 14
},
{
  "adult": true,
  "gender": 1,
  "id": 123,
  "known_for_department": 'good',
  "name": 'Musa',
  "original_name": 'zaa',
  "popularity": 12,
  "profile_path": 'zaas',
  "cast_id": 1,
  "character": 'wwew',
  "credit_id": 'hg',
  "order": 14
},
{
  "adult": true,
  "gender": 1,
  "id": 123,
  "known_for_department": 'good',
  "name": 'Modu',
  "original_name": 'zaa',
  "popularity": 12,
  "profile_path": 'zaas',
  "cast_id": 1,
  "character": 'wwew',
  "credit_id": 'hg',
  "order": 14
},
{
  "adult": true,
  "gender": 1,
  "id": 123,
  "known_for_department": 'good',
  "name": 'Modu',
  "original_name": 'zaa',
  "popularity": 12,
  "profile_path": 'zaas',
  "cast_id": 1,
  "character": 'wwew',
  "credit_id": 'hg',
  "order": 14
},
{
  "adult": true,
  "gender": 1,
  "id": 123,
  "known_for_department": 'good',
  "name": 'Modu',
  "original_name": 'zaa',
  "popularity": 12,
  "profile_path": 'zaas',
  "cast_id": 1,
  "character": 'wwew',
  "credit_id": 'hg',
  "order": 14
},
{
  "adult": true,
  "gender": 1,
  "id": 123,
  "known_for_department": 'good',
  "name": 'Modu',
  "original_name": 'zaa',
  "popularity": 12,
  "profile_path": 'zaas',
  "cast_id": 1,
  "character": 'wwew',
  "credit_id": 'hg',
  "order": 14
},
{
  "adult": true,
  "gender": 1,
  "id": 123,
  "known_for_department": 'good',
  "name": 'Modu',
  "original_name": 'zaa',
  "popularity": 12,
  "profile_path": 'zaas',
  "cast_id": 1,
  "character": 'wwew',
  "credit_id": 'hg',
  "order": 14
},
]

// console.log(getFirstThreeItems(myArr12345vdghdvh))
export function getFirstXItems(
  arr: MediaTypeInfoType['credits']['cast'] 
  | MediaTypeInfoType['credits']['crew'],
  x = arr.length
) {
  const obj: any = {}

  arr
  .sort((a, b) => b.popularity - a.popularity)
  .map((item) => {
    if (!(item.profile_path in obj)) 
      return obj[item.profile_path] = item
  })

  return Array.from(Object.values(obj)).slice(0, x) as typeof arr
}

export function calculateRuntime(runtime: number) {
if (!runtime) return 'N/A'

const hours = Math.floor(runtime / 60)
const minutes = runtime % 60
return hours && !minutes
  ? `${hours}h` 
  :  minutes && !hours? `${minutes}m`
  : `${hours}h ${minutes}m`
}

export function formatNumber(n: number) {
  if (!n) return 'N/A'
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function getColorBasedOnFirstLetterAndFirstLetter(name: string) {

  const COLORS = {
    A: '#f43f5e',
    B: '#3b82f6',
    C: '#22c55e',
    D: '#eab308',
    E: '#a855f7',
    F: '#ec4899',
    G: '#f97316',
    H: '#14b8a6',
    I: '#6366f1',
    J: '#8b5cf6',
    K: '#84cc16',
    L: '#d946ef',
    M: '#334155',
    N: '#06b6d4',
    O: '#10b981',
    P: '#0ea5e9',
    Q: '#64748b',
    R: '#f59e0b',
    S: '#991b1b',
    T: '#1e40af',
    U: '#065f46',
    V: '#854d0e',
    W: '#86198f',
    X: '#9d174d',
    Y: '#9a3412',
    Z: '#115e59',
  }
  
  const firstLetter = name.charAt(0).toUpperCase();
  let color = 'bg-gray-500';  
  if (firstLetter in COLORS) {
    color = COLORS[firstLetter as keyof typeof COLORS] || '#10b981';
  }

  return {firstLetter, color}; 
}  


export const getGenderByNumber = (number: number) => {
  switch (number) {
    case 1:
      return 'Female';
    case 2:
      return 'Male';
    case 3:
      return 'Non-binary';
    default:
      return 'N/A';
  }
};


export function getSortedPosterPathsOfKnownFors(
  result: PopularPeopleList['results'][number]
) {

  return result.known_for
  .sort((a, b) => b.popularity - a.popularity)
  // .map((item) => item?.poster_path)
}

// const trailers = {
//   "id": 572802,
//   "results": [
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "Aquaman Recap in 60 Seconds",
//       "key": "Ix0gJwrpexI",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Featurette",
//       "official": true,
//       "published_at": "2023-12-22T22:00:06.000Z",
//       "id": "658a9e155aba326759b9ee69"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "Now Playing",
//       "key": "PoF4B_xPVlg",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Teaser",
//       "official": true,
//       "published_at": "2023-12-22T17:25:13.000Z",
//       "id": "658734232dffd85c8f44ddf0"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "Mouthful of Water Challenge",
//       "key": "_B25AduQRE4",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Featurette",
//       "official": true,
//       "published_at": "2023-12-21T17:34:05.000Z",
//       "id": "6585ba5c28d7fe58b439ff40"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "Aquaman ASMR",
//       "key": "zw5KVWAx_Ao",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Featurette",
//       "official": true,
//       "published_at": "2023-12-20T15:16:37.000Z",
//       "id": "6583adfe08354744c23ecf35"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "Special Event Broadcast",
//       "key": "rgSZs3kVhKM",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Featurette",
//       "official": true,
//       "published_at": "2023-12-19T22:40:31.000Z",
//       "id": "6583ae11880551409d27f538"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "Behind-the-Scenes Featurette | Filmed For IMAX®",
//       "key": "gB--kMMcrUY",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Behind the Scenes",
//       "official": true,
//       "published_at": "2023-12-19T19:51:13.000Z",
//       "id": "6586b8bfea7b0e5ede8f78e6"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "Aquaman's Last Stand",
//       "key": "Wk0cvHzpAIM",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Teaser",
//       "official": true,
//       "published_at": "2023-12-15T23:41:33.000Z",
//       "id": "6583adf2083547446f3ee8e4"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "Black Manta Returns Featurette",
//       "key": "R6ZFWh6Utp0",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Featurette",
//       "official": true,
//       "published_at": "2023-12-14T23:11:29.000Z",
//       "id": "657be2c3ea3949011b3cda21"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "Tickets on Sale",
//       "key": "4cSkHPW-MPE",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Teaser",
//       "official": true,
//       "published_at": "2023-11-20T17:38:18.000Z",
//       "id": "656383b9a6c104011bde45d7"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "Official Trailer",
//       "key": "UGc5Tzz19UY",
//       "site": "YouTube",
//       "size": 2160,
//       "type": "Trailer",
//       "official": true,
//       "published_at": "2023-09-20T17:37:05.000Z",
//       "id": "651299c18e2ba600c7cceb61"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "Teaser",
//       "key": "Fbb4e_Q6wR8",
//       "site": "YouTube",
//       "size": 2160,
//       "type": "Teaser",
//       "official": true,
//       "published_at": "2023-09-11T00:00:09.000Z",
//       "id": "64fe597a2dffd8013bcca93e"
//     }
//   ]
// }
