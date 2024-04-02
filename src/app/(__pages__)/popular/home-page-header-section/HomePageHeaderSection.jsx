

import MovieBanners from './MovieBanners';
import NavLinks from '../../components/NavLinks';
import AddToMyListButton from '../../components/AddToMyListButton';


export default function HomePageHeaderSection() {
//11440, 1920
  return (
    <div className=" w-full max-w-[1920px] mx-auto bg-neutral-900p">
      <div className="bg-stone-500p  relative my-6p">
        {/* <NavLinks />
        <MovieBanners />
        <AddToMyListButton /> */}
      </div>
      {/* <hr className='border-orange-400'/> */}

      <div className='my-10 bg-green-500/20 min-h-[400px]'>
        <All />
      </div>
    </div>
  )
}


function All() {
  return (
<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 601 209.9" >

  <g>
    <path d="M495.8,0c-29.1,0-55.4,11.8-74.4,30.9-5.8,5.8-13.5,9.1-21.7,9.1h-3.7c-8.2,0-15.9-3.3-21.7-9.1-.2-.2-.4-.4-.5-.5V179.9l2-2c5.8-6,13.8-9.5,22.1-9.5s16.4,3.5,22.2,9.6c17.3,18,40.9,29.8,67.3,31.9h17c53.3-4.3,95.8-48.9,96.6-103.2v-3c-.8-57.4-47.6-103.7-105.2-103.7Z" fill="#31997e"/>
    <circle cx="497.2" cy="105.2" r="94.6" fill="#d35e07"/>
    <rect x="422.8" y="48.9" width="148" height="113" fill="#7981a3"/>
    <rect x="442.9" y="29.1" width="109.9" height="19.8" fill="#07490c"/>
    <rect x="441.9" y="162.1" width="109.9" height="19.8" fill="#72197c"/>
  </g>

  <g>
    <path d="M300.3,0c-29.1,0-55.4,11.8-74.4,30.9-5.8,5.8-13.5,9.1-21.7,9.1h-3.7c-8.2,0-15.9-3.3-21.7-9.1-.2-.2-.4-.4-.5-.5V179.9l2-2c5.8-6,13.8-9.5,22.1-9.5s16.4,3.5,22.2,9.6c17.3,18,40.9,29.8,67.3,31.9h17c53.3-4.3,95.8-48.9,96.6-103.2v-2.9C404.6,46.3,357.9,0,300.3,0Z" fill="#313b9b" stroke='#5beb18' strokeWidth={1}/>
    <circle cx="301.2" cy="105.2" r="94.6" fill="#db8346"/>
    <rect x="226.5" y="48.6" width="148" height="113" fill="#9ba1bc"/>
    <rect x="246.7" y="28.8" width="109.9" height="19.8" fill="#238c2d"/>
    <rect x="245.7" y="161.8" width="109.9" height="19.8" fill="#af2cac"/>
  </g>

  <g>
    <circle cx="104.8" cy="105" r="104.8" fill="#eb185e" stroke='#5beb18' strokeWidth={1} />
      <circle cx="104.2" cy="105.2" r="94.6" fill="#d69365"/>
    <rect x="29.8" y="48.7" width="148" height="113" fill="#bcc0d8"/>
    <rect x="49.9" y="28.9" width="109.9" height="19.8" fill="#61d674"/>
    <rect x="48.9" y="161.9" width="109.9" height="19.8" fill="#cf47e2"/>
  </g>

</svg>
  )
}