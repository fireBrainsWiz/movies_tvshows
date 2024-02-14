'use client'

import { createContext, useEffect, useState, PropsWithChildren } from "react"

type CommonTypes = {
  CRIMEDRAMASCIFI: {
    crime: string,
    drama: string,
    mystery: string
  },
  INFO: {
    BEFOREAFTER: {
      beforeStr: string,
      afterStr: string
    }
    MAIN: {
      details:CommonTypes['INFO']['BEFOREAFTER'],
      credits: CommonTypes['INFO']['BEFOREAFTER'],
      contentRatings: CommonTypes['INFO']['BEFOREAFTER'],
      keywords: CommonTypes['INFO']['BEFOREAFTER'],
      recommendations: CommonTypes['INFO']['BEFOREAFTER'],
      similar: CommonTypes['INFO']['BEFOREAFTER'],
      personDetails: CommonTypes['INFO']['BEFOREAFTER'],
      images: CommonTypes['INFO']['BEFOREAFTER'],
    }
  }
}

export type _Movies = {
  MEDIATYPE: string,

  TOPLINKS: {
    NOWPLAYING: string,
    POPULAR: string,
    TOPRATED: string,
    UPCOMING: string
  },

  CRIMEDRAMASCIFI: CommonTypes['CRIMEDRAMASCIFI'],
  
  TRAILERS: string,

  INFOS: CommonTypes['INFO']['MAIN']
}

export type _TVshows = {
  MEDIATYPE: string,

  TOPLINKS: {
    AIRINGTODAY: string,
    ONTHEAIR: string,
    POPULAR: string,
    TOPRATED: string
  },

  CRIMEDRAMASCIFI: CommonTypes['CRIMEDRAMASCIFI'],

  TRAILERS: string,

  INFOS: CommonTypes['INFO']['MAIN'],

}

// 'https://api.themoviedb.org/3/tv/82856?language=en-US'
// 'https://api.themoviedb.org/3/tv/82856/credits?language=en-US',
// 'https://api.themoviedb.org/3/tv/82856/content_ratings'

const allLinks = {
  _tvshows : {
    MEDIATYPE: 'tvshow',

    TOPLINKS: {
      AIRINGTODAY: 'https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=',
      ONTHEAIR: 'https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=',
      POPULAR: 'https://api.themoviedb.org/3/tv/popular?language=en-US&page=',
      TOPRATED: 'https://api.themoviedb.org/3/tv/top_rated?language=en-US&page='
    },

    CRIMEDRAMASCIFI: {
      crime: `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&sort_by=popularity.desc&with_genres=80&page=`,
  
      drama: `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&sort_by=popularity.desc&with_genres=18&page=`,
  
      mystery: `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&sort_by=popularity.desc&with_genres=9648&page=`,
    },

    TRAILERS: 'https://api.themoviedb.org/3/tv/',

    INFOS: {
      details: {
        beforeStr: 'https://api.themoviedb.org/3/tv/',
        afterStr: '?language=en-US'
      },
      credits: {
        beforeStr: 'https://api.themoviedb.org/3/tv/',
        afterStr: '/credits?language=en-US'
      },
      contentRatings: {
        beforeStr: 'https://api.themoviedb.org/3/tv/',
        afterStr: '/content_ratings'
      },
      keywords: {
        beforeStr: 'https://api.themoviedb.org/3/tv/',
        afterStr: '/keywords'
      },
      recommendations: {
        beforeStr: 'https://api.themoviedb.org/3/tv/',
        afterStr: '/recommendations?language=en-US&page='
      },
      similar: {
        beforeStr: 'https://api.themoviedb.org/3/tv/',
        afterStr: '/similar?language=en-US&page='
      },
      personDetails: {
        beforeStr: 'https://api.themoviedb.org/3/person/',
        afterStr: '?language=en-US'
      },
      images: {
        beforeStr: 'https://api.themoviedb.org/3/tv/',
        afterStr: '/images'
      }
    }


  },


  _movies: {
    MEDIATYPE: 'movie',
    
    TOPLINKS: {
      NOWPLAYING: 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=',
      POPULAR: 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=',
      TOPRATED: 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=',
      UPCOMING: 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page='
    },

    CRIMEDRAMASCIFI: {
      crime: `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&with_genres=80&page=`,

      drama: `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&with_genres=18&page=`,

      mystery: `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&with_genres=9648&page=`,
    },

    TRAILERS: 'https://api.themoviedb.org/3/movie/',

    INFOS: {
      details: {
        beforeStr: 'https://api.themoviedb.org/3/movie/',
        afterStr: '?language=en-US'
      },
      credits: {
        beforeStr: 'https://api.themoviedb.org/3/movie/',
        afterStr: '/credits?language=en-US'
      },
      contentRatings: {
        beforeStr: 'https://api.themoviedb.org/3/movie/',
        afterStr: '/release_dates'
      },
      keywords: {
        beforeStr: 'https://api.themoviedb.org/3/movie/',
        afterStr: '/keywords'
      },
      recommendations: {
        beforeStr: 'https://api.themoviedb.org/3/movie/',
        afterStr: '/recommendations?language=en-US&page='
      },
      similar: {
        beforeStr: 'https://api.themoviedb.org/3/movie/',
        afterStr: '/similar?language=en-US&page='
      },
      personDetails: {
        beforeStr: 'https://api.themoviedb.org/3/person/',
        afterStr: '?language=en-US'
      },
      images: {
        beforeStr: 'https://api.themoviedb.org/3/movie/',
        afterStr: '/images'
      }
    }


  }

}


type MoviesOrTVshowsLinksContextType = {
  moviesOrTVshows: string,
  setMoviesOrTVshows: (moviesOrTVshows: string) => void,
  links: _TVshows | _Movies , 
  setLinks: (links: _TVshows | _Movies ) => void,
}

const defaultContextValue = {
  moviesOrTVshows: 'tvshows',
  setMoviesOrTVshows: (moviesOrTVshows: string) => {},
  links: {...allLinks._tvshows }, 
  setLinks: (links: _TVshows | _Movies ) => {},
}

const MoviesOrTVshowsLinksContext = 
  createContext<MoviesOrTVshowsLinksContextType>(defaultContextValue)

export function MoviesOrTVshowsLinksContextProvider({ 
  children 
}: PropsWithChildren<{}>) {

  const [moviesOrTVshows, setMoviesOrTVshows] = useState(defaultContextValue.moviesOrTVshows)
  const [links, setLinks] = useState<_TVshows | _Movies>({ ...allLinks._tvshows })
    
  const value = {
    moviesOrTVshows, setMoviesOrTVshows,
    links, setLinks
  }
  

  useEffect(() => {
    if (moviesOrTVshows === 'tvshows') {
      setLinks({ ...allLinks._tvshows })
    } else if (moviesOrTVshows === 'movies') {
      setLinks({ ...allLinks._movies })
    }
  }, [moviesOrTVshows])
  
  return (
    <MoviesOrTVshowsLinksContext.Provider value={value}>
      {children}
    </MoviesOrTVshowsLinksContext.Provider>
  )
}

export default MoviesOrTVshowsLinksContext

