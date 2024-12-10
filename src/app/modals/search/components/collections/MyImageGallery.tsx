import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { ImagePath, PLACEHOLDER_IMAGE } from "@/app/lib/types"
import { useEffect, useMemo, useRef, useState } from "react"
import { MediaTypeInfoType } from "@/app/lib/MediaTypeInfoTypes"

import { ReactImageGalleryItem } from 'react-image-gallery';

export default function  CollectionPartsMenu({
  
}: {
 
}) {

  const images = [...new Array(100)]
  const items: ReactImageGalleryItem[] = images.map((image, i) =>({
    original: './no-image.png',
    thumbnail: './no-image.png',


    // thumbnailHeight: 10,
    // thumbnailWidth: 10,

    originalClass: 'w-full bg-amber-500 h-[65vh] ',
    thumbnailClass: 'w-[10px]p h-[10px]p',
 
    renderItem(item) {
      return (
        <div className='w-fullp bg-blue-500 h-full'>
          hello
        </div>
      )
    },

    renderThumbInner(item) {
      return (
        <div className='w-fullp bg-red-500 h-full p-2'>
          {i && i<10? '0'+i : i}
        </div>
      )
    },

  }))

  return (
    <div className="w-full max-w-[1280px] mx-auto h-full bg-green-500/40"> 
      <ImageGallery 
        items={items} 
        additionalClass='w-fullp bg-red-500p h-full p-10p'
        infinite={false}
        showNav={false}
        showPlayButton={false}
        showFullscreenButton={false}
        thumbnailPosition="left"
      />
    </div>
  );
}


const  breakpoints = {
  0: {
    items: 1
  },
  320: {
    items: 2
  },
  576: {
    items: 3
  },
  768: {
    items: 4
  },
  1024: {
    items: 6
  },
  1280: {
    items: 8
  },
  1536: {
    items: 10
  },
  1600: {
    items: 12
  },
  1920: {
    items: 15
  },
  2560: {
    items: 20
  }
}
