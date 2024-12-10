import { useEffect, useRef, useContext, useState } from "react"
import { MdKeyboardArrowDown } from "react-icons/md"
import MoviesOrTVshowsLinksContext from "../context/MoviesOrTVshowsLinksContext"
import ToggleSearchContext from "../context/ToggleSearchContext"
import CardBeingViewedContext from "../context/CardBeingViewedContext"


export default function SelectMoviesOrTVshows() {
  const span = useRef<HTMLSpanElement | null>(null)
  const select = useRef<HTMLSelectElement | null>(null)
  
  const { setMoviesOrTVshows, moviesOrTVshows } = useContext(MoviesOrTVshowsLinksContext)

  const {isVisibleCardPage} = useContext(CardBeingViewedContext)

  const {isVisibleSearch, setIsVisibleSearch,} = useContext(ToggleSearchContext)

  const [moviesOrTVshowsDefaultsTo, setMoviesOrTVshowsDefaultsTo] = 
  useState<'movie' | 'tvshow'>('tvshow')
  

  // useEffect(() => {
  //   setIsVisibleSearch(true)
  // }, [setIsVisibleSearch])
  
  
  useEffect(() => {
    if (!span.current || !select.current) return
    const spanElem = span.current as HTMLSpanElement 
    
    const onWindowClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      if (target.id === 'video-types') {
        spanElem.classList.toggle('select-caret-rotate') 
      } else {
        spanElem.classList.remove('select-caret-rotate')
      }
    }


    addEventListener('click', onWindowClick)

    return () => {
      removeEventListener('click', onWindowClick)
    }
  }, [span, select, setMoviesOrTVshows])

  useEffect(() => {
    if (!isVisibleSearch || !isVisibleCardPage) {
      setMoviesOrTVshows(moviesOrTVshowsDefaultsTo)
    }
  }, [
    moviesOrTVshowsDefaultsTo, isVisibleSearch, setMoviesOrTVshows,
    isVisibleCardPage, 
  ])

  
  return (
    <form 
      onSubmit={(e) => e.preventDefault()} 
      className="grid grid-flow-col items-center bg-green-500p  relative isolate w-max">
      <label htmlFor="video-types"></label>
      <select
        className="tv-or-movies-select" 
        name="video-types" id="video-types" ref={select}
        value={moviesOrTVshows}
        onChange={(e) => {
          setMoviesOrTVshows(e.target.value as 'movie' | 'tvshow')
          setMoviesOrTVshowsDefaultsTo(e.target.value as 'movie' | 'tvshow')
        }}
        >
        <option value="tvshow">TV Shows</option>
        <option value="movie">Movies</option>
      </select> 
      <span 
        className="caret bg-rose-500/40p absolute right-0 -z-10" 
        ref={span}
      >
        <MdKeyboardArrowDown size={40}/>  
      </span>
    </form>
  )
}