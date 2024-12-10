'use client'

import NavLinks from '@/app/(__pages__)/components/NavLinks';
import MovieBanners from './MovieBanners';
import { Banners } from '@/app/(__pages__)/components/Banners';


export default function HomePageHeaderSection() {
//11440, 1920
  return (
    <div className=" w-full max-w-[1920px] mx-auto bg-neutral-900p mb-6">
      <div className="bg-stone-500p  relative my-6p">
        <NavLinks />
        {/* <Banners /> */}
      </div>
      {/* <hr className='border-orange-400'/> */}

      {/* <div className='my-10 bg-green-500/20 min-h-[400px] flex w-full overflow-auto'>

      </div> */}  
    </div>
  )
}