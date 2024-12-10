import { useEffect, useState } from 'react';
import { VisibleAreaBoundingRect } from '../../ItemsSlides';
import Parts, { PartsType } from './Parts';
import { TMDBOptions } from '@/app/client/helpers/TMDB_API';
import axios from 'axios';
import { TfiClose } from "react-icons/tfi";
import CollectionPartsMenu from './MyImageGallery';
import PartSelectors from './PartSelectors';
import Part from './Part';
import PartMain from './PartMain';


export function CollectionPartsModal({
   isOpenCollectionParts, 
   setIsOpenCollectionParts, 
   itemsContainerParentRef, 
   title, 
   visibleAreaBoundingRect,
   clickedCollectionId
}: {
   isOpenCollectionParts: boolean;
   setIsOpenCollectionParts: (_: boolean) => void;
   itemsContainerParentRef: React.RefObject<HTMLDivElement | null>;
   title: string;
   visibleAreaBoundingRect: VisibleAreaBoundingRect;
   clickedCollectionId: number | null
}) {
   
   const [wholeCollection, setWholeCollection] = useState<WholeCollection | null>(null)
   const [partSelectorSelectedIndex, setPartSelectorSelectedIndex] = useState(1)
   const [isLoadingCollectionPartsModalImage, setIsLoadingCollectionPartsModalImage] = useState(true)


   function onCloseModalClick() {
      setIsOpenCollectionParts(false);
      const elem = itemsContainerParentRef.current;
      if (!elem || title !== 'Collections') return;
      elem.style.overflowY = 'auto';
   }

   //api call
   useEffect(() => {
      (async () => {
         if (!clickedCollectionId) return 
         
         try {
            const wholeCollection: WholeCollection = await axios(
               `https://api.themoviedb.org/3/collection/${clickedCollectionId}?language=en-US`,
               TMDBOptions
            ).then(res => res.data)

            // console.log(wholeCollection)
            // if (!('data' in wholeCollection)) throw new Error(
            //    'something went wrong. Please reload the page'
            // )
            
            setWholeCollection(wholeCollection)

            } catch (err: any) {
               console.log('err from collecction parts: ')
            }
      })()

   }, [clickedCollectionId])

   // console.log({pl: wholeCollection?.parts.length, ind:partSelectorSelectedIndex})

   useEffect(() => {
      if (isOpenCollectionParts) {
         setPartSelectorSelectedIndex(1)
      } else {
         setIsLoadingCollectionPartsModalImage(true)
      }
   }, [isOpenCollectionParts])

   return (
      <div
         className={`w-full absolute top-0 bottom-0 overflow-hidden overflow-y-autop ${isOpenCollectionParts ? 'left-0' : 'left-full'}  z-10`}
      >
         <div
            className={` bg-[#4c4848] absolute top-0 left-0 w-full h-full overflow-hidden overflow-y-auto pt-3 pb-2`}
            style={{
               height: `${(visibleAreaBoundingRect.height - 100) - visibleAreaBoundingRect.top}px`
            }}
         >
            <div className="w-full h-[96%] bg-amber-500/40p border rounded-md flex flex-wrap overflow-hidden overflow-y-autop relative">
                  <div className="right-[calc(100%-50px)] h-full border-r absolute top-0 left-0 bottom-0 bg-rose-500p flex flex-wrap bg-amber-600p sm:right-[93.666667%]">
                     <div className=" border-b bg-green-400p h-[50px] w-full">
                        <button 
                           className=" text-2xl font-bold w-full h-full flex justify-center items-center"
                           onClick={onCloseModalClick}> 
                           <TfiClose />
                        </button>
                     </div>

                     <PartSelectors 
                        partSelectorSelectedIndex={partSelectorSelectedIndex}
                        setPartSelectorSelectedIndex={setPartSelectorSelectedIndex}
                        partsLen={wholeCollection?.parts?.length || 0}

                     />
                     <PartDate 
                        part={wholeCollection?.parts[partSelectorSelectedIndex-1] || null} 
                     />
                  </div>

                  
                  <div className='bg-blue-500p w-11/12p  left-[50px] sm:left-[6.333333%] h-full absolute top-0 bottom-0 right-0'> 

                     <Part 
                        part={wholeCollection?.parts[partSelectorSelectedIndex-1] || null} 
                        partsLen={wholeCollection?.parts?.length || 0}
                        partSelectorSelectedIndex={partSelectorSelectedIndex}
                        setPartSelectorSelectedIndex={setPartSelectorSelectedIndex}
                        isLoadingCollectionPartsModalImage={isLoadingCollectionPartsModalImage}
                        setIsLoadingCollectionPartsModalImage={setIsLoadingCollectionPartsModalImage}
                     />
                  </div>
                  
            </div>


         </div>
      </div>
   );
}

function PartDate({
   part
}:{
   part:  PartsType[0] | null
}) {

   const release_date = part? [...part.release_date.split('-')] : []
   
   return (
      <div className='w-full bg-stone-500/50 flex items-center min-h-[150px]'>
         <div className="bg-blue-500p rotate-90 flex items-center justify-center w-[10px] h-[10px] mx-auto font-bold ">
         <span>{part && release_date[2]}-</span>
         <span>{part && release_date[1]}-</span>
         <span>{part && release_date[0]}</span>
      </div>
      </div>
   )
}


type WholeCollection = {
   id: string,
   name : string,
   overview : string,
   poster_path : string,
   backdrop_path: string,
   parts: PartsType
}