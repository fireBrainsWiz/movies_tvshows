import { ImagePath } from "@/app/lib/types"
import { PartsType } from "./Parts"
import Image from "next/image"
import { HiMiniArrowLongRight } from "react-icons/hi2";
import { TfiClose } from "react-icons/tfi";
import PartSelectors from "./PartSelectors";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { useEffect, useState } from "react";
import PartMain from "./PartMain";


export default function Part({
  part,
  partsLen,
  partSelectorSelectedIndex,
  setPartSelectorSelectedIndex,
  isLoadingCollectionPartsModalImage,
  setIsLoadingCollectionPartsModalImage,
}: {
  part: PartsType[0] | null
  partsLen: number
  partSelectorSelectedIndex: number
  setPartSelectorSelectedIndex: (_: number) => void
  isLoadingCollectionPartsModalImage: boolean
  setIsLoadingCollectionPartsModalImage: (_: boolean) => void
}) {


  return (
    <PartMain
      part={part}
      partSelectorSelectedIndex={partSelectorSelectedIndex}
      setPartSelectorSelectedIndex={setPartSelectorSelectedIndex}
      partsLen={partsLen}
      isLoadingCollectionPartsModalImage={isLoadingCollectionPartsModalImage}
      setIsLoadingCollectionPartsModalImage={setIsLoadingCollectionPartsModalImage}
    />
  )
}






/*
     return (
    <div className="w-full h-full bg-amber-500/40p border rounded-md grid grid-cols-[1fr,20fr] overflow-hidden">
      <div className=" h-fullp bg-red-300/30p grid grid-rows-[1fr,5fr,1.6fr] gap-5 border-r">
        <div className=" border-b">
          <button 
            className=" text-2xl font-bold w-full h-full flex justify-center items-center"
            onClick={onCloseModalClick}> 
            <TfiClose />
          </button>
        </div>

        <PartSelectors 
          partSelectorSelectedIndex={partSelectorSelectedIndex}
          setPartSelectorSelectedIndex={setPartSelectorSelectedIndex}
        />

        <p className="bg-blue-500p rotate-90 flex items-center justify-center font-bold">
          <span>{part && release_date[2]}-</span>
          <span>{part && release_date[1]}-</span>
          <span>{part && release_date[0]}</span>
        </p>
      </div>

      <PartMain 
        part={part} 
        partSelectorSelectedIndex={partSelectorSelectedIndex} setPartSelectorSelectedIndex={setPartSelectorSelectedIndex} 
        partsLen={partsLen} 
      />
    </div>
  )  

*/