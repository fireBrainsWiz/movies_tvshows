import { MediaTypeInfoType } from "@/app/lib/MediaTypeInfoTypes"
import MyImageGallery from './MyImageGallery';
import { useContext } from "react";
import CardBeingViewedContext from "@/app/(__pages__)/context/CardBeingViewedContext";

export default function BackdropLogoPosterImageSwiper(
  {images, type, isVisibleAllImages}: {
    images: MediaTypeInfoType['images']['backdrops'],
    type: 'backdrops' | 'posters' | 'logos',
    isVisibleAllImages: boolean
  }
) {

  const {isVisibleCardPage} = useContext(CardBeingViewedContext)
  
  return (
    <>
    {
      isVisibleAllImages ? (
      <MyImageGallery 
        images={images}
        type={type}
      />
      ) : null
    }
    </>
  );
}
