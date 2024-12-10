import MoviesOrTVshowsLinksContext from "@/app/(__pages__)/context/MoviesOrTVshowsLinksContext"
import { TMDBOptions } from "@/app/client/helpers/TMDB_API"
import { CommonTypes } from "@/app/lib/MediaTypeInfoTypes"
import { ImagePath, PLACEHOLDER_IMAGE } from "@/app/lib/types"
import axios from "axios"
import Image from "next/image"
import { useContext, useEffect, useState } from "react"


export default function WatchProviders({
  cardId
}: {
  cardId: number
}) {
  const { links } = useContext(MoviesOrTVshowsLinksContext)
  const [results, setResults] = useState<Result[]>([])
  const [activeOption, setActiveOption] = useState({} as typeof results[0])
  const [availableRegions, setAvailableRegions] = useState<AvailableRegions | null>(null)


  function selectOptionChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const key = e?.target?.value
    const option = results.find((result) => result.key === key)
    setActiveOption( option || {} as typeof results[0])
  } 

  useEffect(() => {
    (async () => {
      try {
        if (!cardId) return

        const { data }: { data: CommonTypes['watchProviders'] } =
          await axios(
            `${links.INFOS.watchProviders.beforeStr}${cardId}${links.INFOS.watchProviders.afterStr}`,
          TMDBOptions
        )

        const availableRegions = await axios(
          'https://api.themoviedb.org/3/watch/providers/regions?language=en-US',
          TMDBOptions
        ).then((res) => res.data)


        const keys = Object.keys(data.results)
        const values = Object.values(data.results)

        const _results = keys.map((key, i) => ({
          key,
          value: values[i]
        }))

        setResults(
          _results
        )

        setActiveOption(
          _results[0]
        )

        setAvailableRegions(availableRegions)

      }catch (error) {
        console.error(error)
      }
    })()
  }, [ 
    links.INFOS.watchProviders.beforeStr,links.INFOS.watchProviders.afterStr, cardId,
  ])


  if (!results?.[0]?.value.buy && !results?.[0]?.value.flatrate && !results?.[0]?.value.rent) return null

  return (
    <div className='bg-red-500p w-full h-1/2 my-40 relative'>
      <p className="my-5 text-3xl text-center">Where to watch</p>
      <div className=''>
        <div className="flex items-center bg-stone-600 w-[95%] mx-auto rounded-t-2xl overflow-hidden divide-x divide-stone-900">
          <div className='p-3'>
            <span className="border-b border-gray-500 flex gap-2">
              <span>Region</span>
              {
                activeOption?.key && (
                  <Image 
                    src={`https://flagsapi.com/${activeOption.key}/flat/32.png`} 
                    width={32}
                    height={32}
                    alt={activeOption.key + "'s flag"}
                  />
                )
              }
            </span>
          </div>

          <select 
            name="watch-provider" 
            id="watch-provider"
            className="bg-stone-600 w-full p-3 mr-2 text-center text-xl outline-none"
            onChange={selectOptionChange}
          >
            {
              results.map(({key}, i) => (
                <WatchProviderSelectOption 
                  key={i} 
                  value={key} 
                  availableRegions={availableRegions}
                />
              ))
            }
          </select>
        </div>

        <div>
          <WatchProviderContent result={activeOption} />
        </div>
      </div>
    </div>
  )
}


function WatchProviderSelectOption({
  value,
  availableRegions
}: {
  value: string
  availableRegions: AvailableRegions | null
}) {
  return (
    <option value={value}>
      {
        (availableRegions?.results
          .find((region) => region.iso_3166_1 === value)?.native_name 
          || value
        )
      }
    </option>
  )
}



function WatchProviderContent({
  result
}: {
  result: Result
}) {

  return (
    <div className="bg-stone-500p w-[95%] h-1/2 my-4 mx-auto ">
      <div className="bg-stone-900  flex divide-x divide-stone-900 rounded-b-2xl overflow-hidden">
        {
          result?.value?.flatrate && (
            <div className="bg-stone-600 min-h-[200px] w-full">
              <p className="text-center text-xl py-4">Flatrate</p>
              <div className="flex flex-wrap justify-center gap-4 p-4 max-h-[300px] overflow-y-auto">
                {
                  result.value.flatrate.map((provider, i) => (
                    <Provider key={i} provider={provider} />
                  ))
                }
              </div> 
            </div>
          )
        }
        {
          result?.value?.rent && (
            <div className="bg-stone-600 min-h-[200px] w-full">
              <p className="text-center text-xl py-4">Rent</p>
              <div className="flex flex-wrap justify-center gap-4 p-4 max-h-[300px] overflow-y-auto">
                {
                  result.value.rent.map((provider, i) => (
                    <Provider key={i} provider={provider} />
                  ))
                }
              </div> 
            </div>
          )
        }
        {
          result?.value?.buy && (
            <div className="bg-stone-600 min-h-[200px] w-full">
              <p className="text-center text-xl py-4">Buy</p>
              <div className="flex flex-wrap justify-center gap-4 p-4 max-h-[300px] overflow-y-auto">
                {
                  result.value.buy.map((provider, i) => (
                    <Provider key={i} provider={provider} />
                  ))
                }
              </div> 
            </div>
          )
        }
      </div>

    </div> 
  )
}

function Provider({
  provider
}: {
  provider: {
    logo_path: string;
    provider_id: number;
    provider_name: string;
    display_priority: number
  }
}) {
  const [hasFailedImage, setHasFailedImage] = useState(false)
  
  return (
    <div className="border border-gray-500 flex flex-col items-center p-6 py-2 gap-2 rounded-[15px] relative">
      <div>
        <Image 
          src={
            hasFailedImage 
            ? '/no-image-1.webp'
            : provider?.logo_path 
              ? ImagePath+provider.logo_path 
              : '/no-image-1.webp'
          } 
          alt={provider.provider_name || 'provider image'} 
          width={100} 
          height={100} 
          placeholder="blur"
          blurDataURL={PLACEHOLDER_IMAGE.TMDB_IMAGE}
          onError={() => setHasFailedImage(true)}
          className="max-w-full h-auto object-contain rounded-full border-2 border-gray-500"
        />
      </div>

      <p>
        {provider.provider_name}
      </p>

      <span className="bg-stone-600 absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 text-sm py-4">
        {provider.display_priority}
      </span>
    </div>
  )
}


type Result = {
  key: string,
  value: CommonTypes['watchProviders']['results'][0]
}


type AvailableRegions = {
  results: {
    iso_3166_1: string;
    english_name: string;
    native_name: string
  }[]
}



{/* <img src="https://flagsapi.com/:country_code/:style/:size.png"> */}

