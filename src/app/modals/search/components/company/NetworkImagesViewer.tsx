'use client'

import useNetworkImagesViewerStore, { NetworkImages, NetworkAlternativeNames, NetworkDetails } from "@/app/(__pages__)/stores/network-images-viewer-store/network-images-viewer-store"
import { TMDBOptions } from "@/app/client/helpers/TMDB_API";
import { ImagePath, PLACEHOLDER_IMAGE } from "@/app/lib/types";
import BackdropLogoPosterImageSwiper from "@/app/modals/all-images-and-videos/BackdropLogoPosterImageSwiper";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { TfiClose } from "react-icons/tfi";


export default function NetworkImagesViewer() {
  
  const {
    networkImagesTrigger, setNetworkImagesTrigger 
  } = useNetworkImagesViewerStore()

  const [networkDetails, setNetworkDetails] = useState<NetworkDetails | null>(null)
  const [networkImages, setNetworkImages] = useState<NetworkImages['logos'] | null>(null)
  const [alternativeNames, setAlternativeNames] = 
  useState<NetworkAlternativeNames['results'] | null>(null)


  useEffect(() => {
    ;(async ()=> {
      try {
        if (!networkImagesTrigger.networkId) return

        const networkImages: NetworkImages = await axios(
          `https://api.themoviedb.org/3/network/${networkImagesTrigger.networkId}/images`, 
          TMDBOptions
        ).then(res => res.data)

        const networkAlternativeNames: NetworkAlternativeNames = await axios(
          `https://api.themoviedb.org/3/network/${networkImagesTrigger.networkId}/alternative_names`, 
          TMDBOptions
        ).then(res => res.data)

        const networkDetails: NetworkDetails = await axios(
          `https://api.themoviedb.org/3/network/${networkImagesTrigger.networkId}`, 
          TMDBOptions
        ).then(res => res.data)

        setNetworkDetails(networkDetails)
        setNetworkImages(networkImages.logos)
        setAlternativeNames(networkAlternativeNames.results)

      } catch (error) {
        console.log(error)
      }

    })()


  }, [networkImagesTrigger.networkId])


  const allImages = useMemo(
    () => networkImages?.map((item) => ({
      aspect_ratio: item.aspect_ratio,
      height: item.height,
      iso_639_1: '',
      file_path: item.file_path.split('.')[0]+item.file_type,
      vote_average: item.vote_average,
      vote_count: item.vote_count,
      width: item.width
    })) || [],
    [networkImages]
  )

  
  return (
    <section 
      className={`bg-stone-700 absolute w-full h-screen top-0 z-20 ${networkImagesTrigger.isVisibleNetworkImagesViewer ? 'left-0' : 'left-[-100%]'} [transition:left_100ms_ease-in-out] sm:[transition:left_0ms_ease-in-out] overflow-y-auto mb-4 pb-[50px] overflow-hidden`}
    >
      <div className="w-full flex justify-end gap-2  h-[50px] bg-red-600p border-b  border-white/70 dark:border-gray-500 mb-10"> 
        <button 
          className="text-white dark:text-black font-black text-2xl cursor-pointer bg-red-500p p-4"
          onClick={() => setNetworkImagesTrigger({
            ...networkImagesTrigger, 
            isVisibleNetworkImagesViewer: false
          })}>
          <TfiClose title="close button"/>
        </button>
      </div>


      <div className="bg-red-500p  w-[calc(100%-32px)] h-full max-w-[1546px] mx-auto [@media(max-width:500px)]:h-[130vh]">
        <div className="min-h-[50%] border pl-4 [@media(max-width:740px)]:px-4 border-white/70 dark:border-gray-500 grid grid-cols-[30%_60%] justify-between gap-[10px] [@media(max-width:740px)]:grid-cols-1 [@media(max-width:740px)]:gap-[50px] items-center bg-yellow-900p mx-4 py-20 rounded-[16px] ">
          <div className="bg-amber-500p mx-auto border-r [@media(max-width:740px)]:border-r-0 [@media(max-width:740px)]:border-b border-white/70 dark:border-gray-500 h-full grid items-center min-h-[250px] relative px-2">
            <Image 
              src={
                networkImagesTrigger.logoPath? 
                ImagePath + networkImagesTrigger.logoPath : '/no-image-2.webp'
              }
              alt="network logo image"
              width={400} 
              height={400}
              placeholder="blur"
              blurDataURL={PLACEHOLDER_IMAGE.TMDB_IMAGE}
            />

            {
              networkDetails && (
                <span className=" fbg-red-500 p-2 absolute bottom-0 right-0 border border-white/70 dark:border-gray-500">
                  {networkDetails.origin_country}
                </span>
              )
            }
          </div>
          <div className="bg-green-500p">
            <BackdropLogoPosterImageSwiper 
              images={allImages}
              type="logos"
              isVisibleAllImages={true}
              turnOffSomeControls={true}
            />
          </div>
        </div>

        <div className="my-10 bg-green-800p [@media(min-width:740px)]:grid grid-cols-2 px-4">
      
          <div className="bg-sky-700p ">
            {
              networkDetails && (
                <p className=" mb-2">
                  <span className="text-xl font-bold">
                      Name:
                    </span>
                    <span className="ml-4">   
                      {networkDetails.name}  
                    </span>
                </p>
              )
            }
            <p className=" font-bold text-xl text-centerp my-4 mb-1">
              Other names:
            </p>
            {
              alternativeNames && alternativeNames.length > 0 && (
                <ul>
                  {
                    alternativeNames.map(({name}, i) => (
                      <li key={i}>{name}</li>
                    ))
                  }
                </ul>
              )
            }
          </div>

          <div className="bg-sky-900p [@media(max-width:740px)]:mt-6">
            {
              networkDetails && (
                <>
                  <p className="mb-2">
                    <span className="text-xl font-bold">
                      Headquarters:
                    </span>
                    <span className="ml-4">   
                      {networkDetails.headquarters}  
                    </span>
                  </p>
                  <p className="mb-4">
                    <span className="text-xl font-bold">
                      Homapage:
                    </span>
                    <span className="ml-4"> 
                      {
                        networkDetails.homepage ? (
                          <Link href={networkDetails.homepage} target="_blank">
                            {networkDetails.name} 's Homepage 
                          </Link>
                        ) : (
                          'N/A'
                        )
                      }  
                    </span>
                  </p>
                </>
              )
            }
          </div>
        </div>
      </div>

    </section>
  )
}
