
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

  if (!isReady) return <div className="h-[7px]"></div>
  
  return (
    <swiper-slide>
      <div className={` bg-blue-800p text-center ${!isReady && 'h-[0]'}`}>
      <Image src={`/_banners/${i+1}.png`} alt="" 
        width={1920} height={230}
          className="max-w-full bg-green-500p"
        />
      </div>
    </swiper-slide>
  )
}


/* 
Make sure that all the Babel plugins and presets you are using
are defined as dependencies or devDependencies in your package.json
file. It's possible that the missing plugin is loaded by a preset
you are using that forgot to add the plugin to its dependencies: you
can workaround this problem by explicitly adding the missing package
to your top-level package.json.eslint
 */