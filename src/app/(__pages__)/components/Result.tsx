import { ResultType, PLACEHOLDER_IMAGE } from '@/app/lib/types';
import Image from 'next/legacy/image';
import Link from 'next/link';
import { useContext, useState } from 'react';
import CardBeingViewedContext from '../context/CardBeingViewedContext';
import ThemeContext from '../context/ThemeContext';




export default function Result({item}: {item: ResultType}) {
  // console.log(item)
  const {setIsVisibleCardPage, setCard, setScrollTop} = useContext(CardBeingViewedContext)

  const {setIsLoadingBackdropImage} = useContext(ThemeContext)

  const [hasFailedImage, setHasFailedImage] = useState(false)

  function handleClick() {
    setIsLoadingBackdropImage(true)
    setIsVisibleCardPage(true)
    setCard(item)
    setScrollTop(document.documentElement.scrollTop)
  }

  
  return (
    <button 
      onClick={handleClick} 
      // onMouseEnter={handleMouseEnter}
    >
      <Image 
        src={
          hasFailedImage 
          ? '/no-image.png'
          : `https://image.tmdb.org/t/p/w500${item.poster_path}`
        }
        width={170}
        height={255}
        alt='image'
        placeholder='blur'
        blurDataURL={PLACEHOLDER_IMAGE.TMDB_IMAGE}
        priority
        onError={() => setHasFailedImage(true)}
      />
    </button>
  )
}


