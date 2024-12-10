import { create } from "zustand";
import { persist } from "zustand/middleware";


const useSavedStorePersist = create<SavedStorePersist>()(
  persist(
    (set, get): SavedStorePersist => ({
      allEpisodes: {},
      allSeasons: {},
      allMoviesOrTVshows: {},


      addToSavedEpisodes: (episodes) => set({ 
        allEpisodes: {...get().allEpisodes, ...episodes}
      }),
      addToSavedSeasons: (seasons) => set({ 
        allSeasons: {...get().allSeasons, ...seasons}
      }),
      addToSavedMoviesOrTvshows: (moviesOrTvs) => set({ 
        allMoviesOrTVshows: {...get().allMoviesOrTVshows, ...moviesOrTvs}
      }),

      removeFromSavedEpisodes: (key) => set(() => {
        const savedEpisodes = {...get().allEpisodes}
        delete savedEpisodes[key]
        return {
          allEpisodes: {...savedEpisodes}
        }
      }), 
      removeFromSavedSeasons: (key) => set(() => {
        const savedSeasons = {...get().allSeasons}
        delete savedSeasons[key]
        return {
          allSeasons: {...savedSeasons}
        }
      }),
      removeFromSavedMoviesOrTvshows: (key) => set(() => {
        const savedShows = {...get().allMoviesOrTVshows}
        delete savedShows[key]
        return {
          allMoviesOrTVshows: {...savedShows}
        }
      }),
      
    }),
    {
      name: "saved-store",
    }
  )
)

export default useSavedStorePersist

interface SavedStorePersist {
  allEpisodes: SavedEpisodes
  addToSavedEpisodes: (allEpisodes: SavedEpisodes) => void 
  removeFromSavedEpisodes: (key: string) => void

  allSeasons: SavedSeasons
  addToSavedSeasons: (allSeasons: SavedSeasons) => void
  removeFromSavedSeasons: (key: string) => void

  allMoviesOrTVshows: SavedMoviesOrTVshows
  addToSavedMoviesOrTvshows: (allMoviesOrTVshows: SavedMoviesOrTVshows) => void
  removeFromSavedMoviesOrTvshows: (key: string) => void
}

// 'https://api.themoviedb.org/3/tv/46952/season/1/episode/4?language=en-US'
// https://www.facebook.com/sharer.php?u=https://www.themoviedb.org/tv/82856


export type SavedMoviesOrTVshows = {
  [name: string]: {
    show_id: number,
    media_type: string
  }
}

export type SavedSeasons = {
  [name: string]: {
    show_id: number
    season_number: number
  }
}

export type SavedEpisodes = {
  [name: string]: {
    show_id: number
    season_number: number
    episode_number: number
    episode_type: string
  }
}