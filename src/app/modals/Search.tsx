'use client'

import { useContext } from "react"
import ToggleSearch from "../(__pages__)/context/ToggleSearchContext"
import { TfiClose } from "react-icons/tfi";


export default function Search() {
  
  const {isVisibleSearch, setIsVisibleSearch,} = useContext(ToggleSearch)

  function handleClick() {
    setIsVisibleSearch(false)
  }

  return (
    <div className={`bg-amber-900/95 absolute w-full top-0 bottom-0 z-10 ${isVisibleSearch ? 'left-0' : 'left-[-100%]'} [transition:left_300ms_ease-in-out]`}
    >
      <div className="flex justify-end gap-2 p-4"> 
      <button 
        className="text-white text-2xl"
        onClick={handleClick}>
        <TfiClose />
      </button>
      </div>
    </div>
  )
}