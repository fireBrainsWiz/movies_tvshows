import { _TVshows, _Movies } from "@/app/(__pages__)/context/MoviesOrTVshowsLinksContext"
import SlickSlider from "@/app/(__pages__)/popular/crime-drama-mystery/SlickSlider"


let timerId: any
export default function Similar(
  {id, links}: {id: number, links: _TVshows | _Movies}
  ) {

    
  return (
    <div>
      <SlickSlider 
        genre={null} 
        timerId={timerId}
        links={links}
        title='similar'
        id={id}
      />
    </div>
  )
}