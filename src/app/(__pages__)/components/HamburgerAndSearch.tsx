import { CgMenuRight } from "react-icons/cg";
import { BsSearch } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import Image from 'next/image';
import Link from "next/link";

export default function HamburgerAndSearch() {
  return (
    <div className='bg-amber-500p min-h-[50px] grid grid-cols-[70%_30%] grid-flow-col items-center justify-between px-3 text-3xl text-white absolute top-0 w-full z-10'>
      <div className='bg-red-500p flex gap-10'>
        <button className='cursor-pointer'>
          <CgMenuRight />
        </button>
        <ul className='text-xl flex gap-10'>
          <li>
            <Link href={'/popular'}>Popular</Link>
          </li>
          <li>
            <Link href={'/toprated'}>Top Rated</Link>
          </li>
          <li>
            <Link href={'/ontheair'}>On The Air</Link>
          </li>
          <li>
            <Link href={'/airingtoday'}>Airing Today</Link>
          </li>
        </ul>

      </div>
      <div className='bg-blue-500p flex items-center justify-end gap-10 text-lg'>
          <button className=' cursor-pointer flex items-center'>
            TV Shows 
            <MdKeyboardArrowDown size={40}/>  
          </button>
          <Link href={'/search'} className=' cursor-pointer'>
            <BsSearch size={20}/>  
          </Link>
          <button className='w-[40px] h-[40px] rounded-full bg-stone-600p flex items-center overflow-hidden border-2 border-white cursor-pointer'>
            <Image 
              src="/profile.jpg" alt="" 
              width={40} 
              height={40}
              className='rounded-full'/>
            Image
          </button>
      </div>
    </div>
  )
}