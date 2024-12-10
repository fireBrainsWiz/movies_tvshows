'use client'

import { TfiClose } from "react-icons/tfi";
import useAllImagesAndVideosStore from "../../(__pages__)/stores/all-images-and-videos-store/all-images-and-videos-store";


export default function AllVideos() {

  const {isVisibleAllVideos, setIsVisibleAllVideos, trailers} = useAllImagesAndVideosStore()

  if (!isVisibleAllVideos) return null
  
  return (
    <div 
    key={isVisibleAllVideos? 1 : 0}
      className={`bg-[#acacac] absolute w-full h-screen top-0 z-20 ${isVisibleAllVideos ? 'left-0' : 'left-[-100%]'} overflow-y-auto mb-4 pb-[50px]`}
    >
      <div className="w-full flex justify-end gap-2  h-[50px] bg-red-600p"> 
        <button 
          className="text-white dark:text-black font-black text-2xl cursor-pointer bg-red-500p p-4"
          onClick={() => setIsVisibleAllVideos(false)}>
          <TfiClose title="close button"/>
        </button>
      </div>


      <div className="flex flex-wrap justify-center gap-4 p-4">
        {
          trailers[0] && (
            trailers.map((trailer) => {
              return (
                <iframe 
                  key={trailer.key}
                  className="w-1/4p h-[30vh] w-full sm:w-[95vmin] md:w-[45vmin] lg:w-[35vmin] p-4"
                  src={`https://www.${trailer.site}.com/embed/${trailer.key}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                >
                  <p>Your browser does not support iframes.</p>
                </iframe>
              )
            })
          )
        }
      </div>
    </div>
  )
}