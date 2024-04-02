import SlickSlider from './SlickSlider'
import { Genre } from '@/app/lib/types'

export default function CrimeDramaMystery() {
  const genres: Genre[] = ['crime', 'drama', 'mystery']
  // const genres: Genre[] = ['crime']
  
  return (
    <>
      <div>
        {
          genres.map((genre) => {
            return (
              <SlickSlider 
                key={genre}
                genre={genre} 
              />  
            )
          })
        }
      </div>
      <hr className="hr"/>  
    </>
  )
}


