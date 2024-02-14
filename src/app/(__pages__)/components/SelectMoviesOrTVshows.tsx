import { useEffect, useRef, useContext } from "react"
import { MdKeyboardArrowDown } from "react-icons/md"
import MoviesOrTVshowsLinksContext from "../context/MoviesOrTVshowsLinksContext"


export default function SelectMoviesOrTVshows() {
  const span = useRef<HTMLSpanElement | null>(null)
  const select = useRef<HTMLSelectElement | null>(null)

  const { setMoviesOrTVshows } = useContext(MoviesOrTVshowsLinksContext)

  useEffect(() => {
    if (!span.current || !select.current) return
    const spanElem = span.current as HTMLSpanElement 
    const selectElem = select.current as HTMLSelectElement
    
    const onWindowClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      if (target.id === 'video-types') {
        spanElem.classList.toggle('select-caret-rotate') 
      } else {
        spanElem.classList.remove('select-caret-rotate')
      }
    }

    function onSelectChange(e: Event) {
      const target = e.target as HTMLSelectElement
      setMoviesOrTVshows(target.value)
    }

    selectElem.addEventListener('change', onSelectChange)
    addEventListener('click', onWindowClick)

    return () => {
      removeEventListener('click', onWindowClick)
      selectElem.removeEventListener('change', onSelectChange)
    }
  }, [span, select, setMoviesOrTVshows])
  
  return (
    <div className="grid grid-flow-col items-center bg-green-500p  relative isolate">
      <label htmlFor="video-types"></label>
      <select name="video-types" id="video-types" ref={select}>
        <option value="tvshows">TV Shows</option>
        <option value="movies">Movies</option>
      </select> 
      <span 
        className="caret bg-rose-500/40p absolute right-0 -z-10" 
        ref={span}
      >
        <MdKeyboardArrowDown size={40}/>  
      </span>
    </div>
  )
}