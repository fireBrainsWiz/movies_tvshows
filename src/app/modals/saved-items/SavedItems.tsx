'use client'

import useSeasonsStore from "@/app/(__pages__)/stores/seasons-store/seasons-store"
import { TfiClose } from "react-icons/tfi";
import { ImagePath } from "@/app/lib/types";
import Image from "next/image";
import MoviesOrTVshowsInfoContext from "@/app/(__pages__)/context/MoviesOrTVshowsInfoContext";
import { useContext, useEffect, useRef, useState } from "react";
import CardBeingViewedContext from "@/app/(__pages__)/context/CardBeingViewedContext";
import { IoStar } from "react-icons/io5";
import { MdAddCircleOutline } from "react-icons/md";
import { BsShare } from "react-icons/bs";
import useSavedStorePersist from "@/app/(__pages__)/stores/saved-store/saved-store-persist";
import { SaveOrRemoveFromSavedStore } from "@/app/(__pages__)/components/save/SaveOrRemoveFromSavedStore";
import useSavedStore from "@/app/(__pages__)/stores/saved-store/save-store";
import { CiSearch } from "react-icons/ci";
import { IoMenu } from "react-icons/io5";
import { WhatToDisplay } from "./WhatToDisplay";
import { HiMiniArrowLongUp } from "react-icons/hi2";


export default function SavedItems() {

  const scrollElemRef = useRef<HTMLDivElement | null>(null)
  const glowingBorderElemRef = useRef<HTMLDivElement | null>(null)

  const {isVisibleSavedItems, setIsVisibleSavedItems} = useSavedStore()

  const [selectedItem, setSelectedItem] = useState<SelectedItemType>('movie')
  const [showSelectBtnsSmallScreen, setShowSelectBtnsSmallScreen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [showScrollToTopBtn, setShowScrollToTopBtn] = useState(false)

  const availableOptions = ['movie', 'tvshow', 'season', 'episode'] 

  function handleCloseAllImagesClick() {
    setIsVisibleSavedItems(false)
  }
  
  function scrollToTp() {
    const scrollElem = scrollElemRef.current
    if (!scrollElem) return

    // scrollElem.scrollTop = 0; 
    scrollElem.scrollTo ({top: 0, left: 0, behavior: 'smooth'}); 
  }


  useEffect(() => {
    const scrollElem = scrollElemRef.current
    if (!scrollElem) return

    const handleScroll = () => {
      setShowScrollToTopBtn(scrollElem.scrollTop > 300)
    }

    scrollElem.addEventListener('scroll', handleScroll)
    return () => scrollElem.removeEventListener('scroll', handleScroll)

  }, [scrollElemRef.current])



  return (
    <section 
      ref={scrollElemRef}
      className={`bg-stone-700p bg-white absolute w-full h-screen top-0 z-20 ${isVisibleSavedItems ? 'left-0' : 'left-[-100%]'} [transition:left_100ms_ease-in-out] sm:[transition:left_0ms_ease-in-out] overflow-y-auto mb-4 pb-[50px]`}
    >
      <div className="w-full flex justify-end gap-2  h-[50px] bg-red-600p"> 
        <button 
          className="text-white dark:text-black font-black text-2xl cursor-pointer bg-red-500p p-4"
          onClick={handleCloseAllImagesClick}>
          <TfiClose title="close button"/>
        </button>
      </div>

      <div className="max-w-[1546px] mx-auto">
        <div className="min-h-[95%] bg-sky-500/20p py-10 px-4 relative">
          <div className="bg-stone-500 sm:flex gap-4 justify-between">
            <SelectBtns 
              setSelectedItem={setSelectedItem} 
              availableOptions={availableOptions} 
              selectedItem={selectedItem}
            />
            <SelectBtnsSmallScreen 
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem} 
              availableOptions={availableOptions} 
              showSelectBtnsSmallScreen={showSelectBtnsSmallScreen}
              setShowSelectBtnsSmallScreen={setShowSelectBtnsSmallScreen}
            />
            <SearchInTheSelectedItems 
              setSearchTerm={setSearchTerm} 
              searchTerm={searchTerm}
              glowingBorderElemRef={glowingBorderElemRef}
            />
          </div>
          <p 
            ref={glowingBorderElemRef}
            className="border-b border-gray-400 mt-[1px] [transition:border-color_300ms_ease-in-out]">
          </p>

          <div className="w-full sm:hidden flex justify-end gap-2  h-[50px] bg-red-600/20p absolute top-[120px] right-0"> 
            <button 
              className="text-white dark:text-black font-black text-2xl cursor-pointer bg-red-500p p-4"
              onClick={() => setShowSelectBtnsSmallScreen(true)}>
              <IoMenu title="open button" size={35}/>
            </button>
          </div>

          <WhatToDisplay 
            selectedItem={selectedItem}
            searchTerm={searchTerm}
          />
        </div>

        {
          showScrollToTopBtn && (
            <button 
              className="text-white dark:text-white fixed bottom-4 right-4 p-2 bg-rose-600 rounded-full"
              onClick={scrollToTp}
            >
              <span className="flex items-center">
                <HiMiniArrowLongUp  size={20} className="animate-bounce"/>
              </span>
              {/* <HiMiniArrowLongRight className="animate-bounce -rotate-180"/> */}
            </button>
          )
        }
      </div>
    </section>
  )
}

//56C080


function SelectBtns({
  availableOptions,
  setSelectedItem,
  selectedItem
}: {
  availableOptions: string[]
  setSelectedItem: (_: SelectedItemType) => void
  selectedItem: SelectedItemType
}) {
  // console.log(selectedItem)
  return (
    <div className="gap-4 hidden sm:flex justify-center">
      {
        availableOptions.map((option, i) => (
          <button 
            className="text-white dark:text-white font-semiboldp text-xl p-[4px] [@media(min-width:768px)]:px-2 pb-0p flex items-end"
            key={i}  
            onClick={() => setSelectedItem(option as SelectedItemType)}
            style={option === selectedItem ? {
              borderBottom: '1px solid #61da9a',
              color: '#61da9a',
              fontWeight: 'bold'
            } : {}}
          >
            {option}s
          </button> 
        ))
      } 
    </div>
  )
}

function SelectBtnsSmallScreen({
  availableOptions,
  selectedItem,
  setSelectedItem,
  showSelectBtnsSmallScreen,
  setShowSelectBtnsSmallScreen
}: {
  availableOptions: string[]
  selectedItem: SelectedItemType
  setSelectedItem: (_: SelectedItemType) => void
  showSelectBtnsSmallScreen: boolean
  setShowSelectBtnsSmallScreen: (_: boolean) => void
}) {
  return (
    <div className={`flex flex-col gap-4 sm:hidden bg-emerald-900p absolute bottom-0 top-[120px] ${showSelectBtnsSmallScreen ? 'left-0' : 'left-[-100%]'} [transition:left_100ms_ease-in-out] w-[100%] z-10`}>
      <div className="w-full flex justify-end gap-2  h-[50px] bg-red-600p"> 
        <button 
          className="text-white dark:text-black font-black text-2xl cursor-pointer bg-red-500p p-4"
          onClick={() => setShowSelectBtnsSmallScreen(false)}>
          <TfiClose title="close button"/>
        </button>
      </div>

      <button className="bg-stone-500 py-10 px-4 absolute top-0 bottom-0 w-full  -z-10" 
        onClick={() => setShowSelectBtnsSmallScreen(false)}
      ></button>

      {
        availableOptions.map((option, i) => {
          return (
            <button 
              className="text-white dark:text-white font-semibold text-xl p-4 w-1/2 bg-slate-500p flex"
              key={i}  
              onClick={() => {
                setSelectedItem(option as SelectedItemType)
                setShowSelectBtnsSmallScreen(false)
              }}
              style={option === selectedItem ? {
                borderLeft: '1px solid #61da9a',
                color: '#61da9a',
                fontWeight: 'bold'
              } : {}}
            >
            {option}s
          </button>
          )
        })
      } 
    </div>
  )
}

function SearchInTheSelectedItems({
  searchTerm,
  setSearchTerm,
  glowingBorderElemRef    
}: {
  searchTerm: string
  setSearchTerm: (_: string) => void
  glowingBorderElemRef: React.MutableRefObject<HTMLDivElement | null>
}) {
  
  return (
    <div className="group">
      <form 
        onSubmit={(e) => e.preventDefault()}
        className="w-full group-focus-within:border-[#61da9a] sm:w-[300px]p flex gap-2 justify-end sm:border-l border-neutral-700 text-white dark:text-white py-2 sm:py-0 sm:pt-4 items-center px-4">
        <input 
          className="w-full p-2 bg-transparent outline-none" 
          type="text" placeholder="Search something" 
          onChange={e => setSearchTerm(e.target.value.trim())}
          onFocus={() => glowingBorderElemRef.current?.classList.add('glowing-border')}
          onBlur={() => glowingBorderElemRef.current?.classList.remove('glowing-border')}
        />
        <CiSearch size={30} color="#61da9a" className="group-focus-within:scale-150 [transition:transform_300ms_ease-in-out]"/>
      </form>
    </div>
  )
}

export type SelectedItemType = 'movie' | 'tvshow' | 'season' | 'episode'