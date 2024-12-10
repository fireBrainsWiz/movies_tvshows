'use client'

import { createContext, useEffect, useState, PropsWithChildren } from "react"

type CommonTypes = {
  CRIMEDRAMASCIFI: {
    crime: string,
    drama: string,
    mystery: string
  },
  INFOS: {
    BEFOREAFTER: {
      beforeStr: string,
      afterStr: string
    }
    MAIN: {
      details:CommonTypes['INFOS']['BEFOREAFTER'],
      credits: CommonTypes['INFOS']['BEFOREAFTER'],
      contentRatings: CommonTypes['INFOS']['BEFOREAFTER'],
      keywords: CommonTypes['INFOS']['BEFOREAFTER'],
      recommendations: CommonTypes['INFOS']['BEFOREAFTER'],
      similar: CommonTypes['INFOS']['BEFOREAFTER'],
      images: CommonTypes['INFOS']['BEFOREAFTER'],
      review: CommonTypes['INFOS']['BEFOREAFTER'],
      watchProviders: CommonTypes['INFOS']['BEFOREAFTER'],
      personDetails: CommonTypes['INFOS']['BEFOREAFTER'],
      personMovieCredits: CommonTypes['INFOS']['BEFOREAFTER'],
      personTVshowCredits: CommonTypes['INFOS']['BEFOREAFTER'],
    }
  }
}

export type _Movies = {
  MEDIATYPE: string,
  TRENDING: string,
  LATEST: string,

  TOPLINKS: {
    NOWPLAYING: string,
    POPULAR: string,
    TOPRATED: string,
    UPCOMING: string
    DISCOVER: string
  },

  CRIMEDRAMASCIFI: CommonTypes['CRIMEDRAMASCIFI'],
  TRAILERS: string,
  INFOS: CommonTypes['INFOS']['MAIN']
}

export type _TVshows = {
  MEDIATYPE: string,
  TRENDING: string,
  LATEST: string,

  TOPLINKS: {
    AIRINGTODAY: string,
    ONTHEAIR: string,
    POPULAR: string,
    TOPRATED: string
    DISCOVER: string
  },

  CRIMEDRAMASCIFI: CommonTypes['CRIMEDRAMASCIFI'],
  TRAILERS: string,
  INFOS: CommonTypes['INFOS']['MAIN'],

}

// 'https://api.themoviedb.org/3/tv/82856?language=en-US'
// 'https://api.themoviedb.org/3/tv/82856/credits?language=en-US',
// 'https://api.themoviedb.org/3/tv/82856/content_ratings'

const allLinks = {
  _tvshows : {
    MEDIATYPE: 'tvshow',
    TRENDING: 'https://api.themoviedb.org/3/trending/tv/day?language=en-US',
    LATEST: 'https://api.themoviedb.org/3/tv/latest',

    TOPLINKS: {
      POPULAR: 'https://api.themoviedb.org/3/tv/popular?language=en-US&page=',
      TOPRATED: 'https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=',
      AIRINGTODAY: 'https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=',
      ONTHEAIR: 'https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=',
      DISCOVER: 'https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc'
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
      images: {
        beforeStr: 'https://api.themoviedb.org/3/tv/',
        afterStr: '/images'
      },
      review: {
        beforeStr: 'https://api.themoviedb.org/3/tv/',
        afterStr: '/reviews?language=en-US&page='
      },
      watchProviders: {
        beforeStr: 'https://api.themoviedb.org/3/tv/',
        afterStr: '/watch/providers'
      },
      personDetails: {
        beforeStr: 'https://api.themoviedb.org/3/person/',
        afterStr: '?language=en-US'
      },
      personTVshowCredits: {
        beforeStr: 'https://api.themoviedb.org/3/person/',
        afterStr: '/tv_credits'
      },
      personMovieCredits: {
        beforeStr: 'https://api.themoviedb.org/3/person/',
        afterStr: '/movie_credits'
      }
    }


  },


  _movies: {
    MEDIATYPE: 'movie',
    TRENDING: 'https://api.themoviedb.org/3/trending/movie/day?language=en-US', 
    LATEST: 'https://api.themoviedb.org/3/movie/latest',
    
    TOPLINKS: {
      POPULAR: 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=',
      TOPRATED: 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=',
      UPCOMING: 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=',
      NOWPLAYING: 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=',
      DISCOVER: 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc'
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
      images: {
        beforeStr: 'https://api.themoviedb.org/3/movie/',
        afterStr: '/images'
      },
      review: {
        beforeStr: 'https://api.themoviedb.org/3/movie/',
        afterStr: '/reviews?language=en-US&page='
      },
      watchProviders: {
        beforeStr: 'https://api.themoviedb.org/3/movie/',
        afterStr: '/watch/providers'
      },
      personDetails: {
        beforeStr: 'https://api.themoviedb.org/3/person/',
        afterStr: '?language=en-US'
      },
      personTVshowCredits: {
        beforeStr: 'https://api.themoviedb.org/3/person/',
        afterStr: '/tv_credits'
      },
      personMovieCredits: {
        beforeStr: 'https://api.themoviedb.org/3/person/',
        afterStr: '/movie_credits'
      }
    }


  }

}


type MoviesOrTVshowsLinksContextType = {
  moviesOrTVshows: 'movie' | 'tvshow',
  setMoviesOrTVshows: (moviesOrTVshows: 'movie' | 'tvshow') => void,
  links: _TVshows | _Movies , 
  setLinks: (links: _TVshows | _Movies ) => void,
}

const defaultContextValue = {
  moviesOrTVshows: 'tvshow' as 'movie' | 'tvshow',
  setMoviesOrTVshows: (moviesOrTVshows: 'movie' | 'tvshow') => {},
  links: {...allLinks._tvshows }, 
  setLinks: (links: _TVshows | _Movies ) => {},
}

const MoviesOrTVshowsLinksContext = 
  createContext<MoviesOrTVshowsLinksContextType>(defaultContextValue)

export function MoviesOrTVshowsLinksContextProvider({ 
  children 
}: PropsWithChildren<{}>) {

  const [moviesOrTVshows, setMoviesOrTVshows] = useState<'movie' | 'tvshow'>('tvshow')
  const [links, setLinks] = useState<_TVshows | _Movies>({ ...allLinks._tvshows })
    
  const value = {
    moviesOrTVshows, setMoviesOrTVshows,
    links, setLinks
  }
  

  useEffect(() => {
    if (moviesOrTVshows === 'tvshow') {
      setLinks({ ...allLinks._tvshows })
    } else if (moviesOrTVshows === 'movie') {
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

