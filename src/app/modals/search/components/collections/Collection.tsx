import { ImagePath } from "@/app/lib/types";
import { CollectionType } from "../../ItemsSlide";
import Image from "next/image";
import ImageOrNoImage from "@/app/client/components/ImageOrNoImage";
import {useLayoutEffect } from "react";
import getTailwindColorUsingNumber from "@/app/client/helpers/getTailwindColorsUsingNumber";

// let timerId: ReturnType<typeof setTimeout>
let scrollTop = 0

export default function Collection({
   result, 
   isOpenCollectionParts,
   setIsOpenCollectionParts,
   itemsContainerParentRef,
   title,
   setClickedCollectionId
}: {
   result: CollectionType;
   isOpenCollectionParts: boolean
   setIsOpenCollectionParts: (_: boolean) => void
   itemsContainerParentRef: React.RefObject<HTMLDivElement | null>;
   title: string,
   setClickedCollectionId: (_: number | null) => void
}) {

   // const bgColor = `
   //    ${result.id.toString().slice(0, 2)},
   //    ${result.id.toString().slice(2, 4)},
   //    ${result.id.toString().slice(4, 6)}
   // `;
   const bgColor = getTailwindColorUsingNumber(result?.id || 123456);
   

   function onOpenCollectionClick() {
      const elem = itemsContainerParentRef.current;
      if (!elem) return;

      scrollTop = elem.scrollTop
      elem.scrollTo(0, 0);
      elem.style.overflow = 'hidden'
      setIsOpenCollectionParts(true);
      setClickedCollectionId(result.id)
   }  


   useLayoutEffect(() => {
      const elem = itemsContainerParentRef.current;

      if (!isOpenCollectionParts && elem && scrollTop !== 0) {
         elem.scrollTo({
            top: scrollTop,
            left: 0,
            // behavior: 'smooth'
         });
      }

   }, [isOpenCollectionParts, itemsContainerParentRef, scrollTop])
 
   // useEffect(() => {
   //    const elem = itemsContainerParentRef.current;

   //    function fn() {
   //       clearTimeout(timerId)
   //       const elem = itemsContainerParentRef.current;
   //       if (!elem) return 

   //       setTimeout(()=>{
   //          setScrollTop(elem.scrollTop);
   //          // console.log(scrollTop)
   //       }, 10)
   //    }

   //    elem?.addEventListener('scroll', fn)
   //    return ()=> elem?.removeEventListener('scroll', fn)

   // }, [itemsContainerParentRef])

   return (
      <div
         className={`border border-[#C9B8B0] rounded-md grid grid-flow-col p-4 max-[680px]:grid-flow-row w-[clamp(0px,100vmax,580px)] min-h-[300px] max-h-[400px]p m-4 max-[680px]:mx-5 justify-between grid-cols-[35%_65%] max-[680px]:grid-cols-[1fr] ${bgColor}`}
      >
         <button 
            className="max-w-[200px] max-[680px]:max-w-full max-[680px]:mb-10 mx-auto"
            onClick={onOpenCollectionClick}
         >
            <ImageOrNoImage
               bgColor={bgColor}
               hasImagePath={!!result.poster_path}
               collectionId={result.id}
            >
               <Image
                  className="border-2 rounded-md border-[#C9B8B0] h-full "
                  src={result.poster_path ? ImagePath + result.poster_path : '/no-image.png'}
                  alt={result.name}
                  width={300}
                  height={400}
                  style={{
                     // mixBlendMode: !result.poster_path? 'color-burn' : 'normal',
                     opacity: !result.poster_path ? '0' : '1',
                  }} />
            </ImageOrNoImage>
         </button>

         <div className="ml-[clamp(0px,3.5vw,50px)] grid max-[680px]:ml-0">
            <h3 className="text-xl border-b border-b-neutral-500 mb-6 pb-2 font-bold  max-h-[60px] overflow-hidden overflow-y-auto"
            >
               {result.name}
            </h3>
            <p className="line-clamp-4p hover:line-clamp-nonep h-[100px] overflow-hidden overflow-y-auto bg-blue-700p">{result.overview ? result.overview : '😢 No overview available'}</p>

            <button
               className="bg-neutral-500/30 flex self-end justify-between mt-2"
               onClick={onOpenCollectionClick}
            >
               <ImageOrNoImage
                  bgColor={bgColor}
                  hasImagePath={!!result.backdrop_path}
                  horizontal
                  collectionId={result.id}
               >
                  <Image
                     className="border border-neutral-500"
                     src={result.backdrop_path ? ImagePath + result.backdrop_path : '/no-image_h.png'}
                     alt={result.name}
                     width={300 / 2}
                     height={200 / 2}
                     style={{
                        // mixBlendMode: !result.poster_path? 'color-burn' : 'normal',
                        opacity: !result.backdrop_path ? '0' : '1',
                     }} />
               </ImageOrNoImage>
               <p className="underline capitalize">{result.original_language}</p>
            </button>

         </div>
      </div>
   );
}



