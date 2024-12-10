export default function Parts({parts}: {parts: PartsType | []}) {
  return (
    parts.length > 0 && (
      <div className="p-4 bg-green-900p">
        {parts.map((part) => (
          <div key={part.id}>
            <h1>{part.title}</h1>
            <p>{part.overview}</p>
          </div>
        ))}
      </div>
    )
  )
}


  export type PartsType = [
    {
      backdrop_path: string  
      id: number
      title: string
      original_title: string
      overview: string
      poster_path: string
      media_type: string
      adult: boolean
      original_language: string
      genre_ids: number[]
      popularity: number
      release_date: string
      video: boolean
      vote_average: number
      vote_count: number
    }
  ] 

  
