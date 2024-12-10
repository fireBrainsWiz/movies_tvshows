import useSavedStorePersist from "@/app/(__pages__)/stores/saved-store/saved-store-persist";
import { SelectedItemType } from "./SavedItems";
import { useEffect, useState } from "react";
import axios from "axios";
import { TMDBOptions } from "@/app/client/helpers/TMDB_API";
import { SeasonDetails } from "@/app/lib/MoviesOrTVshowsInfoContextType_tvshows";
import { MovieDetails } from "@/app/lib/MoviesOrTVshowsInfoContextType_movies";
import { TVshowsDetails } from "@/app/lib/MoviesOrTVshowsInfoContextType_tvshows";
import SavedEpisode from "./SavedEpisode";
import SavedSeason from "./SavedSeason";
import Result from "@/app/(__pages__)/components/Result";
import { ResultType } from "@/app/lib/types";


export function WhatToDisplay({
  selectedItem, searchTerm
}: {
  selectedItem: SelectedItemType;
  searchTerm: string;
}) {

  const {allEpisodes, allSeasons, allMoviesOrTVshows} = useSavedStorePersist()
  // console.log({allEpisodes}, {allSeasons}, {allMoviesOrTVshows})


  const [allEpisodesToDisplay, setAllEpisodesToDisplay] = 
  useState<SeasonDetails['episodes']>([])

  const [allSeasonsToDisplay, setAllSeasonsToDisplay] = 
  useState<(SeasonDetails & {show_id: number, show_name: string})[]>([])

  const [allMoviesToDisplay, setAllMoviesToDisplay] = 
  useState<(MovieDetails & {show_id: number, media_type: string})[]>([])

  const [allTVshowsToDisplay, setAllTVshowsToDisplay] = 
  useState<(TVshowsDetails & {show_id: number, media_type: string})[]>([])

  const [forSmallScreen, setForSmallScreen] = useState(false)
  
  let filteredAllEpisodesToDisplay: typeof allEpisodesToDisplay = []
  let filteredAllSeasonsToDisplay:  typeof allSeasonsToDisplay = []
  let filteredAllMoviesToDisplay:   typeof allMoviesToDisplay = []
  let filteredAllTVshowsToDisplay:  typeof allTVshowsToDisplay = []

  if (selectedItem === 'season' ) {
    filteredAllSeasonsToDisplay = allSeasonsToDisplay 
    .filter(season => (
      season.show_name.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
      season.name.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
      season.overview.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
      season.air_date.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
      season.season_number.toString().toLowerCase().includes(searchTerm.trim().toLowerCase())
    ))

    // console.log(filteredAllSeasonsToDisplay, searchTerm.trim().toLowerCase())

  } else if (selectedItem === 'episode') {
    filteredAllEpisodesToDisplay = allEpisodesToDisplay 
    .filter(episode => (
      episode.name.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
      episode.overview.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
      episode.air_date.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
      episode.episode_number.toString().toLowerCase().includes(searchTerm.trim().toLowerCase())
    ))
  } else if (selectedItem === 'movie') {
    filteredAllMoviesToDisplay = allMoviesToDisplay 
    .filter(movie => (
      movie.title.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
      movie.overview.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
      movie.release_date.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
      movie.status.toLowerCase().includes(searchTerm.trim().toLowerCase())
    ))
  } else {
    filteredAllTVshowsToDisplay = allTVshowsToDisplay 
    .filter(tvshow => (
      tvshow.name.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
      tvshow.overview.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
      tvshow.first_air_date?.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
      tvshow.status.toLowerCase().includes(searchTerm.trim().toLowerCase())
    ))
  }

//media query
  useEffect(() => {
    let mediaQuery = window.matchMedia(`(min-width: 1000px)`)//md
    
    function my() {
      if (mediaQuery.matches) {
        setForSmallScreen(false)
      } else {
        setForSmallScreen(true)
      }
    }
    my()

    mediaQuery.addEventListener('change', my)
    return () => mediaQuery.addEventListener('change', my)
  }, [])

  useEffect(() => {
    if (!allMoviesOrTVshows) return

    const _allMovies: typeof allMoviesToDisplay = []
    const _allTVshows: typeof allTVshowsToDisplay = []

    async function getAllMovieDetails(savedMovieOrTVshow: typeof allMoviesOrTVshows[number]) {
      try {
        if (!savedMovieOrTVshow) return
        // console.log('1', savedMovieOrTVshow)

        
        const data: typeof allMoviesToDisplay[number] = 
        await axios(`
          https://api.themoviedb.org/3/movie/${savedMovieOrTVshow.show_id}?language=en-US
          `, TMDBOptions
        ).then(res => {
          return res.data
        })
        _allMovies.push({
          ...data, 
          show_id: data.id,
          media_type: savedMovieOrTVshow.media_type
        })

      } catch (error) {
        console.log('1', error)
      } finally {
        if (
          Object.values(allMoviesOrTVshows)
          .filter(item => item.media_type === 'movie').length === _allMovies.length
        ) {
          setAllMoviesToDisplay(_allMovies)
        }
      }
    }

    async function getAllTVshowDetails(savedMovieOrTVshow: typeof allMoviesOrTVshows[number]) {
      try {
        if (!savedMovieOrTVshow ) return
        // console.log('2', savedMovieOrTVshow)

        const data: typeof allTVshowsToDisplay[number] = 
        await axios(`
          https://api.themoviedb.org/3/tv/${savedMovieOrTVshow.show_id}?language=en-US
          `, TMDBOptions
        ).then(res => {
          return res.data
        })
        // setAllTVshowsToDisplay(prev => [...prev, data])
        _allTVshows.push({
          ...data, 
          show_id: data.id,
          media_type: savedMovieOrTVshow.media_type
        })

      } catch (error) {
        console.log('2', error)
      } finally {
        if (
          Object.values(allMoviesOrTVshows)
          .filter(item => item.media_type === 'tvshow').length === _allTVshows.length
        ) {
          setAllTVshowsToDisplay(_allTVshows)
        }
      }
    }


    for (const savedMovieOrTVshow in allMoviesOrTVshows) {
      
      if(allMoviesOrTVshows[savedMovieOrTVshow].media_type === 'tvshow') {
        getAllTVshowDetails(allMoviesOrTVshows[savedMovieOrTVshow])
        
      } else {
        getAllMovieDetails(allMoviesOrTVshows[savedMovieOrTVshow])
      }
    }
    
  }, [allMoviesOrTVshows])

  useEffect(() => {
    if (!allEpisodes) return
    const _allEpisodes: typeof allEpisodesToDisplay = []

    async function getAllAllEpisodes(savedEpisode: typeof allEpisodes[number]) {
      if (!savedEpisode.show_id) return
      
      try {
        const data: typeof allEpisodesToDisplay[number] = 
        await axios(`
          https://api.themoviedb.org/3/tv/${savedEpisode.show_id}/season/${savedEpisode.season_number}/episode/${savedEpisode.episode_number}?language=en-US
          `, TMDBOptions
        ).then(res => {
          return res.data
        })
        _allEpisodes.push({
          ...data, 
          show_id: savedEpisode.show_id,
          episode_type: savedEpisode.episode_type
        })
      } catch (error) {
        console.log(error)
      } finally {
        if (Object.values(allEpisodes).length === _allEpisodes.length) {
          setAllEpisodesToDisplay(_allEpisodes)
        }
      }
    }


    for (const savedEpisode in allEpisodes) {
      getAllAllEpisodes(allEpisodes[savedEpisode])
    }
    
  }, [allEpisodes])

  useEffect(() => {
    if (!allSeasons) return

    const _allSeasons: typeof allSeasonsToDisplay = []

    async function getAllAllSeasons(savedSeason: typeof allSeasons[number]) {
      
      try {
        if (!savedSeason) return

        const show: TVshowsDetails = await axios(`
          https://api.themoviedb.org/3/tv/${savedSeason.show_id}?language=en-US`, TMDBOptions
        ).then(res => res.data)
        
        const data: typeof allSeasonsToDisplay[number] = 
        await axios(`
          https://api.themoviedb.org/3/tv/${savedSeason.show_id}/season/${savedSeason.season_number}?language=en-US
          `, TMDBOptions
        ).then(res => {
          // console.log(res.data)
          return res.data
        })

        _allSeasons.push({...data, show_id: savedSeason.show_id, show_name: show.name})

      } catch (error) {
        console.log(error)
      } finally {
        if (Object.values(allSeasons).length === _allSeasons.length) {
          setAllSeasonsToDisplay(_allSeasons)
        }
      }
    }

    for (const savedSeason in allSeasons) {
      getAllAllSeasons(allSeasons[savedSeason])
    }
    
  }, [allSeasons])



  if ( 
    Object.keys(allMoviesOrTVshows).length > 0  && 
      ![...allMoviesToDisplay, ...allTVshowsToDisplay].length ||
    Object.keys(allEpisodes).length > 0 && !allEpisodesToDisplay.length ||
    Object.keys(allSeasons).length > 0  && !allSeasonsToDisplay.length 
  ) {
    return (
      <div className="bg-rose-500/30p mt-10 min-h-[75vh] pt-12 sm:pt-0 overflow-x-hidden flex items-center justify-center">
          {/* <p className="text-2xl">No saved items</p> */}
          <p className="text-2xl animate-pulse dark:text-black font-bold italic">Loading...</p>
      </div>
    )
  }

  // console.log({allEpisodesToDisplay})
  // console.log({allSeasonsToDisplay})
  // console.log({allMoviesToDisplay})
  // console.log({allTVshowsToDisplay})
  // console.log('------------------------------------------------------------------------')

  
  
  return (
    <div className="bg-rose-500/30p mt-10 min-h-[75vh] pt-12 sm:pt-0 overflow-x-hidden">
      {
        searchTerm.trim() ? (
          selectedItem === 'episode' && 
          <>
            {
              filteredAllEpisodesToDisplay.length > 0
              ? filteredAllEpisodesToDisplay.map((episodeDetails, index) => {
                  return (
                    <SavedEpisode 
                      key={index} 
                      episode={episodeDetails} 
                      forSmallScreen={forSmallScreen} 
                    />
                  )
                })
              : <NoItemToView selectedItem="episode" searchTerm={searchTerm}/>
            }
          </>
          
        ) : (
          selectedItem === 'episode' && 
            <>
              {
                allEpisodesToDisplay.length > 0
                ? allEpisodesToDisplay.map((episodeDetails, index) => {
                    return (
                      <SavedEpisode 
                        key={index} 
                        episode={episodeDetails} 
                        forSmallScreen={forSmallScreen} 
                      />
                    )
                  })
                : <NoItemToView 
                  selectedItem="episode" 
                  searchTerm={searchTerm} 
                  actuallyNoItems
                />
              }
            </>
        )
      }

      {
        searchTerm.trim() ? (
          selectedItem === 'season' && 
          <>
            {
              filteredAllSeasonsToDisplay.length > 0
              ? filteredAllSeasonsToDisplay.map((seasonDetails, index) => {
                    return (
                      <SavedSeason 
                        key={index} 
                        seasonDetails={seasonDetails} 
                        forSmallScreen={forSmallScreen} 
                      />
                    ) 
                  })
              : <NoItemToView selectedItem="season" searchTerm={searchTerm}/>
            }
          </>

        ) : (
            selectedItem === 'season' && 
            <>
              {
                allSeasonsToDisplay.length > 0
                ? allSeasonsToDisplay.map((seasonDetails, index) => {
                    return (
                      <SavedSeason 
                        key={index} 
                        seasonDetails={seasonDetails} 
                        forSmallScreen={forSmallScreen} 
                      />
                    )
                  })
                : <NoItemToView 
                  selectedItem="season" 
                  searchTerm={searchTerm}
                  actuallyNoItems
                />
              }
            </>
        )
      }

      <div className="bg-green-500/40p flex flex-wrap gap-4 justify-center">
        {
          searchTerm.trim() ? (
            selectedItem === 'movie' && 
              <>
                {
                  filteredAllMoviesToDisplay.length > 0
                  ? filteredAllMoviesToDisplay.map((movieDetails, index) => {
                      return <SavedMovie 
                        key={index} 
                        movieDetails={movieDetails} 
                        forSmallScreen={forSmallScreen} 
                      />
                    })
                  : <NoItemToView selectedItem="movie" searchTerm={searchTerm}/>
                }
              </>

            ) : (
              selectedItem === 'movie' && 
                <>
                  {
                    allMoviesToDisplay.length > 0
                    ? allMoviesToDisplay.map((movieDetails, index) => {
                        return <SavedMovie 
                          key={index} 
                          movieDetails={movieDetails} 
                          forSmallScreen={forSmallScreen} 
                        />
                      })
                    : <NoItemToView 
                      selectedItem="movie" 
                      searchTerm={searchTerm}
                      actuallyNoItems
                    />
                  }
                </> 
            )
        }
      </div>

      <div className="bg-red-500p flex flex-wrap gap-4 justify-center">
        {
          searchTerm.trim() ? (
            selectedItem === 'tvshow' && 
              <>
                {
                  filteredAllTVshowsToDisplay.length > 0
                  ? filteredAllTVshowsToDisplay.map((tvshowDetails, index) => (
                    <SavedTVshow 
                      key={index} 
                      tvshowDetails={tvshowDetails} 
                      forSmallScreen={forSmallScreen} 
                    />
                  ))
                  : <NoItemToView selectedItem="tvshow" searchTerm={searchTerm}/>
                }
              </>

          ) : (
            selectedItem === 'tvshow' && 
              <>
                {
                  allTVshowsToDisplay.length > 0
                  ? allTVshowsToDisplay.map((tvshowDetails, index) => (
                    <SavedTVshow 
                      key={index} 
                      tvshowDetails={tvshowDetails} 
                      forSmallScreen={forSmallScreen} 
                    />
                  ))
                  : <NoItemToView 
                    selectedItem="tvshow" 
                    searchTerm={searchTerm}
                    actuallyNoItems
                  />
                }
              </>
          )
        }
      </div>
    </div>
  );
}





function SavedMovie({
  movieDetails,
  forSmallScreen,
}: {
  movieDetails: MovieDetails & {show_id: number, media_type: string}
  forSmallScreen: boolean
}) {

  const result: ResultType = {
    adult: movieDetails.adult,
    backdrop_path: movieDetails?.backdrop_path || movieDetails.poster_path || '/no-image-2.webp',
    genre_ids: movieDetails.genres.map(genre => genre.id),
    id: movieDetails.id,
    original_language: movieDetails.original_language,
    original_name: movieDetails.original_title,
    overview: movieDetails.overview,
    popularity: movieDetails.popularity,
    poster_path: movieDetails.poster_path || '/no-image-2.webp',
    first_air_date: movieDetails.release_date,
    title: movieDetails.title,
    name: movieDetails.title,
    vote_average: movieDetails.vote_average,
    vote_count: movieDetails.vote_count,
  }

  // const cardToSave: ResultType & {show_id: number, media_type: string} = {
  //   ...result, 
  //   show_id: movieDetails.id,
  //   media_type: movieDetails.media_type
  // }

  return (
    <Result item={result} media_type="movie"/>
  )
}


function SavedTVshow({
  tvshowDetails,
  forSmallScreen,
}: {
  tvshowDetails: TVshowsDetails & {show_id: number, media_type: string}
  forSmallScreen: boolean
}) {

  const result: ResultType = {
    id: tvshowDetails.id,
    name: tvshowDetails.name,
    overview: tvshowDetails.overview,
    first_air_date: tvshowDetails?.first_air_date || '',
    poster_path: tvshowDetails.poster_path,
    vote_average: tvshowDetails.vote_average,
    vote_count: tvshowDetails.vote_count,
    backdrop_path: tvshowDetails?.backdrop_path || '',
    genre_ids: tvshowDetails.genres.map(genre => genre.id),
    original_language: tvshowDetails.original_language,
    original_name: tvshowDetails.original_name,
    popularity: tvshowDetails.popularity,
    title: tvshowDetails.name,
    adult: tvshowDetails.adult,
    origin_country: tvshowDetails.origin_country,
  }

  // const cardToSave: ResultType & {show_id: number, media_type: string} = {
  //   ...result, 
  //   show_id: tvshowDetails.id,
  //   media_type: tvshowDetails.media_type
  // }

  return (
    <Result item={result} media_type="tvshow"/>
  )
}


function NoItemToView({
  selectedItem,
  searchTerm,
  actuallyNoItems
}: {
  selectedItem: SelectedItemType
  searchTerm: string;
  actuallyNoItems?: boolean
}) { 
  return (
    <div className="bg-rose-500/30p mt-10 min-h-[75vh] pt-12 sm:pt-0 overflow-x-hidden flex items-center justify-center w-full">
      {
        actuallyNoItems
        ? <p className="text-xl dark:text-black font-bold italic">
            No {selectedItem} available
          </p>
        : <p className="text-xl dark:text-black font-bold italic">
            No {selectedItem} available for  
            "<span className="text-lg text-rose-500">{searchTerm}</span>"
          </p>
      }
    </div>
  )
}
