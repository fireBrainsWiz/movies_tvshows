
import Image from "next/image"
import useReactQuery from "../../hooks/useReactQuery"
import Link from "next/link"

export default function BelowTheHeader() {

  // const {data: mandalorian, isLoading, error} =  useReactQuery({
  //   queryString: 'mandalorian',
  //   URL: 'https://api.themoviedb.org/3/search/tv?query=mandalorian&include_adult=false&language=en-US&page=1'
  // })
  
  // if (error) {
  //   return <div>{error.message}</div>
  // }

  // if (isLoading) {
  //   return <div>Loading...</div>
  // }

  // console.log(mandalorian.results[0])
  
  return (
    <div className="bg-neutral-800 py-10">
      {/* <div className=" bg-red-500 grid grid-cols-[39%_39%_20%] gap-1 justify-between min-h-[50vmin]p px-2 w-full h-[10vmin]">

        <div className="grid grid-cols-2">
          <div className="bg-green-200">
          <Link href={`/card?title=1&id=2`}>
              <Image src={'/below-header/the-mandalorian.png'} 
              alt="the-witcher" 
              // className="w-full h-auto"
              width={708} height={1029} 
            />
            </Link>
          </div>
          <div className="bg-green-400">
            <Link href={`/card?title=1&id=2`}>
              <Image src={'/below-header/the-witcher.png'} 
              alt="the-witcher" 
              // className="w-full h-auto"
              width={708} height={1029} 
            />
            </Link>
          </div>
        </div>
        <div className="grid grid-rows-2 gap-4 ml-4">
          <div className="bg-green-200 grid grid-cols-[70%_28%] gap-3">
            <div className="bg-rose-200">
            <Link href={`/card?title=1&id=2`}>
              <Image src={'/below-header/omitb.png'} 
              alt="the-witcher" 
              width={882} height={497} />
            </Link>
            </div>
            <div className="bg-rose-600">
            <Link href={`/card?title=1&id=2`}>
              <Image src={'/below-header/omitb-title.png'} 
              alt="the-witcher" 
              width={429} height={315} />
            </Link>
            </div>
          </div>
          <div className="bg-green-200 grid grid-cols-[70%_28%] gap-3">
            <div className="bg-rose-200">
            <Link href={`/card?title=1&id=2`}>
              <Image src={'/below-header/the-last-of-us.png'} 
              alt="the-witcher" 
              width={882} height={497} />
            </Link>
            </div>
            <div className="bg-rose-600">
            <Link href={`/card?title=1&id=2`}>
              <Image src={'/below-header/the-last-of-us-title.png'} 
              alt="the-witcher" 
              width={429} height={315} />
            </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-rows-2 gap-4">
          <div className="bg-green-200">
            <Link href={`/card?title=1&id=2`}>
              <Image src={'/below-header/american-horror-story.png'} 
              alt="the-witcher" 
              width={708} height={483} />
            </Link>
          </div>
          <div className="bg-green-400">
            <Link href={`/card?title=1&id=2`}>
              <Image src={'/below-header/fear-the-walking-dead.png'} 
              
              alt="the-witcher" 
              width={708} height={483} />
            </Link>
          </div>
        </div>
      </div> */}

      {/* <Test /> */}
      {/* <Test2 /> */}

    </div>
  )
}




const TVs = {
  mandalorian: {
    id: '82856',
    title: 'Mandalorian',
  },
  witcher: {
    id: '71912',
    title: 'Witcher',
  },
  
}

/* 
  className=" bg-red-500 grid grid-cols-[39%_39%_20%] gap-1 justify-between min-h-[50vmin]p px-2 w-full h-[10vmin]p"
*/

function Test() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 1246 343" fill="none" xmlns="http://www.w3.org/2000/svg">

    <foreignObject x="0" y="0" width="100%" height="100%" className="bg-amber-500">

    <div className=" bg-red-500p grid grid-cols-[39%_39%_20%] gap-1 justify-between min-h-[50vmin]p px-2 w-full ">

    <div className="grid grid-cols-2">
      <div className="bg-green-200p">
      <Link href={`/card?title=1&id=2`}>
          <Image src={'/below-header/the-mandalorian.png'} 
          alt="the-witcher" 
          // className="w-full h-auto"
          width={708} height={1029} 
        />
        </Link>
      </div>
      <div className="bg-green-400p">
        <Link href={`/card?title=1&id=2`}>
          <Image src={'/below-header/the-witcher.png'} 
          alt="the-witcher" 
          // className="w-full h-auto"
          width={708} height={1029} 
        />
        </Link>
      </div>
    </div>
    
    <div className="gridp grid-rows-2p gap-4p ml-4">
      <div className="bg-green-200p grid grid-cols-[70%_28%] gap-3 h-[40%] mb-4">
        <div className="bg-rose-200p h-[90%]">
          <Link href={`/card?title=1&id=2`} className="h-full">
            <Image src={'/below-header/omitb.png'} 
            alt="the-witcher" 
            className="w-[100%] h-full"
            width={882} height={496.13} />
          </Link>
        </div>
        <div className="bg-rose-600p ">
        <Link href={`/card?title=1&id=2`}>
          <div className="w-full h-fullp bg-green-800p h-[89.8%] ">
            <p className="s font-black text-lg">O.M.I.T.B</p>
            <p className="text-sm mt-4 font-bold">Season 4</p>
            <div className="mt-4">
              <p className="text-sm ">Starring:</p>
              <p className="text-xs pl-6">Selena Gomez</p>
              <p className="text-xs pl-6">Martin Short</p>
            </div>

          </div>
        </Link>
        </div>
      </div>

      <div className="bg-green-200p grid grid-cols-[70%_28%] gap-3">
        <div className="bg-rose-200p h-[90%] pt-[2.3%]">
        <Link href={`/card?title=1&id=2`}>
          <Image src={'/below-header/the-last-of-us.png'} 
          alt="the-witcher" 
          className="w-[100%] h-full"
          width={882} height={496.13} />
        </Link>
        </div>
        <div className="bg-rose-600p">
        <Link href={`/card?title=1&id=2`}>
          <div className="w-full h-fullp bg-green-800p h-[87%] mt-[5.5%]">
          <p className="font-black text-lg">The Last of Us</p>
            <p className="text-sm mt-4 font-bold">Season 2</p>
            <div className="mt-4">
              <p className="text-sm ">Starring:</p>
              <p className="text-xs pl-6">Pedro Pascal</p>
              <p className="text-xs pl-6">Bella Ramsey</p>
              <p className="text-xs pl-6">Anna Torv</p>
            </div>
          </div>
        </Link>
        </div>
      </div>
    </div>

    <div className="grid grid-rows-2 gap-4">
      <div className="bg-green-200p h-[88%]">
        <Link href={`/card?title=1&id=2`}>
          <Image src={'/below-header/american-horror-story.png'} 
          alt="the-witcher" 
          className="w-[100%] h-full"
          width={708} height={483} />
        </Link>
      </div>
      <div className="bg-green-800p h-[88%] mt-[-9.5%]">
        <Link href={`/card?title=1&id=2`}>
          <Image src={'/below-header/fear-the-walking-dead.png'} 
          alt="the-witcher" 
          className="w-[100%] h-full"
          width={708} height={483} />
        </Link>
      </div>
    </div>
    </div>

    </foreignObject>
    
    </svg>
    
  )
}




function Test2() {
  return (
    <svg width="100%" height="10%" viewBox="0 0 1246 170" fill="blue" xmlns="http://www.w3.org/2000/svg" className="my-9">

    <foreignObject x="0" y="0" width="100%" height="100%" className="bg-amber-500">

    <div className=" bg-red-500p grid grid-cols-4 gap-[1px] content-center px-2 w-full h-full">
      <div>
        <Link href={`/card?title=1&id=2`}>
          <Image src={'/below-header/ncis.png'} 
          alt="the-witcher" 
          className="rounded-l-md"
          width={930} height={495} />
        </Link>
      </div>
      <div>
        <Link href={`/card?title=1&id=2`}>
          <Image src={'/below-header/the-handmaids-tale2.png'} 
          alt="the-witcher" 
          // className="w-full h-full"
          width={930} height={495} />
        </Link>
      </div>
      {/* <div>
        <Link href={`/card?title=1&id=2`}>
          <Image src={'/below-header/the-umbrella-academy.png'} 
          alt="the-witcher" 
          // className="w-full h-full"
          width={930} height={495} />
        </Link>
      </div> */}
      <div>
        <Link href={`/card?title=1&id=2`}>
          <Image src={'/below-header/the-winter-king.png'} 
          alt="the-witcher" 
          className="rounded-r-md"
          width={930} height={495} />
        </Link>
      </div>
      <div>
        <Link href={`/card?title=1&id=2`}>
          <Image src={'/below-header/the-umbrella-academy.png'} 
          alt="the-witcher" 
          className="rounded-r-md"
          width={930} height={495} />
        </Link>
      </div>

    </div>

    </foreignObject>
    
    </svg>
    
  )
}