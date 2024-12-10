import {create} from 'zustand'
import { SeasonType, SeasonDetails } from '@/app/lib/MoviesOrTVshowsInfoContextType_tvshows'


const useSeasonsStore = 
create<SeasonStore>( set => ({
  options: [],
  setOptions: (options) => set(_ => ({options})),

  isVisibleSelectSeason: false,//to be set to false
  setIsVisibleSelectSeason: (isVisibleSelectSeason) => set(_ => ({isVisibleSelectSeason}) ),
  
  isVisibleSeasons: false,
  setIsVisibleSeasons: (isVisibleSeasons) => set(_ => ({isVisibleSeasons}) ),

  selectedSeason: null,
  setSelectedSeason: (selectedSeason) => set(_ => ({selectedSeason})),

  seasonDetails: null,
  setSeasonDetails: (seasonDetails) => set(_ => ({seasonDetails})),

  showEpisodeCastOrCrew: {
    isVisibleEpisodeCastOrCrew: false,
    episodeCastOrCrew: []
  },
  setShowEpisodeCastOrCrew: (showEpisodeCastOrCrew) => set(_ => ({showEpisodeCastOrCrew}))
}))


export default useSeasonsStore


type SeasonStore = {
  options: SeasonType[],
  setOptions: (options: SeasonType[]) => void,

  isVisibleSelectSeason: boolean,
  setIsVisibleSelectSeason: (isVisibleSelectSeason: boolean) => void
  
  isVisibleSeasons: boolean,
  setIsVisibleSeasons: (isVisibleSeasons: boolean) => void

  selectedSeason: SeasonType | null
  setSelectedSeason: (selectedSeason: SeasonType | null) => void

  seasonDetails: SeasonDetails | null
  setSeasonDetails: (seasonDetails: SeasonDetails | null) => void

  showEpisodeCastOrCrew: ShowEpisodeCastOrCrew
  setShowEpisodeCastOrCrew: (showEpisodeCastOrCrew: ShowEpisodeCastOrCrew) => void
}


type ShowEpisodeCastOrCrew = {
  isVisibleEpisodeCastOrCrew: boolean,
  episodeCastOrCrew: 
    | SeasonDetails['episodes'][number]['crew'] 
    | SeasonDetails['episodes'][number]['guest_stars']
}
