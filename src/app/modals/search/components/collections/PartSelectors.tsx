import { useEffect, useRef, useState } from "react"

export default function PartSelectors({
  partSelectorSelectedIndex,
  setPartSelectorSelectedIndex,
  partsLen
}:{
  partSelectorSelectedIndex: number
  setPartSelectorSelectedIndex: (_: number) => void
  partsLen: number

}) {

  const [viewAreaInfo, setViewAreaInfo] = useState<viewAreaInfoType | null>(null)
  const [selectedPartSelectorInfo, setSelectedPartSelectorInfo] = 
  useState<selectedPartSelectorInfoType | null>(null)


  useEffect(()=>{
    // setPartSelectorSelectedIndex(selectedPartSelectorInfo?.index || 0 )

    const elem = selectedPartSelectorInfo?.elem
    const prevElem = selectedPartSelectorInfo?.prev
    const nextElem = selectedPartSelectorInfo?.next
    const elemDomRect = selectedPartSelectorInfo?.elemDomRect
    
    const viewArea = viewAreaInfo?.elem
    const viewAreaDomRect = viewAreaInfo?.elemDomRect

    if(elem && prevElem && nextElem && elemDomRect && viewArea  && viewAreaDomRect) {
      if (
        elemDomRect.top < viewAreaDomRect.top &&
        elemDomRect.bottom > viewAreaDomRect.top 
        ||
        prevElem.getBoundingClientRect().top < viewAreaDomRect.top &&
        prevElem.getBoundingClientRect().bottom > viewAreaDomRect.top
      ) {
          viewArea.scrollBy({
            top: -70,
            left: 0,
            behavior: 'smooth'
          })
          // console.log('DOWN')
        } else if (
          elemDomRect.top < viewAreaDomRect.bottom &&
          elemDomRect.bottom > viewAreaDomRect.bottom
          ||
          nextElem.getBoundingClientRect().top < viewAreaDomRect.bottom &&
          nextElem.getBoundingClientRect().bottom > viewAreaDomRect.bottom
      ) {
          viewArea.scrollBy({
            top: 70,
            left: 0,
            behavior: 'smooth'
          })
          // console.log('UP')
      } 
    } else if(
        elem && !prevElem && nextElem && elemDomRect && viewArea  && viewAreaDomRect &&
        (elemDomRect.top < viewAreaDomRect.top &&
        elemDomRect.bottom > viewAreaDomRect.top) 
      )  {
        // console.log('DOWM L')
        viewArea.scrollBy({
          top: -70,
          left: 0,
          behavior: 'smooth'
        })

      } else if (
        elem && prevElem && !nextElem && elemDomRect && viewArea  && viewAreaDomRect &&
        (elemDomRect.top < viewAreaDomRect.bottom &&
        elemDomRect.bottom > viewAreaDomRect.bottom)
      )  {
        // console.log('UP L')
        viewArea.scrollBy({
          top: 70,
          left: 0,
          behavior: 'smooth'
        })
    }

  },[viewAreaInfo, selectedPartSelectorInfo])


  
  return (
    <div className="bg-cyan-500p flex justify-center items-centerp w-full ">
      <div className="h-[200px]  min-w-[50px] w-full ">
        <ViewArea 
          viewAreaInfo={viewAreaInfo} 
          setViewAreaInfo={setViewAreaInfo}
          selectedPartSelectorInfo={selectedPartSelectorInfo}
          setSelectedPartSelectorInfo={setSelectedPartSelectorInfo}
          partSelectorSelectedIndex={partSelectorSelectedIndex}
          setPartSelectorSelectedIndex={setPartSelectorSelectedIndex}
          partsLen={partsLen}
        />
      </div>
    </div>
  )
}



function ViewArea({
  viewAreaInfo,
  setViewAreaInfo,
  selectedPartSelectorInfo,
  setSelectedPartSelectorInfo,
  partSelectorSelectedIndex,
  setPartSelectorSelectedIndex,
  partsLen

}: {
  viewAreaInfo: viewAreaInfoType | null
  setViewAreaInfo: (_: viewAreaInfoType | null) => void

  selectedPartSelectorInfo: selectedPartSelectorInfoType | null 
  setSelectedPartSelectorInfo: (_: selectedPartSelectorInfoType | null) => void

  partSelectorSelectedIndex: number
  setPartSelectorSelectedIndex: (_: number) => void

  partsLen: number

}) {

  const viewAreaRef = useRef<HTMLDivElement | null>(null)


  useEffect(()=>{
    const viewArea = viewAreaRef.current
    if(viewArea) {
      setViewAreaInfo({
        elem: viewArea,
        elemDomRect: viewArea.getBoundingClientRect()
      })
    }

  },[viewAreaRef])

  //  console.log(partsLen)

  
  return (
    <div 
      ref={viewAreaRef}
      className="parts-selectors-view-area h-full w-[100%]p overflow-hidden overflow-y-auto last-child:bg-red-500 bg-orange-500p ">
      {
        [...new Array(partsLen)].map((_, i)=>{
          return (
            <PartSelector 
              key={i}
              num={++i} 
              viewAreaInfo={viewAreaInfo} 
              setViewAreaInfo={setViewAreaInfo}
              selectedPartSelectorInfo={selectedPartSelectorInfo}
              setSelectedPartSelectorInfo={setSelectedPartSelectorInfo}
              partSelectorSelectedIndex={partSelectorSelectedIndex}
              setPartSelectorSelectedIndex={setPartSelectorSelectedIndex}
            />
          )
        })
      }
    </div>
  )
}


function PartSelector({
  num,
  viewAreaInfo,
  setViewAreaInfo,
  selectedPartSelectorInfo,
  setSelectedPartSelectorInfo,
  partSelectorSelectedIndex,
  setPartSelectorSelectedIndex
}: {
  num:number
  viewAreaInfo: viewAreaInfoType | null 
  setViewAreaInfo: (_: viewAreaInfoType | null) => void

  selectedPartSelectorInfo: selectedPartSelectorInfoType | null 
  setSelectedPartSelectorInfo: (_: selectedPartSelectorInfoType | null) => void

  partSelectorSelectedIndex: number
  setPartSelectorSelectedIndex: (_: number) => void

}) {

  const buttonRef = useRef<HTMLButtonElement | null>(null)

  function onPartSelectorClick() {
    // console.log(1111)
    setPartSelectorSelectedIndex(num)

    const button = buttonRef.current
    if(button) {
      setSelectedPartSelectorInfo({
        index: num,
        elem: button,
        prev: button.previousElementSibling as HTMLButtonElement | null,
        next: button.nextElementSibling as HTMLButtonElement | null,
        elemDomRect: button.getBoundingClientRect()
      })
    }
  }


  useEffect(()=>{
    const button = document.getElementById(`part-selector-id-${partSelectorSelectedIndex}`) as HTMLButtonElement | null 

    if(button) {
      button.click()
    }
  },[partSelectorSelectedIndex])

  // console.log(selectedPartSelectorInfo, viewAreaInfo)

  const isSelectedStyle = num === selectedPartSelectorInfo?.index
    ? `border-l text-2xl font-bold`: `border-none`
  ;

  return (
    <button 
      ref={buttonRef}
      id={`part-selector-id-${num}`}
      className={`bg-blue-500p flex justify-center items-center w-14 h-14 ${isSelectedStyle} before:w-full before:h-1/2 before:bg-red-500p mx-auto before:absolute before:top-0 before:-left-[0.7rem] before:border-r-2 before:border-x-stone-600 before:-rotate-[70deg] first:before:border-none last:before:border-r-none relative`}
      onClick={onPartSelectorClick}
    >
      {num && num<10? '0'+num : num}
    </button>
  )
}


type viewAreaInfoType = {
  elem: HTMLDivElement | null
  elemDomRect: DOMRect | null
}

type selectedPartSelectorInfoType = {
  index: number
  elem: HTMLButtonElement | null
  prev: HTMLButtonElement | null
  next: HTMLButtonElement | null
  elemDomRect: DOMRect | null
}
