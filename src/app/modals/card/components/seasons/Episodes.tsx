import CardBeingViewedContext from "@/app/(__pages__)/context/CardBeingViewedContext"
import useSeasonsStore from "@/app/(__pages__)/stores/seasons-store/seasons-store"
import { TMDBOptions } from "@/app/client/helpers/TMDB_API"
import axios from "axios"
import { useContext, useEffect } from "react"
import Episode from "./Episode"



export default function Episodes({
  forSmallScreen
}: {
  forSmallScreen: boolean
}) {
  const {
    isVisibleSeasons, setIsVisibleSeasons, selectedSeason,
    seasonDetails, setSeasonDetails
  } = useSeasonsStore()
  const {card} = useContext(CardBeingViewedContext)


  useEffect(() => {
    async function getSeasinDetails() {
      if (!isVisibleSeasons || !selectedSeason || !card?.id) return

      try {
        const data: typeof seasonDetails = await axios(`
          https://api.themoviedb.org/3/tv/${card.id}/season/${selectedSeason.season_number}?language=en-US
          `, TMDBOptions
        ).then(res => res.data)
        setSeasonDetails(data)
      } catch (error) {
        console.log(error)
      }
    }
    getSeasinDetails()

  }, [isVisibleSeasons, selectedSeason, card?.id])

  
  return (
    seasonDetails && (
      <div>
        {
          seasonDetails.episodes.map((episode, i) => (
            // i === 3 &&
            <Episode
              key={i}
              episode={episode} 
              forSmallScreen={forSmallScreen}
            />  
          ))
        }
      </div>
    )
  )

}
