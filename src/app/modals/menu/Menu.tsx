'use client'

import { useContext, useEffect, useRef, } from "react"
import CardBeingViewedContext from "../../(__pages__)/context/CardBeingViewedContext"
import { TfiClose } from "react-icons/tfi";
import ToggleMenuContext from "../../(__pages__)/context/ToggleMenuContext";
import MoviesOrTVshowsLinksContext from "../../(__pages__)/context/MoviesOrTVshowsLinksContext";
import Link from "next/link";
import { MdOutlineBookmarkAdded } from "react-icons/md";
import useSavedStore from "../../(__pages__)/stores/saved-store/save-store";
import ThemePicker from "./ThemePicker";

export default function Menu() {

  const menuRef = useRef<HTMLDivElement | null>(null)
  
  const {isVisibleMenu, setIsVisibleMenu} = useContext(ToggleMenuContext)
  const {links} = useContext(MoviesOrTVshowsLinksContext)
  const {setIsVisibleSavedItems} = useSavedStore()

  function handleClick() {
    setIsVisibleMenu(false)
    document.body.style.overflow = 'auto'
  }

//  const link1 = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page='


const link1 = 'https://api.themoviedb.org/3/tv/airing_today?language=en-US&page='

//  const f = link1.split('?')[0]
//  const i = f.lastIndexOf('/')
//  const n = f.slice(i)

//  console.log(
//   link1.split('?')[0]
//   .slice(
//     link1.split('?')[0].lastIndexOf('/')
//   )
// );

const firstArr = link1.split('?')[0]
const lastIndexOfSlash = firstArr.lastIndexOf('/')

// console.log(firstArr.slice(lastIndexOfSlash))

// console.log(
//   firstArr
//   .slice(lastIndexOfSlash+1)
//   .split('_')
//   .map((i) => i[0].toUpperCase() + i.slice(1)).join(' ')
// )


if (!isVisibleMenu) return null

  return (
    <div className={`menu bg-stone-900/95 bg-red-400/50p absolute w-full top-0 bottom-0 z-10 h-screen ${isVisibleMenu ? 'left-0' : 'left-[-100%]'} [transition:left_300ms_ease-in-out]`}
    ref={menuRef}
    >

      <ul
        className="p-4 gap-4 bg-stone-950 bg-green-500p w-[75%] overflow-y-scroll max-w-[500px] absolute top-0 bottom-0"
        style={{height: `${innerHeight}px`}}
      >
    
        <li className="py-2 my-6 flex items-center gap-2">
          <span><MdOutlineBookmarkAdded size={30}/></span>
          <Link href={'/popular-people'}>Popular People</Link>
        </li>

        {
          [...Object.values(links.TOPLINKS)].map( link => {
            const firstArr: string = link.split('?')[0]
            const lastIndexOfSlash = firstArr.lastIndexOf('/')
            const path = link.includes('discover') 
            ? 'discover ' + firstArr.slice(lastIndexOfSlash+1)
            : firstArr.slice(lastIndexOfSlash+1)
            // console.log({firstArr, lastIndexOfSlash, path, link})

            return (
            <li key={link} className="py-2 my-6 flex items-center gap-2">
              <span><MdOutlineBookmarkAdded size={30}/></span>
              <Link href={'/'+path}>{
                  path
                  .split('_')
                  .map((i) => i[0].toUpperCase() + i.slice(1))
                  .join(' ')
              }</Link>
            </li>
          )})
          }

        <li>
          <button className="w-full h-full flex items-center gap-2 p-2 pl-0"
            onClick={() => {
              setIsVisibleSavedItems(true)
            }}
          >
            <span><MdOutlineBookmarkAdded size={30}/></span>
            <span>Favourites</span>
          </button>
        </li>

        <ThemePicker />

      </ul>

      <div 
        className="text-end p-4 bg-red-500p w-full h-full cursor-pointer"
        onClick={handleClick}
        > 
        <button className="text-white text-2xl bg-stone-500 p-2">
          <TfiClose />
        </button>
      </div>

    </div>
  )
}