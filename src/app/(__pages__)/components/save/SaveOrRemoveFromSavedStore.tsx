import { SeasonDetails } from "@/app/lib/MoviesOrTVshowsInfoContextType_tvshows";
import useSavedStorePersist from "@/app/(__pages__)/stores/saved-store/saved-store-persist";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { MdPlaylistAddCheck } from "react-icons/md";
import { SeasonType } from "@/app/lib/MoviesOrTVshowsInfoContextType_tvshows";
import { ResultType } from "@/app/lib/types";
import toast from "react-hot-toast";


export function SaveOrRemoveFromSavedStore({
  item,
  whatToAlter,
  iconOlnly,
  iconSize
}: {
  item: 
    | SeasonDetails['episodes'][number] 
    | SeasonType & {show_id: number}
    | ResultType & {show_id: number, media_type: string}
  whatToAlter: 'movie_tvshow' | 'season' | 'episode'
  iconOlnly?: boolean
  iconSize?: number
}) {

  const {
    allEpisodes, addToSavedEpisodes, removeFromSavedEpisodes,
    allMoviesOrTVshows, addToSavedMoviesOrTvshows, removeFromSavedMoviesOrTvshows,
    allSeasons, addToSavedSeasons, removeFromSavedSeasons
  } = useSavedStorePersist()


  function addToSaved() {
    if (whatToAlter === 'episode') {
      if (!('still_path' in item)) return
      addToSavedEpisodes({
        [`${item.show_id}_${item.season_number}_${item.episode_number}`]: {
          show_id: item.show_id,
          season_number: item.season_number,
          episode_number: item.episode_number,
          episode_type: item.episode_type
        }
      })

    } else if (whatToAlter === 'season') {
      if (!('episode_count' in item)) return
      addToSavedSeasons({
        [`${item.show_id}_${item.season_number}`]: {
          show_id: item.show_id,
          season_number: item.season_number
        }
      })
      
    } else if (whatToAlter === 'movie_tvshow') {
      if (!('media_type' in item)) return
      addToSavedMoviesOrTvshows({
        [`${item.show_id}_${item.media_type}`]: {
          show_id: item.show_id,
          media_type: item.media_type
        }
      })
    }

    const toastMsg = 
    whatToAlter === 'movie_tvshow' && 'media_type' in item &&
    item.media_type === 'movie' 
    ? 'movie' 
    : whatToAlter === 'movie_tvshow' && 'media_type' in item && 
    item.media_type === 'tvshow' 
      ? 'tvshow' 
      : whatToAlter
    ;

    toast.success(`${toastMsg} successfully saved`)
  }

  function removeFromSaved() {

    if (whatToAlter === 'episode') {
      if (!('still_path' in item)) return
      removeFromSavedEpisodes(
        `${item.show_id}_${item.season_number}_${item.episode_number}`
      )
      } else if (whatToAlter === 'season') {
      if (!('episode_count' in item)) return
      removeFromSavedSeasons(
        `${item.show_id}_${item.season_number}`
      )
    } else if (whatToAlter === 'movie_tvshow') {
      if (!('media_type' in item)) return
      removeFromSavedMoviesOrTvshows(
        `${item.show_id}_${item.media_type}`
      )
    }


    const toastMsg = 
    whatToAlter === 'movie_tvshow' && 'media_type' in item &&
    item.media_type === 'movie' 
    ? 'movie' 
    : whatToAlter === 'movie_tvshow' && 'media_type' in item && 
    item.media_type === 'tvshow' 
      ? 'tvshow' 
      : whatToAlter
    ;

    toast.success(`${toastMsg} removed successfully`)
  }

// console.log({item})


  return (
    <div className="[@media(max-width:640px)]:scale-75 origin-left">
      {
        whatToAlter === 'episode' && ('still_path' in item) && (
          allEpisodes[`${item.show_id}_${item.season_number}_${item.episode_number}`]
          ? (
            <button onClick={removeFromSaved}
              className="grid grid-flow-col items-center gap-[4px] ">
              <MdPlaylistAddCheck size={iconSize || 40} />
              {
                !iconOlnly && (
                  <span>List</span>
                )
              }
            </button>
          )
          : (
            <button onClick={addToSaved} className="grid grid-flow-col items-center gap-[4px]">
              <MdOutlinePlaylistAdd size={iconSize || 40} />
              {
                !iconOlnly && (
                  <span>List</span>
                )
              }
            </button>
          )
        )
      }

      {
        whatToAlter === 'season' && ('episode_count' in item) && (
          allSeasons[`${item.show_id}_${item.season_number}`]
          ? (
            <button onClick={removeFromSaved}
              className="grid grid-flow-col items-center gap-[4px] ">
              <MdPlaylistAddCheck size={iconSize || 40} />
              {
                !iconOlnly && (
                  <span>List</span>
                )
              }
            </button>
          )
          : (
            <button onClick={addToSaved} className="grid grid-flow-col items-center gap-[4px] ">
              <MdOutlinePlaylistAdd size={iconSize || 40} />
              {
                !iconOlnly && (
                  <span>List</span>
                )
              }
            </button>
          )
        )
      }

      {
        whatToAlter === 'movie_tvshow' && ('genre_ids' in item) && (
          allMoviesOrTVshows[`${item.show_id}_${item.media_type}`]
          ? (
            <button onClick={removeFromSaved}
              className="grid grid-flow-col items-center gap-[4px] ">
              <MdPlaylistAddCheck size={iconSize || 40} />
              {
                !iconOlnly && (
                  <span>List</span>
                )
              }
            </button>
          )
          : (
            <button onClick={addToSaved} className="grid grid-flow-col items-center gap-[4px] ">
              <MdOutlinePlaylistAdd size={iconSize || 40} />
              {
                !iconOlnly && (
                  <span>List</span>
                )
              }
            </button>
          )
        )
      }
    </div>
  );
}