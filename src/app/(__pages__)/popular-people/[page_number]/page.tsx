import { TMDBOptions } from "@/app/client/helpers/TMDB_API"
import { Params, PopularPeopleList } from "../layout"
import PopularPeopleCards from "../components/PopularPeopleCards"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function PopularPeopleDynamicHome({
  params
}: {
  params: Params
}) {
  console.log()
console.log({params})
  return (
    <div className="bg-slate-500p bg-[#d9d9d9]p bg-[#222]">
      {/* <p>page number: {params?.page_number}</p> */}
      {/* <div className="bg-red-500 w-[200px] h-[300px]"></div> */}
      <PopularPeopleCards page={Number(params?.page_number || 1)}/>
    </div>
  )
}

export const dynamicParams = false // true | false, 

export async function generateStaticParams() {
  // const {total_pages}: PopularPeopleList = 
  // await fetch(
  //   'https://api.themoviedb.org/3/person/popular?language=en-US&page=1', 
  //   TMDBOptions
  //   ).then(res => res.json()) 
    
  //   console.log({total_pages})

  return [...Array(500)].map((_,i) => ({
    page_number: (i + 1).toString(),
  }))
}
