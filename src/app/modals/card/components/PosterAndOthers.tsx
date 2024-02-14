import Image from 'next/image';
import { ResultType, PLACEHOLDER_IMAGE, ImagePath } from '@/app/lib/types';
import { useEffect, useState, useRef } from 'react';
import { IoImages } from "react-icons/io5";
import { IoImageSharp } from "react-icons/io5";
import { BiSolidVideos } from "react-icons/bi";
import { RiVideoFill } from "react-icons/ri";
import { _Movies, _TVshows } from '@/app/(__pages__)/context/MoviesOrTVshowsLinksContext'
import useImagePixel from '@/app/(__pages__)/hooks/useImagePixel';



 function PosterAndOthers1(
  { card, links }: { card: ResultType, links: _Movies | _TVshows }
  ) {

    const [noImageUrl, setNoImageUrl] = useState('')
  
  return (
    <svg width="167" height="128" viewBox="0 0 167 128" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full h-[350px]"
    >
      <path d="M167 14.9116V17.9611C167 19.4247 165.811 20.6445 164.316 20.6445C162.822 20.6445 161.633 19.4551 161.633 17.9611V14.9116C161.633 9.66634 157.363 5.36608 152.087 5.36608H136.229C134.765 5.36608 133.545 4.1767 133.545 2.68264C133.545 1.18802 134.734 -0.000806691 136.229 -0.000806691L152.118 -0.000806691C160.321 0.0296053 167 6.70808 167 14.9116Z" fill="url(#paint0_linear_1039_40)"/>
      <path d="M130.374 2.71209C130.374 4.17573 129.184 5.39553 127.69 5.39553L14.852 5.39553C9.60662 5.39553 5.30623 9.66538 5.30623 14.941V112.497C5.30623 117.742 9.57621 122.042 14.852 122.042L152.087 122.042C157.333 122.042 161.633 117.773 161.633 112.497V109.447C161.633 107.984 162.822 106.764 164.316 106.764C165.811 106.764 167 107.953 167 109.447V112.497C167 120.7 160.321 127.379 152.118 127.379L14.8824 127.379C6.67868 127.379 3.55e-06 120.7 3.55e-06 112.497V14.9106C3.55e-06 6.70712 6.67868 0.0286427 14.8824 0.0286427L127.69 0.0286427C129.154 0.0286427 130.374 1.24844 130.374 2.71209Z" fill="url(#paint1_linear_1039_40)"/>

      <foreignObject x="8" y="8" width="87" height="111"
      >
        <div className="bg-[#ead40e] h-full rounded-l-md flex justify-center items-center  overflow-hidden">
        <Image 
        src={noImageUrl || ImagePath+card.poster_path}
        alt=''
        placeholder='blur'
        blurDataURL={PLACEHOLDER_IMAGE.TMDB_IMAGE}
        width={100} height={100}
        onError={() => setNoImageUrl('/no-image.png')}
      />
        </div>
      </foreignObject>

      <foreignObject x="100" y="8" width="58" height="52"
      >
        <div 
          className="bg-[#237b85]p h-full rounded-r-md text-xs grid grid-cols-4 gap-1 overflow-hidden relative">

          <span className="flex justify-center items-center bg-stone-400/20 absolute w-full h-full">
            <IoImages size={30}/>
          </span>

          {
            [...Array(12)].map((_, i) => (
              <span 
                key={i}
                className="flex justify-center items-center bg-gray-400 "
              >
                <IoImageSharp size={7}/>
              </span>
            ))
          }
        </div>
      </foreignObject>


      <rect  fill="#30643A"/>
      <foreignObject x="100" y="66" width="58" height="52"
      >
        <div 
          className="bg-[#237b85]p h-full rounded-r-md text-xs grid grid-cols-4 gap-1 overflow-hidden relative">

          <span className="flex justify-center items-center bg-stone-400/20 absolute w-full h-full">
            <BiSolidVideos size={30}/>
          </span>

          {
            [...Array(12)].map((_, i) => (
              <span 
                key={i}
                className="flex justify-center items-center bg-gray-400 "
              >
                <RiVideoFill size={7}/>
              </span>
            ))
          }
        </div>
      </foreignObject>

      <defs>
        <linearGradient id="paint0_linear_1039_40" x1="191.224" y1="10.3371" x2="1.47593" y2="10.3371" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFC205"/>
          <stop offset="1" stopColor="#FC0299"/>
        </linearGradient>
        <linearGradient id="paint1_linear_1039_40" x1="191.193" y1="63.7037" x2="1.44545" y2="63.7037" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFC205"/>
          <stop offset="1" stopColor="#FC0299"/>
        </linearGradient>
      </defs>
    </svg>
  )
}



export default function PosterAndOthers(
  { card, links, setIsVisibleAllImages, setIsVisibleAllVideos}:{
    card: ResultType, 
    links: _Movies | _TVshows,
    setIsVisibleAllImages: (isVisible: boolean) => void,
    setIsVisibleAllVideos: (isVisible: boolean) => void 
  }
  ) {

    const imageRef = useRef<HTMLImageElement>(null)
    const [noImageUrl, setNoImageUrl] = useState('')
    const [imageColor, setImageColor] = useState('')

    useImagePixel({ 
      card, imageRef, setColor: setImageColor 
    })

    function handleShowImagesClick() {
      setIsVisibleAllImages(true)
    }
    
    function handleShowVideosClick() {
      setIsVisibleAllVideos(true)
    }

  
  return (
<svg width="90" height="47" viewBox="0 0 90 47" fill="none" xmlns="http://www.w3.org/2000/svg"
  className='w-full h-[350px] bg-red-500p px-1 mb-16 lg:mb-auto '
>
    <path d="M89.86 5.49V6.61C89.86 7.15 89.42 7.6 88.87 7.6C88.32 7.6 87.88 7.16 87.88 6.61V5.49C87.88 3.56 86.31 1.98 84.37 1.98H78.53C77.99 1.98 77.54 1.54 77.54 0.99C77.54 0.44 77.98 0 78.53 0H84.38C87.4 0.01 89.86 2.47 89.86 5.49Z" fill={imageColor} fillOpacity={0.1}/>
    <path d="M75.39 1.98977C75.94 1.98977 76.38 1.53977 76.38 0.999766C76.38 0.459766 75.93 0.00976562 75.39 0.00976562H42.02V1.98977H75.39Z" fill={imageColor} fillOpacity={0.1}/>
    <path d="M88.87 39.2893C88.32 39.2893 87.88 39.7393 87.88 40.2793V41.3993C87.88 43.3393 86.3 44.9093 84.37 44.9093H42.02V46.8693H84.38C87.4 46.8693 89.86 44.4093 89.86 41.3893V40.2693C89.86 39.7193 89.42 39.2793 88.87 39.2793V39.2893Z" fill={imageColor} fillOpacity={0.1}/>
    <path d="M5.8699 44.9098C3.9299 44.9098 2.3599 43.3298 2.3599 41.3998V5.49977C2.3599 3.55977 3.9399 1.98977 5.8699 1.98977H14.0199V0.00976562H5.8799C2.8599 0.00976562 0.399902 2.46977 0.399902 5.48977V41.3998C0.399902 44.4198 2.8599 46.8798 5.8799 46.8798H14.0199V44.9198H5.8699V44.9098Z" fill={imageColor} fillOpacity={0.1}/>
    
    <rect x="4" y="28" width="10" height="15" fill="#00F0FF"/>
    <rect x="4" y="4" width="10" height="15" fill="#08A742"/>



      

      <foreignObject x="15" width="26" height="47"
      >
        <div className="bg-[#FFCC00] h-full  flex justify-center items-center  overflow-hidden"
          style={{backgroundColor: imageColor, color: imageColor}}
        >
          <Image 
            ref={imageRef}
            src={noImageUrl || ImagePath+card.poster_path}
            alt=''
            placeholder='blur'
            blurDataURL={PLACEHOLDER_IMAGE.TMDB_IMAGE}
            width={100} height={100}
            onError={() => setNoImageUrl('/no-image.png')}
          />
        </div>
      </foreignObject>

      <foreignObject x="44" y="3" width="41" height="19" 
      >
        <button 
          className="bg-[#8CFA9C]p h-full w-full text-xs grid grid-cols-6 justify-between overflow-hidden hover:bg-emerald-900 [transition:background-color_0.3s]"
            onClick={handleShowImagesClick}
          >

          {
            [...Array(12)].map((_, i) => (
              <span 
                key={i}
                className="flex justify-center items-center bg-gray-400p "
              >
                <IoImageSharp size={5}/>
              </span>
            ))
          }
        </button>
      </foreignObject>


      <foreignObject x="44" y="25" width="41" height="19"
      >
        <button 
          className="bg-[#237b85]p h-full w-full text-xs grid grid-cols-6 justify-between overflow-hidden hover:bg-emerald-900 [transition:background-color_0.3s]"
            onClick={handleShowVideosClick}
          >
          {
            [...Array(12)].map((_, i) => (
              <span 
                key={i}
                className="flex justify-center items-center bg-gray-400p "
              >
                <RiVideoFill size={5}/>
              </span>
            ))
          }
        </button>
      </foreignObject>

      <defs>
        <linearGradient id="paint0_linear_1039_40" x1="191.224" y1="10.3371" x2="1.47593" y2="10.3371" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFC205"/>
          <stop offset="1" stopColor="#FC0299"/>
        </linearGradient>
        <linearGradient id="paint1_linear_1039_40" x1="191.193" y1="63.7037" x2="1.44545" y2="63.7037" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFC205"/>
          <stop offset="1" stopColor="#FC0299"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

