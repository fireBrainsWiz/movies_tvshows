

import MovieBanners from './MovieBanners';
import NavLinks from '../../components/NavLinks';
import AddToMyListButton from '../../components/AddToMyListButton';


export default function HomePageHeaderSection2() {
//11440, 1920
  return (
    <div className=" w-full max-w-[1920px] mx-auto bg-neutral-900p">
      <div className="bg-stone-500p  relative my-6p">
        <NavLinks />
        <MovieBanners />
        <AddToMyListButton />
      </div>
      {/* <hr className='bg-red-500 text-green-500 border-orange-400'/> */}
    </div>
  )
}