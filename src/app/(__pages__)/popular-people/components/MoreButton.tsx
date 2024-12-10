'use client';

import { useContext } from "react";
import { MediaTypeInfoType } from "@/app/lib/MediaTypeInfoTypes";
import axios from "axios";
import { TMDBOptions } from "@/app/client/helpers/TMDB_API";
import MoviesOrTVshowsLinksContext from "../../context/MoviesOrTVshowsLinksContext";
import ToggleShowPersonContext from "../../context/ToggleShowPersonContext";

export function MoreButton({
  id, 
  personName
}: { 
  id: number 
  personName: string 
}) {
  const { links } = useContext(MoviesOrTVshowsLinksContext);
  const {
    setIsVisiblePerson, setPersonDetails, isVisiblePerson, personDetails
  } = useContext(ToggleShowPersonContext);


  function getPersonDetail(e: any) {
    e.stopPropagation()
    // alert(innerWidth)
    setIsVisiblePerson(true);
    try {
      (async () => {
        const { data }: { data: MediaTypeInfoType['personDetails']; } = await axios(
          `${links.INFOS.personDetails.beforeStr}${id}${links.INFOS.personDetails.afterStr}`,
          TMDBOptions
        );
        setPersonDetails(data);
        // setIsVisiblePerson(true);
      })();
    } catch (err: any) {
      console.log(err);
    }
  }

  const ab = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse, voluptasnjbgjb hjhjj jjhkhknuih.'

  // alert(JSON.stringify({isVisiblePerson, innerWidth}))
  // const shortName = personD

  return (
    <button
      key={id}
      onClick={getPersonDetail}
      className={` inline-block px-3p py-[1px] sm:py-0 px-4 truncate bg-green-600p rounded-md text-white ml-[calc(100%-60px)]p border border-white/70 dark:border-gray-500 max-h-[18px]`}>
      more about {personName} 
    </button>
);
}
