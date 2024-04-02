import { CgMenuRight } from "react-icons/cg";
import { BsSearch } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import Image from 'next/image';
import Link from "next/link";
import { useContext, useEffect, useRef } from "react";
import ToggleMenuContext from "../context/ToggleMenuContext";
import ToggleSearch from "../context/ToggleSearchContext";
import MoviesOrTVshowsLinksContext from "../context/MoviesOrTVshowsLinksContext";
import SelectMoviesOrTVshows from "./SelectMoviesOrTVshows";



export default function NavLinks() {
  const { setIsVisibleMenu } = useContext(ToggleMenuContext)
  const {setIsVisibleSearch,} = useContext(ToggleSearch)
  const {moviesOrTVshows, setMoviesOrTVshows} = useContext(MoviesOrTVshowsLinksContext)


  function toggleMenu() {
    setIsVisibleMenu(true)
    document.body.style.overflow = 'hidden'
  }

  

  // useEffect(() => {
  //   setIsVisibleSearch(true)
  // }, [setIsVisibleSearch])
  
  return (
    <div className='bg-amber-500p min-h-[50px] grid grid-cols-[70%_30%] grid-flow-col items-center justify-between px-3 text-3xl text-white absolute top-0 w-full z-10'>
      <div className='bg-red-500p flex gap-10'>
        <button className='cursor-pointer' onClick={toggleMenu}>
          <CgMenuRight />
        </button>
        <ul className='text-xl flex gap-10'>
          <li>
            <Link href={'/popular'}>Popular</Link>
          </li>
          <li>
            <Link href={'/top-rated'}>Top Rated</Link>
          </li>

          {
            moviesOrTVshows === 'tvshows' ? (
              <>
                <li>
                <Link href={'/on-the-air'}>On The Air</Link>
                </li>
                <li>
                <Link href={'/airing-today'}>Airing Today</Link>
                </li>
              </>
            )
            : (
              <>
                <li>
                <Link href={'/now-playing'}>Now Playing</Link>
                </li>
                <li>
                <Link href={'/upcoming'}>Upcoming</Link>
                </li>
              </>
            )
          }
        </ul>

      </div>

      <div className='bg-blue-500p flex items-center justify-end gap-10 text-lg'>
          
          <SelectMoviesOrTVshows />
          
          <button 
            onClick={() => setIsVisibleSearch(true)} 
            className=' cursor-pointer'
          >
            <BsSearch size={20}/>  
          </button>

          <button className='w-[clamp(20px,5vmin,40px)] h-[clamp(20px,5vmin,40px)]  rounded-full bg-stone-600p flex items-center overflow-hidden border-2 border-white cursor-pointer'>
            <Image 
              src="/profile.jpg" alt="profile picture" 
              width={40} 
              height={40}
              className='rounded-full w-full h-auto'/>
          </button>
      </div>
    </div>
  )
}

