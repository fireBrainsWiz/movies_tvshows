import { MediaTypeInfoType } from "@/app/lib/MediaTypeInfoTypes"
import MyImageGallery from './MyImageGallery';
import { useContext } from "react";
import CardBeingViewedContext from "@/app/(__pages__)/context/CardBeingViewedContext";
import { CommonTypes } from "@/app/lib/MediaTypeInfoTypes";

export default function BackdropLogoPosterImageSwiper(
  {
    images, 
    type, 
    isVisibleAllImages,
    turnOffSomeControls
  }: {
    images: CommonTypes['Images']['backdrops'],
    type: 'backdrops' | 'posters' | 'logos',
    isVisibleAllImages: boolean
    turnOffSomeControls?: boolean
  }
) {

  // const {isVisibleCardPage} = useContext(CardBeingViewedContext)
  
  return (
    <MyImageGallery 
      images={images}
      type={type}
      turnOffSomeControls={turnOffSomeControls}
    />
  );
}
