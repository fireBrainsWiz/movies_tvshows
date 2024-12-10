import Image from 'next/image';
import { ImagePath, TrailerType } from '@/app/lib/types';
import { useMemo } from 'react';
import { RiVideoFill } from "react-icons/ri";
import { CommonTypes } from '@/app/lib/MediaTypeInfoTypes';
import useAllImagesAndVideosStore from '@/app/(__pages__)/stores/all-images-and-videos-store/all-images-and-videos-store';



export default function ThreeImages({
  imagesToSet, 
  trailers, 
  colorThiefColor,
  disableScaling
}: {
  imagesToSet: CommonTypes['Images'];
  trailers: TrailerType[];
  colorThiefColor: number[][] | undefined;
  disableScaling?: boolean
}) {

  const { 
    images , setImages, isVisibleAllImages, 
    setIsVisibleAllImages, isVisibleAllVideos,
    setIsVisibleAllVideos, setTrailers,
  } = useAllImagesAndVideosStore()


  // const allImages = useMemo(
  //   () => [
  //     ...[imagesToSet?.backdrops && imagesToSet?.backdrops],
  //     ...[imagesToSet?.posters && imagesToSet?.posters],
  //     ...[imagesToSet?.logos && imagesToSet?.logos]
  //   ].flat(),
  //   [imagesToSet.id]
  // );

  const allImages =  [
    ...[imagesToSet?.backdrops && imagesToSet?.backdrops],
    ...[imagesToSet?.posters && imagesToSet?.posters],
    ...[imagesToSet?.logos && imagesToSet?.logos]
  ].flat()

  // const srcs = useMemo(
  //   function getSources() {
  //     const goDownFromNumber = (num: number): string => (
  //       allImages[num]?.file_path && num >= 0
  //         ? ImagePath + allImages[num].file_path
  //         : (num <= 0)
  //           ? '/no-image-2.webp'
  //           : goDownFromNumber(num - 1)
  //     );

  //     const srcs: { [key: number]: string; } = {
  //       0: goDownFromNumber(0),
  //       1: goDownFromNumber(1),
  //       2: goDownFromNumber(2),
  //       3: goDownFromNumber(3),
  //       4: goDownFromNumber(4),
  //       5: goDownFromNumber(5),
  //     };

  //     return srcs;
  //   },
  //   [allImages]
  // );

  function getSources() {
    const goDownFromNumber = (num: number): string => (
      allImages[num]?.file_path && num >= 0
        ? ImagePath + allImages[num].file_path
        : (num <= 0)
          ? '/no-image-2.webp'
          : goDownFromNumber(num - 1)
    );

    const srcs: { [key: number]: string; } = {
      0: goDownFromNumber(0),
      1: goDownFromNumber(1),
      2: goDownFromNumber(2),
      3: goDownFromNumber(3),
      4: goDownFromNumber(4),
      5: goDownFromNumber(5),
    };

    return srcs;
  }
  const srcs = getSources()


  function handleShowImagesClick() {
    setImages(imagesToSet)
    setIsVisibleAllImages(true)
  }
  
  function handleShowVideosClick() {
    setTrailers(trailers)
    setIsVisibleAllVideos(true)
  }

  // console.log({isVisibleAllImages, isVisibleAllVideos})

  // const borderColor = useMemo(() => {
  //   return {
  //     borderColor: colorThiefColor && colorThiefColor[5]
  //       ? `rgb(
  //       ${colorThiefColor[5][0]}, 
  //       ${colorThiefColor[5][1]}, 
  //       ${colorThiefColor[5][2]}
  //     )
  //     ` : 'gray'
  //   };
  // }, [colorThiefColor]);

  const borderColor =  {
    borderColor: colorThiefColor && colorThiefColor[5]
      ? `rgb(
      ${colorThiefColor[5][0]}, 
      ${colorThiefColor[5][1]}, 
      ${colorThiefColor[5][2]}
    )
    ` : 'gray'
  };



  const style = disableScaling
  ?`bg-sky-500p w-[120px] min-h-[50px] mt-3 pl-2 [@media_(min-width:1020px)]:mt-0 [@media_(min-width:1280px)]:mt-3 [@media_(max-width:639px)]:origin-center`

  : 'bg-sky-500p w-[120px] min-h-[50px] mt-3 pl-2 [@media_(min-width:1020px)]:scale-[0.7] [@media_(min-width:1280px)]:scale-[1] [@media_(min-width:1020px)]:mt-0 [@media_(min-width:1280px)]:mt-3 origin-left [@media_(max-width:639px)]:scale-150 [@media_(max-width:639px)]:origin-center'

  // console.log(borderColor, colorThiefColor)
  return (
    // 
    <div 
      // key={imagesToSet.id}
      className={style}>
      <button className='block w-full h-full disabled:cursor-not-allowed disabled:opacity-30'
        onClick={handleShowImagesClick}
        disabled={!allImages.length}
      >
        <div className='bg-[gold]p flex justify-between relative'>
          <div className={`bg-black w-[40px] h-[40px] rounded-full border-4`}
            style={borderColor}
          >
            <Image
              src={srcs[0]}
              alt="poster"
              width={100}
              height={100}
              quality={100}
              className='w-full h-full object-cover rounded-full' />
          </div>

          <div className={`bg-black w-[60px] h-[60px] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4`}
            style={borderColor}
          >
            <Image
              src={srcs[1]}
              alt="poster"
              width={100}
              height={100}
              quality={100}
              className='w-full h-full object-cover rounded-full' />
          </div>

          <div className={`bg-black w-[40px] h-[40px] rounded-full border-4`}
            style={borderColor}
          >
            <Image
              src={srcs[2]}
              alt="poster"
              width={100}
              height={100}
              quality={100}
              className='w-full h-full object-cover rounded-full' />
          </div>
        </div>
      </button>

      <hr className='my-4 border-white/70 dark:border-gray-500 h-[0.1px]' />

      <button className='block w-full h-full disabled:cursor-not-allowed disabled:opacity-30'
        onClick={handleShowVideosClick}
        disabled={!trailers[0]}
      >
        <div className='bg-[gold]p flex justify-between relative'>
          <div className={`bg-black w-[40px] h-[40px] rounded-full border-4 relative`}
            style={borderColor}
          >
            <Image
              src={srcs[3]}
              alt="poster"
              width={100}
              height={100}
              quality={100}
              className='w-full h-full object-cover rounded-full' />
            <span className='absolute top-1/2 before:absolute before:h-1/2 before:w-1/2 before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-rose-700 before:-z-10 left-1/2 -translate-x-1/2 -translate-y-1/2 '>
              <RiVideoFill size={15} color="" />
            </span>
          </div>

          <div className={`bg-black w-[60px] h-[60px] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 z-10`}
            style={borderColor}
          >
            <Image
              src={srcs[4]}
              alt="poster"
              width={100}
              height={100}
              quality={100}
              className='w-full h-full object-cover rounded-full' />
            <span className='absolute top-1/2 before:absolute before:h-1/2 before:w-1/2 before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-rose-700 before:-z-10 left-1/2 -translate-x-1/2 -translate-y-1/2'>
              <RiVideoFill size={30} color="" />
            </span>
          </div>

          <div className={`bg-black w-[40px] h-[40px] rounded-full border-4 relative`}
            style={borderColor}
          >
            <Image
              src={srcs[5]}
              alt="poster"
              width={100}
              height={100}
              quality={100}
              className='w-full h-full object-cover rounded-full' />
            <span className='absolute top-1/2 before:absolute before:h-1/2 before:w-1/2 before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-rose-700 before:-z-10 left-1/2 -translate-x-1/2 -translate-y-1/2 '>
              <RiVideoFill size={15} color="" />
            </span>
          </div>
        </div>
      </button>
    </div>
  );
}


//? ImagesAndVideosContext is to be deleted