 import { useContext } from 'react'
import SlickSlider from './SlickSlider'
import MoviesOrTVshowsLinksContext from '../../context/MoviesOrTVshowsLinksContext'


let timerId1, timerId2, timerId3
export default function CrimeDramaMystery() {
  const {links} = useContext(MoviesOrTVshowsLinksContext)
  
  
  return (
    <>
      <div>
        <SlickSlider 
          genre='crime' 
          timerId={timerId1}
          links={links}
        />
        <SlickSlider 
          genre='drama' 
          timerId={timerId2} 
          links={links}
        />
        <SlickSlider 
          genre='mystery' 
          timerId={timerId3}
          links={links} 
        />
      </div>
      <hr className="hr"/>  
    </>
  )
}
