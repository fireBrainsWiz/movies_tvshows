import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { ImagePath, PLACEHOLDER_IMAGE } from "@/app/lib/types"
import { useEffect, useMemo, useRef, useState } from "react"
import { MediaTypeInfoType } from "@/app/lib/MediaTypeInfoTypes"
import { ReactImageGalleryItem } from 'react-image-gallery';
import ImageGalleryImage from './ImageGalleryImage';
import {CommonTypes} from "@/app/lib/MediaTypeInfoTypes"

export default function  MyImageGallery({
  images, 
  type,
  turnOffSomeControls
}: {
  images: CommonTypes['Images']['backdrops'],
  type: 'backdrops' | 'posters' | 'logos',
  turnOffSomeControls?: boolean
}) {

  const items: ReactImageGalleryItem[] = images.map((image) =>({
    original: ImagePath + image.file_path,
    thumbnail: ImagePath + image.file_path,

    thumbnailHeight: 100,
    thumbnailWidth: 100,
 
    renderItem(item) {
      return (
        <ImageGalleryImage 
          image={image} 
          type={type} 
        />
      )
    },

  }))

  return (
    <div className="w-full max-w-[1280px] mx-auto"> 
      <ImageGallery 
        items={items} 
        additionalClass=''
        infinite={false}
        showFullscreenButton={!turnOffSomeControls}
        showPlayButton={!turnOffSomeControls}
      />
    </div>
  );
}


// const  breakpoints = {
//   0: {
//     items: 1
//   },
//   320: {
//     items: 2
//   },
//   576: {
//     items: 3
//   },
//   768: {
//     items: 4
//   },
//   1024: {
//     items: 6
//   },
//   1280: {
//     items: 8
//   },
//   1536: {
//     items: 10
//   },
//   1600: {
//     items: 12
//   },
//   1920: {
//     items: 15
//   },
//   2560: {
//     items: 20
//   }
// }
