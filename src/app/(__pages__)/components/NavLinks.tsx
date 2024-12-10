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
  const {moviesOrTVshows} = useContext(MoviesOrTVshowsLinksContext)


  function toggleMenu() {
    setIsVisibleMenu(true)
    document.body.style.overflow = 'hidden'
  }


// test
  // useEffect(() => {
  //   setIsVisibleSearch(true)
  // }, [setIsVisibleSearch])
  
  return (
    <div className='bg-amber-500p min-h-[50px] grid grid-cols-[60%_40%] [@media(max-width:1020px)]:grid-cols-2 grid-flow-col items-center justify-between px-6 text-3xl text-white '>
      <div className=' flex gap-10 [@media(max-width:1122px)]:gap-6 bg-red-800p'>
        <button className='cursor-pointer' onClick={toggleMenu}>
          <CgMenuRight />
        </button>
        <ul className='text-xl flex gap-10 [@media(max-width:1122px)]:gap-6 [@media(max-width:1020px)]:hidden'>
          <li>
            <Link href={'/popular'}>Popular</Link>
          </li>
          <li>
            <Link href={'/top-rated'}>Top Rated</Link>
          </li>

          {
            moviesOrTVshows === 'tvshow' ? (
              <>
                <li>
                <Link href={'/airing-today'}>Airing Today</Link>
                </li>
                <li>
                <Link href={'/on-the-air'}>On The Air</Link>
                </li>
              </>
            )
            : (
              <>
                <li>
                <Link href={'/upcoming'}>Upcoming</Link>
                </li>
                <li>
                <Link href={'/now-playing'}>Now Playing</Link>
                </li>
              </>
            )
          }
        </ul>

      </div>

      <div className='flex items-center justify-end gap-10  text-lg bg-green-400p'>
        <div className="grid grid-cols-[200px,auto] gap-6">
          <button onClick={() => setIsVisibleSearch(true)} 
            className=" w-[200px] h-[25px]p rounded-full bg-stone-500 grid grid-cols-[20%_70%] gap-[10%] items-center p-1 pl-2 ">
            <span className="bg-green-800p border-r border-emerald-500"><BsSearch size={20} color="#39b981"/>  </span>
            <span className="border border-l-0 rounded-r-full h-full border-emerald-500 pt-1 text-sm flex justify-start text-gray-300">
              Search...
            </span>
          </button>
          <SelectMoviesOrTVshows />
        </div>

        <div>
          <button className='overflow-hidden border-2 border-gray-500 w-[35px] h-[35px] block rounded-full'>
            <Image 
              src="/profile.jpg" alt="profile picture" 
              width={40} 
              height={40}
              className=' w-full h-full object-cover'
            />
          </button>
        </div>
      </div>
    </div>
  )
}

