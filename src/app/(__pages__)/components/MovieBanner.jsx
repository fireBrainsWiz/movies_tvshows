import Image from "next/image"
import { useEffect, useState } from "react"

  // if (document.readyState !== 'complete') return null

export default function MovieBanner({i}) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setIsReady(true)
    const fn = () => setIsReady(true)
    addEventListener('load', fn)
    return () => removeEventListener('load', fn)
  }, [setIsReady])

  if (!isReady) return <div className="h-[7px] "></div>
  
  return (
    <swiper-slide>
      <div className={` bg-blue-800 text-center ${!isReady && 'h-[0]'}`}>
      <Image src={`/_banners/${i+1}.png`} alt="" 
        width={1920} height={230}
          className="max-w-full bg-green-500p"
        />
      </div>
    </swiper-slide>
  )
}