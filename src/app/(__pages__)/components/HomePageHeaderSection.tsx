import '../styles/my-component.css'
import { register, } from 'swiper/element/bundle';
register();

import MovieBanners from './MovieBanners';
import HamburgerAndSearch from './HamburgerAndSearch';
import AddToMyListButton from './AddToMyListButton';


export default function HomePageHeaderSection() {
//11440, 1920
  return (
    <div className=" w-full max-w-[1920px] mx-auto bg-neutral-900p">
      <div className="bg-stone-500p  relative my-6p">
        <HamburgerAndSearch />
        <MovieBanners />
        <AddToMyListButton />
      </div>
      {/* <hr className='bg-red-500 text-green-500 border-orange-400'/> */}

    </div>
  )
}




