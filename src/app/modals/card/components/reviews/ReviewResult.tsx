import useImagePixel from '@/app/(__pages__)/hooks/useImagePixel';
import { CommonTypes } from '@/app/lib/MediaTypeInfoTypes'
import Image from 'next/image'
import { ResultType } from '@/app/lib/types'
import { useRef, useState, useEffect } from 'react'
import { getColorBasedOnFirstLetterAndFirstLetter } from '../../lib/utils';
import { ImagePath } from '@/app/lib/types';

export default function ReviewResult({
  review,
  setShowAddMoreResults,
  showAddMoreResults
}: {
  review: CommonTypes['review']['results'][0],
  showAddMoreResults?: boolean
  setShowAddMoreResults?: React.Dispatch<React.SetStateAction<boolean>>
}) {

  const card = {
    backdrop_path: review.author_details.avatar_path || '/no-image-1.webp',
  } as ResultType

  const svgRef = useRef<SVGSVGElement | null>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const [imageColor, setImageColor] = useState('')


  useImagePixel({
    backdrop_path: card.backdrop_path, 
    imageRef, 
    setColor: setImageColor
  })


  useEffect(() => {
    if (!setShowAddMoreResults) return

    const observer = 
    new IntersectionObserver(([{isIntersecting}]) => {
      if (!isIntersecting) return
      setShowAddMoreResults(true)
    })
    observer.observe(svgRef.current as SVGSVGElement)
  }, [setShowAddMoreResults])

  return (
<svg width="832" height="auto" viewBox="0 0 832 423" fill="none" xmlns="http://www.w3.org/2000/svg" className='max-w-[500px] bg-red-500/30p'
  // style={{
  //   rotate: showAddMoreResults? '180deg' : '0deg',
  // }}
  ref={svgRef}
>


<path 
  fill={ review.author_details.avatar_path 
    ? imageColor 
    : getColorBasedOnFirstLetterAndFirstLetter(
      review.author || review.author_details.username 
    ) .color
  } 
  fillOpacity={0.1}
  stroke='#D9D9D9' 
  strokeOpacity="0.5" 
  d="M226.5,401.6c-69.5-36,20-96,1.2-107c-5.8-5.8-13.5-9.1-21.7-9.1h-3.7c-8.2,0-15.9,3.3-21.7,9.1
      c-19,19.1-45.3,30.9-74.4,30.9C48.6,325.5,1.8,279.2,1,221.8v-3c0.8-54.3,43.3-98.9,96.6-103.2h17c26.4,2.1,50,13.9,67.3,31.9
      c5.8,6.1,13.8,9.6,22.2,9.6c8.3,0,16.3-3.5,22.1-9.5C281.5,103.6,201-1.9,339.5,1.1"
  />
  <path 
    fill={ review.author_details.avatar_path 
      ? imageColor 
      : getColorBasedOnFirstLetterAndFirstLetter(
        review.author || review.author_details.username
      ).color
    } 
    fillOpacity={0.1}
    stroke='#D9D9D9' 
    strokeOpacity="0.5" 
    d="M339,1.1l158,5h211.6c45,0,84.2,31,94.4,74.9l23,98.3c0.3,1.2,0.5,2.5,0.6,3.7l4.2,48.8c0.1,1.2,0.1,2.4,0,3.7
      l-1.7,25.9c-1.8,27.5-9.4,54.4-22.3,78.7l-8.8,16.7c-10.2,19.3-25.1,35.6-43.3,47.6l0,0l0,0c-18,11.9-39.4,17.8-60.9,16.9
      l-467.3-19.6"
  />


  <circle cx="106.5" cy="220.5" r="90.5" fill={imageColor}/>

  <foreignObject x="26" y="160" width="162" height="121" >
    <div className="bg-[#8a2c2c]p w-full h-full overflow-hidden flex justify-center items-center">
    <Image
      ref={imageRef} 
      src={
        review?.author_details?.avatar_path 
        ? ImagePath + review?.author_details?.avatar_path 
        : '/no-image-1.webp'
      }
      alt=''
      width={100} height={100}
      className='max-w-full h-auto object-cover rounded-md'
    />
    </div>
  </foreignObject> 

  <foreignObject x="267" y="22.5625" width="492" height="42" >
    <div className="bg-[#1703ef]p w-full h-full overflow-hidden overflow-y-auto ">
      <p className='text-4xl pl-10 truncate'>
        {review?.author || review?.author_details?.username}
      </p>
    </div>
  </foreignObject> 

  <foreignObject x="267" y="82.5625" width="492" height="231" >
    <div className="bg-[#00e029]p w-full h-full overflow-hidden overflow-y-auto text-3xl italic">
      {review?.content}
    </div>
  </foreignObject> 

  <foreignObject x="234" y="325.562" width="531" height="80" >
    <div className="bg-[#0d8fc2]p w-full h-full overflow-hidden overflow-y-auto text-xl pt-4">
      <p>created at: {
      review?.created_at.split('T')[0] + ', ' + review?.created_at.split('T')[1].split('.')[0]
      }</p>

      <p>updated at: {
      review?.updated_at.split('T')[0] + ', ' + review?.updated_at.split('T')[1].split('.')[0]
      }</p>
    </div>
  </foreignObject> 
</svg>

  )
}
