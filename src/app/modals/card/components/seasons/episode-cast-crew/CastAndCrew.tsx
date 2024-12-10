'use client'

import useSeasonsStore from "@/app/(__pages__)/stores/seasons-store/seasons-store"
import { TfiClose } from "react-icons/tfi";
import Starring from "../../Starring";
import { getFirstXItems } from "../../../lib/utils";
import Crew from "./Crew";


export default function CastAndCrew() {

  const {showEpisodeCastOrCrew, setShowEpisodeCastOrCrew} = useSeasonsStore()

  // console.log(showEpisodeCastOrCrew)

  
  return (
    <div 
      className={`bg-stone-500 text-blackp absolute w-full h-screen top-0 z-20 ${showEpisodeCastOrCrew.isVisibleEpisodeCastOrCrew ? 'left-0' : 'left-[-100%]'} [transition:left_100ms_ease-in-out] sm:[transition:left_0ms_ease-in-out] overflow-y-auto mb-4 pb-[50px]`}
    >
      <div className="w-full flex justify-end gap-2  h-[50px] bg-red-600p"> 
        <button 
          className="text-white dark:text-black font-black text-2xl cursor-pointer bg-red-500p p-4"
          onClick={() => {
            setShowEpisodeCastOrCrew(
              {...showEpisodeCastOrCrew, isVisibleEpisodeCastOrCrew: false}
            )
          }}>
          <TfiClose title="close button"/>
        </button>
      </div>

      <div className="bg-sky-500p py-10 px-4 flex justify-center flex-wrap gap-10">
        {
          showEpisodeCastOrCrew.episodeCastOrCrew.length ? (
            <>
            <Starring  
              stars={
                getFirstXItems(showEpisodeCastOrCrew.episodeCastOrCrew)
              }
            /> 

            <Crew crew={showEpisodeCastOrCrew.episodeCastOrCrew}/> 
            </>
          ) : (
            <p className="text-center text-2xl">No cast or crew to show</p>
          )
        }
      </div>
  </div>
  )
}


