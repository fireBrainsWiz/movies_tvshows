'use client'

import { useContext, useEffect, useRef, useState, memo } from "react"
import ToggleSearchContext from "../../(__pages__)/context/ToggleSearchContext"
import { TfiClose } from "react-icons/tfi";
import { CiSearch } from "react-icons/ci";
import { RiMenu3Line } from "react-icons/ri";
import MoviesOrTVshowsLinksContext from "@/app/(__pages__)/context/MoviesOrTVshowsLinksContext";
import { TMDBOptions } from "@/app/client/helpers/TMDB_API";
import axios from "axios";
import ItemContainer from "./components/ItemContainer";


let timer: ReturnType<typeof setTimeout>, 
  inputChangeTimer: ReturnType<typeof setTimeout>
;


export default function Search() {
  
  const {isVisibleSearch, setIsVisibleSearch,} = useContext(ToggleSearchContext)

  const [searchTerm, setSearchTerm] = useState('blood')


  function handleCloseSearchClick() {
    setIsVisibleSearch(false)
  }

    // handle scroll
  useEffect(() => {
    const fn = () => {
      if (!isVisibleSearch) {
        return document.body.style.overflow = 'auto'
      } 

      document.body.style.overflow = 'hidden'
    }
    fn()

  }, [isVisibleSearch])

  // handle resize
  useEffect(() => {
    const fn = () => {
      let oldSearchTerm = searchTerm
      clearTimeout(timer)

      timer = setTimeout(() => {
        setSearchTerm('')
        setSearchTerm(oldSearchTerm)
      }, 100)
    }

    addEventListener('resize', fn)
    return () => {
      removeEventListener('resize', fn)
    }
  })

  if (!isVisibleSearch) return null
  
  return (
    <div 
      key={searchTerm}
      // key={searchTerm}
      className={`bg-stone-900/95 absolute w-full top-0 bottom-0 z-10 ${isVisibleSearch ? 'left-0' : 'left-[-100%]'} [transition:left_300ms_ease-in-out] overflow-hidden  min-h-screen `}
    >

      <div className="md:w-[90%] mx-auto  bg-[#a69f9f5b] rounded-lg  relative sm:mt-1  [@media(min-width:412px)]:py-0 ">

        {/* close button */}
        <div className=" flex justify-end">
          <button 
            className=" text-2xl  p-4 "
            onClick={handleCloseSearchClick}> 
            <TfiClose />
          </button>
        </div>
        <SearchBar 
          setSearchTerm={setSearchTerm}
          isvisibleSearch={isVisibleSearch}
        />
        <ResultOptions searchTerm={searchTerm}/>
      </div>
    </div>
  )
}


function SearchBar({
  isvisibleSearch, setSearchTerm
}: {
  isvisibleSearch: boolean,
  setSearchTerm: (value: string) => void
}) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const submitBtnRef = useRef<HTMLButtonElement | null>(null)

  const [searchText, setSearchText] = useState('')
  const [isFocusedInput, setIsFocusedInput] = useState(false)
  const [searchPhrase, setSearchPhrase] = useState('')

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value)

    clearTimeout(inputChangeTimer)
    inputChangeTimer = setTimeout(() => {
      setSearchPhrase(e.target.value)
    }, 300)
  }

  function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (searchText.trim()) setSearchTerm(searchText.trim())
  }

  useEffect(() => {
    const input = inputRef.current
    if (!input || !isvisibleSearch) return

    input.focus()
    const form = input.closest('form')
    if (!form) return
    const searchIcon = form.querySelector('svg')
    if (!searchIcon) return

    searchIcon.style.color = 'green'
    searchIcon.style.transform = 'scale(1.8)'
    setTimeout(() => {
      searchIcon.style.transform = 'scale(1)'
      searchIcon.style.color = 'white'
    }, 1000 * 6)


    // console.log(form.querySelector('svg'))
    
  }, [isvisibleSearch, inputRef])
  
  return (
    <div>
      <form onSubmit={onFormSubmit}
      className="search-form grid grid-cols-[10%_80%] xs:grid-cols-[18%_70%] bg-[#343232] items-center h-[50px] w-[80%] mx-auto rounded-full justify-between overflow-hidden mb-4 ">

        <div className="h-full border-r-[2.2px] border-white">
          <button 
            ref={submitBtnRef}
            className="w-full h-full flex items-center justify-center ">
            <CiSearch size={30} color="white"/>
          </button>
        </div>
      
        <div className=" h-full flex items-center "
          style={isFocusedInput 
            ? {
              border: '1.2px solid #ffffff95',
              borderLeft: 'none',
              // margin: '5px',
              width: 'calc(100% - 8px)',
              height: '70%',
              borderTopRightRadius: '6rem',
              borderBottomRightRadius: '6rem',
            } 
            : {}
          }
        >
          <input
            onFocus={() => setIsFocusedInput(true)} 
            onBlur={() => setIsFocusedInput(false)}
            ref={inputRef}
            value={searchText}
            onChange={onInputChange} 
            type="text" 
            className="w-full h-full bg-transparent outline-none border-none text-white p-2 placeholder:text-gray-300" 
            placeholder="Search something here" 
          />
        </div>
      </form>

      <div className="w-[95%] mx-auto my-6 max-[380px]:my-0">
        <SearchKeyWords 
          phrase={searchPhrase} 
          setSearchText={setSearchText}
          submitBtnRef={submitBtnRef}
        />
      </div>
    </div>
  )
}

function SearchKeyWords({
  phrase, setSearchText, submitBtnRef
}: {
  phrase: string,
  setSearchText: (value: string) => void
  submitBtnRef: React.RefObject<HTMLButtonElement | null>
}) {
  type SearchKeyWordsType = {
    page  : number
    results:{
      id: number
      name: string
    }[]
    total_pages: number
    total_results: number
  }

  const [searchKeyWords, setSearchKeyWords] = useState<SearchKeyWordsType | null>(null)

  function onKeywordClick(name: string) {
    setSearchText(name)
    setTimeout(() => {
      submitBtnRef.current?.click()
    }, 10)
  }

  useEffect(() => {
    if (!phrase) return

    (async () => {
      try{
        const keywords: SearchKeyWordsType = 
        await axios(`https://api.themoviedb.org/3/search/keyword?query=${phrase}&page=1`, TMDBOptions).then(res => res.data)

        setSearchKeyWords(prev => {
          return {
            ...keywords,
            results: keywords.results.splice(0, 10)
          }
        })

      } catch(err) {
        console.log(err)
      }
    })()

  }, [phrase])

  return (
    <div className='w-full text-sm flex grid-flow-colp overflow-x-auto justify-start pl-10'>
        {
          searchKeyWords && searchKeyWords.results.map(({id, name}) => (
            <button 
              onClick={() => onKeywordClick(name)}
              key={id} 
              className="bg-[#413d3d70] rounded-md px-4 py-2 mx-4  text-nowrap whitespace-nowrap italic font-semibold">
              {name}
            </button>
          ))
        }
    </div>
  )
}


function ResultOptions({
  searchTerm
}:{
  searchTerm: string
}) {



  const {moviesOrTVshows, setMoviesOrTVshows} = 
  useContext(MoviesOrTVshowsLinksContext)

  const [activeTitle, setActiveTitle] = useState(optionTitles[0])
  const [isVisibleResults, setIsVisibleResults] = useState(true)
  const [isVisibleModal, setIsVisibleModal] = useState(false)

  useEffect(() => {
    // setIsVisibleResults(false)
    // if (innerWidth < 380) setIsVisibleResults(false)
    const fn = () => {
      if (innerWidth < 380) return setIsVisibleResults(false)
      setIsVisibleResults(true)
    }
    fn()

    addEventListener('resize', fn)
    return () => {
      removeEventListener('resize', fn)
    }
  }, [])

  // useEffect (() => {
  //   setMoviesOrTVshows('tvshows')
  // }, [setMoviesOrTVshows])


  // useEffect (() => {
  //   console.log('moviesOrTVshows: ', moviesOrTVshows) 
  // }, [moviesOrTVshows])

  
  return (
    <div 
      key={searchTerm}
      className="relative h-auto"
    >
      {/* close button */}

      {
        !isVisibleResults && !isVisibleModal && (
        <div className="hidden max-[380px]:block fixed top-0 left-0">
          <button 
            className=" text-2xl  p-4 "
            onClick={() => {
              setIsVisibleModal(true)
            }}
            > 
            <RiMenu3Line />
          </button>
        </div>
        )
      }

      {
        isVisibleResults && (
          <ul className={`h-[70px] bg-[#343232] border-y border-white my-2 grid grid-cols-5 divide-x`}>
            {
              optionTitles.map((title, i) => (
                <ResultOption 
                  key={i} 
                  title={title}
                  isActive={title === activeTitle}
                  setActiveTitle={setActiveTitle}
                  i={i}
                />
              ))
            }
          </ul>
        )
      }

      {
        isVisibleModal && (
          <> 
            <button 
              className="block bg-neutral-500/50 absolute top-0 bottom-0 w-full z-10 cursor-default min-[380px]:hidden"
              onClick={() => {
                setIsVisibleModal(false)
              }}
            >
              <span 
                className="absolute top-0 right-0 text-2xl p-4"
                > 
                <TfiClose  />
              </span>
              
              <ul className={` bg-[#343232] my-2 divide-y w-[50%] h-[70vh] absolute top-0 left-0 z-10 max-[380px]:h-full overflow-y-auto`}>
                {
                  optionTitles.map((title, i) => (
                    <ResultOption 
                      key={i} 
                      title={title}
                      isActive={title === activeTitle}
                      setActiveTitle={setActiveTitle}
                      i={i}
                    />
                  ))
                }
              </ul>
            </button>
          </>
        )
      }

      <div 
      // ref={itemsContainerParentRef}
      className="h-[calc(100vh-220px)] [@media(min-width:380px)]:h-[calc(100vh-280px)] [@media(min-width:480px)]:h-[calc(100vh-300px)] overflow-y-auto relative"
      >
        {
          optionTitles.map((title, i) => (
            <ItemContainer 
              key={i} 
              isActive={title === activeTitle}
              title={title}
              i={i}
              searchTerm={searchTerm}
            />
          ))
        }
      </div>
    </div>
  )
}


function ResultOption({
  title, isActive, setActiveTitle, i
}: {
  title: string,
  isActive?: boolean,
  setActiveTitle: (title: string) => void,
  i: number
}) {

  const {setMoviesOrTVshows} = 
  useContext(MoviesOrTVshowsLinksContext)

  // useEffect(() => {
  //   // console.log(isActive)
  //   if (!isActive) return

  //   if (title === optionTitles[0]) {
  //     return setMoviesOrTVshows('tvshows')
  //   } else if (title === optionTitles[1]) {
  //     return setMoviesOrTVshows('movies')
  //   }
  //   setMoviesOrTVshows('movies')

  // }, [isActive, setMoviesOrTVshows, i, title])

  
  return (
    <li className=" bg-[#343232] p-2 py-4 flex items-center justify-center  max-[380px]:justify-start  max-[380px]:items-start"
      onClick={() => {
        setActiveTitle(title)
        if (title === optionTitles[0]) {
          setMoviesOrTVshows('tvshow')
        } else if (title === optionTitles[1]) {
          setMoviesOrTVshows('movie')
        }
      }}
      style={isActive ? {
        // backgroundColor: '#56c080',
        color: '#56c080',
        // color: 'black',
        fontWeight: 'bolder',
        fontStyle: 'italic'
      } : {}}
    >
      <span className="w-full h-full flex items-center justify-center text-center max-[500px]:text-sm ">
        {title}
      </span>
    </li>
  )
}

const optionTitles = [
  'TV Shows', 'Movies', 'People', 'Collections', 'Companies'
]


export const links: LinksType = 
['tv', 'movie', 'person', 'collection', 'company']
.map((title, i, arr) => ({
    beforeStr: `${'https://api.themoviedb.org/3/search/'}${title}?query=`, 
    afterStr: i === arr.length - 1 ? '&page=' : '&include_adult=false&language=en-US&page='
  })
)


export type LinksType = { 
  beforeStr: string, 
  afterStr: string 
} []


// export type LinksType = { 
//   [key: string]: { 
//     beforeStr: string, 
//     afterStr: string 
//   } 
// }