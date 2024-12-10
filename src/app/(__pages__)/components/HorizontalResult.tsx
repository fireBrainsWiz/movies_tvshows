import { ResultType, PLACEHOLDER_IMAGE, ImagePath } from '@/app/lib/types';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import CardBeingViewedContext from '../context/CardBeingViewedContext';
// import ThemeContext from '../context/ThemeContext';
import isIOS from "@/app/client/helpers/isIOS";
import { MdMoreVert } from "react-icons/md";
import { TfiClose } from "react-icons/tfi";
import MoviesOrTVshowsLinksContext from '../context/MoviesOrTVshowsLinksContext';
import { SaveOrRemoveFromSavedStore } from './save/SaveOrRemoveFromSavedStore';


export default function HorizontalResult({
  item,
  fromToViewSVG,
  media_type 
}: {
  item: ResultType
  fromToViewSVG?: boolean
  media_type?: 'movie' | 'tvshow'
}) {
  // console.log(item)
  const {setIsVisibleCardPage, setCard, setScrollTop} = useContext(CardBeingViewedContext)
  const {links, setMoviesOrTVshows} = useContext(MoviesOrTVshowsLinksContext)

  // const {setIsLoadingBackdropImage} = useContext(ThemeContext)
  const [openMore, setOpenMore] = useState(false)


  function handleClick() {
    setMoviesOrTVshows(media_type || links.MEDIATYPE as 'movie' | 'tvshow')
    // setIsLoadingBackdropImage(true)
    setIsVisibleCardPage(true)
    setCard(item)
    setScrollTop(document.documentElement.scrollTop)
  }

  const cardToSave: ResultType & {show_id: number, media_type: string} = {
    ...item, 
    show_id: item.id,
    media_type: media_type || links.MEDIATYPE
  }

  useEffect(() => {
    const fn = () => {
      setOpenMore(false)
    }
    document.addEventListener('click', fn)
    return () => {
      document.removeEventListener('click', fn)
    }
  })

  
  
  return (
    <div className="relative bg-red-500p max-w-max max-w-[200px]p "
      onClick={e =>e.stopPropagation()}
    >
      <button 
      onClick={handleClick} 
      // onMouseEnter={handleMouseEnter}
    >
        <Image 
          src={
            item.poster_path
            ? ImagePath+item.poster_path 
            : '/no-image.png'
          }
          width={200}
          height={300}
          alt={item.name || item.title || item.original_name || 'unknown'}
          // priority
          placeholder="blur"
          blurDataURL={PLACEHOLDER_IMAGE.TMDB_IMAGE}
          // className='max-w-full h-auto object-contain'
        />
        
      </button>
      <button className="absolute top-0 right-0 w-[30px] isolate"
        onClick={() => setOpenMore(!openMore)}
      >
        <span className='bg-stone-500/40 inline-block absolute top-0 left-[13px] h-full w-1/3 -z-10 '>
        </span>
        <MdMoreVert size={35}/>
      </button>
      <div className={`absolute w-full bottom-[6px] top-0 bg-black/80 ${openMore ? 'block' : 'hidden'}`}
        onClick={() => setOpenMore(!openMore)}
      >
        <button className="absolute top-2 right-2 bg-black/80 ">
          <TfiClose size={22} />
        </button>
        <ul className="absolute w-[80%] h-[70%] top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-stone-600 rounded-md ">
          <li className='border-b border-stone-900'>
            <SaveOrRemoveFromSavedStore item={cardToSave} whatToAlter='movie_tvshow'/>
          </li>
          <li className='border-b border-stone-900 flex items-center gap-[4px]'>
            <span><TfiClose size={20}/></span>
            <span>List</span>
          </li>
          <li className='border-b border-stone-900 last:border-none flex items-center gap-[4px]'>
            <span><TfiClose size={20}/></span>
            <span>List</span>
          </li>
        </ul>
      </div>
    </div>
  )
}


