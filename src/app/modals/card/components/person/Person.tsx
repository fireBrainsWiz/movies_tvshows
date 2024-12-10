'use client'

import { useContext, useEffect, useRef, useState } from "react"
import { MediaTypeInfoType, CommonTypes} from "@/app/lib/MediaTypeInfoTypes"
import MoviesOrTVshowsLinksContext from "@/app/(__pages__)/context/MoviesOrTVshowsLinksContext"
import axios from "axios"
import { TfiClose } from "react-icons/tfi";
import ToggleShowPersonContext from "@/app/(__pages__)/context/ToggleShowPersonContext"
import { TMDBOptions } from "@/app/client/helpers/TMDB_API"
import { ImagePath } from "@/app/lib/types"
import Image from "next/image"
import Link from "next/link"
import { FiExternalLink } from "react-icons/fi";
import PersonCreditsSlickSlider from "./PersonCreditsSlickSlider"
import { getGenderByNumber } from "@/app/modals/card/lib/utils"
import useImagePixel from "@/app/(__pages__)/hooks/useImagePixel"
import lightOrDark from "@/app/client/helpers/lightOrDark"
import getColor from "@/app/client/helpers/getColor"
import BackdropLogoPosterImageSwiper from "@/app/modals/all-images-and-videos/BackdropLogoPosterImageSwiper"


export default function Person() {

  const testPersonId = 13548
  //2015-12-27 for changes
  const external_ids = {
    "id": 117642,
    "freebase_mid": "/m/06gh0t",
    "freebase_id": "/en/jason_momoa",
    "imdb_id": "nm0597388",
    "tvrage_id": 35980,
    "wikidata_id": "Q315271",
    "facebook_id": null,
    "instagram_id": "prideofgypsies",
    "tiktok_id": null,
    "twitter_id": "",
    "youtube_id": null
  }//external ids for sharing

  const translations = {
    "id": 13548,
    "translations": [
      {
        "iso_3166_1": "US",
        "iso_639_1": "en",
        "name": "English",
        "english_name": "English",
        "data": {
          "biography": "James Todd Spader (born February 7, 1960) is an American actor. He is known for often portraying eccentric and morally ambiguous characters. He started his career in critically acclaimed independent films before transitioning into television, for which he received numerous awards and acclaim, including three Primetime Emmy Awards as well as nominations for three Golden Globe Awards and ten Screen Actors Guild Awards.\n\nSpader started his career acting in youth-orientated films such as Tuff Turf (1985), Pretty in Pink (1986), and Mannequin (1987). His breakthrough role came with the Steven Soderbergh drama Sex, Lies, and Videotape (1989), for which he received the Cannes Film Festival Award for Best Actor. He then starred in films such as White Palace (1990), True Colours (1991), Stargate (1994), 2 Days in the Valley (1996), and Secretary (2002). Spader took supporting roles in Bob Roberts (1992), Wolf (1994), Lincoln (2012), and The Homesman (2014). He also played the role of Ultron in Avengers: Age of Ultron (2015).\n\nHis television roles include the attorney Alan Shore in the last season of The Practice (2003–2004) and its spin-off Boston Legal (2004–2008), which earned him three Primetime Emmy Awards for Outstanding Lead Actor in a Drama Series. He portrayed Robert California in the sitcom The Office (2011–2012). Spader is also known for starring as Raymond Reddington in the NBC crime thriller series The Blacklist (2013–2023), for which he received two Golden Globe Award nominations for Best Actor—TV Series Drama.\n\nDescription above is from the Wikipedia article James Spader, licensed under CC-BY-SA, full list of contributors on Wikipedia.",
          "name": "James Spader",
          "primary": true
        }
      },
      {
        "iso_3166_1": "DE",
        "iso_639_1": "de",
        "name": "Deutsch",
        "english_name": "German",
        "data": {
          "biography": "James Spader kam als James Todd Spader am 7. Februar 1960 in Boston, Massachusetts als Sohn zweier Lehrer zur Welt, die ihn auch beide unterrichteten, bis James Spader an die Michael Chekhov School in New York ging, um Schauspiel zu studieren. Ende der 1970er Jahre startete James Spader seine Karriere mit kleineren Rollen in TV-Serien und Shows. 1989 gelang James Spader mit seiner ersten Hauptrolle in dem Voyeur-Film Sex, Lügen und Video der Durchbruch und erhielt für sein Schauspiel viele gute Kritiken. Zudem wurde er beim Film Festival in Cannes mit einem Preis als bester Schauspieler geehrt.\n\nSehr erfolgreich ist James Spader auch in Fernsehserien. In der Anwalts-Serie Practice – Die Anwälte sowie dem Spinoff Boston Legal spielte er von 2003 bis 2008 den Charakter Alan Shore, was ihm diverse Emmy- und Golden Globe-Nominierungen einbrachte. 2004 bis 2007 gewann James Spader den Emmy als bester Seriendarsteller.\n\nVon 1987 bis 2004 war James Spader mit Victoria Spader verheiratet, aus dieser Ehe sind zwei Kinder hervorgegangen.",
          "name": "",
          "primary": false
        }
      },
      {
        "iso_3166_1": "GR",
        "iso_639_1": "el",
        "name": "ελληνικά",
        "english_name": "Greek",
        "data": {
          "biography": "",
          "name": "",
          "primary": false
        }
      },
      {
        "iso_3166_1": "ES",
        "iso_639_1": "es",
        "name": "Español",
        "english_name": "Spanish",
        "data": {
          "biography": "James Todd Spader (7 de febrero de 1960) es un actor estadounidense.\n\nSus papeles son reconocidos por los particulares toques excéntricos y dramáticos en sus películas, tales como Pretty in Pink, Sex, Lies, and Videotape, Crash, Stargate, Wolf o Secretary. Sus papeles más famosos en la televisión son del abogado Alan Shore en la serie The Practice, su spin-off Boston Legal, por el que ganó tres premios Emmy Awards y su más reciente papel, Raymond Reddington en la serie The Blacklist, donde se aprecia la calidad de actor y la voz y captura de movimiento del robot Ultron en la película de Marvel Studios, Avengers: Age of Ultron.",
          "name": "",
          "primary": false
        }
      },
      {
        "iso_3166_1": "PL",
        "iso_639_1": "pl",
        "name": "Polski",
        "english_name": "Polish",
        "data": {
          "biography": "Jest synem nauczycieli, Todda i Jean Spader. Uczęszczał do Pfilips Academy w Andover, uczył się razem z obecnym reżyserem, Peterem Sellarsem. Rzucił szkołę w 11 klasie. Zanim zajął się aktorswem, imał się rożnych zajęć, był m.in. pomywaczem i instruktorem jogi. Na ekranie zadebiutował w 1981 roku w \"Endless Love\" (\"Niekończąca się miłość\"). W 1989 roku w Cannes został nagrodzony za najlepszą rolę męską w \"Sex, lies and videotape\" (\"Seks, kłamstwa i kasety video\"). To jeden z najbardziej niedocenianych aktorów współczesnego Hollywoodu.",
          "name": "",
          "primary": false
        }
      },
      {
        "iso_3166_1": "BR",
        "iso_639_1": "pt",
        "name": "Português",
        "english_name": "Portuguese",
        "data": {
          "biography": "James Todd Spader (nascido em 7 de fevereiro de 1960) é um ator e produtor americano. Ele retratou personagens excêntricos em filmes como Sex, Lies, and Videotape (1989), Stargate (1994), Crash (1996), Secretary (2002) e Lincoln (2012). No Universo Cinematográfico Marvel, ele interpretou o personagem titular de Ultron em Vingadores: Era de Ultron (2015), que ele retratou através de captura de voz e movimento.\n\nSeus papéis na televisão incluem os do advogado Alan Shore in The Practice (1997-2004) e seu spin-off Boston Legal (2004-2008) (pelo qual ganhou três prêmios Emmy), e Robert California na comédia-mockumentary The Office ( 2005-2013). Ele também estrela o famoso criminoso que se tornou informante do FBI Raymond \"Red\" Reddington no drama policial da NBC The Blacklist (2013-), pelo qual ganhou duas indicações ao Globo de Ouro.",
          "name": "",
          "primary": false
        }
      },
      {
        "iso_3166_1": "KR",
        "iso_639_1": "ko",
        "name": "한국어/조선말",
        "english_name": "Korean",
        "data": {
          "biography": "",
          "name": "제임스 스페이더",
          "primary": false
        }
      },
      {
        "iso_3166_1": "FR",
        "iso_639_1": "fr",
        "name": "Français",
        "english_name": "French",
        "data": {
          "biography": "James Todd Spader (né le 7 février 1960) est un acteur et producteur américain. Il a interprété des personnages excentriques dans des films tels que Sex, Lies, and Videotape (1989), Stargate (1994), Crash (1996), Secretary (2002) et Lincoln (2012). Dans le Marvel Cinematic Universe, il a joué le personnage titulaire d'Ultron dans Avengers : Age of Ultron (2015), qu'il interprète par la voix et la capture de mouvements.\n\nÀ la télévision, il incarne notamment l'avocat Alan Shore dans The Practice (1997-2004) et son spin-off Boston Legal (2004-2008) (pour lequel il a remporté trois Emmy Awards), ainsi que Robert California dans la comédie-monumentaire The Office (2005-2013). Il joue également le rôle de Raymond \"Red\" Reddington, un criminel de haut vol devenu informateur du FBI, dans la série policière The Blacklist, diffusée sur la chaîne NBC (2013-), pour laquelle il a été nommé deux fois aux Golden Globe Awards.",
          "name": "",
          "primary": false
        }
      },
      {
        "iso_3166_1": "CN",
        "iso_639_1": "zh",
        "name": "普通话",
        "english_name": "Mandarin",
        "data": {
          "biography": "詹姆斯·斯派德（James Spader），1960年2月7日出生于美国马萨诸塞州波士顿，美国影视演员。  1981年，参演个人首部电影《无尽的爱》。1985年，主演动作电影《火爆小子》。1988年，主演悬疑犯罪电影《神秘的背影》 ，他凭借该片提名第16届土星奖最佳男主角。1989年，凭借剧情电影《性、谎言和录像带》获得第42届戛纳国际电影节主竞赛单元最佳男演员。1994年，由其主演的爱情恐怖电影《狼》上映，他凭借该片入围第21届土星奖最佳男配角。2000年，由其出演的科幻惊悚电影《超时空危机》上映。2003年，由其出演的电视剧《律师本色第八季》首播。  2005年，凭借电视剧《波士顿法律第一季》提名第62届美国金球奖电视类剧情类剧集最佳男主角、第57届黄金时段艾美奖剧情类剧集最佳男主角 。2007年，主演电视剧《波士顿法律第四季》，他凭借该剧提名第59届黄金时段艾美奖剧情类剧集最佳男主角 。2011年，出演NBC喜剧《办公室第八季》。2013年，由其主演的犯罪剧《罪恶黑名单第一季》开播 ，他凭借该剧提名第71届美国金球奖电视类-剧情类剧集最佳男角。2015年，由其出演的科幻动作电影《复仇者联盟2：奥创纪元》上映 。2021年，由其主演的电视剧《罪恶黑名单第九季》首播。",
          "name": "詹姆斯·斯派德",
          "primary": false
        }
      },
      {
        "iso_3166_1": "ES",
        "iso_639_1": "ca",
        "name": "Català",
        "english_name": "Catalan",
        "data": {
          "biography": "James Todd Spader (Boston, Massachusetts, 7 de febrer de 1960) és un actor de culte estatunidenc guanyador de tres premis Emmy. Els seus papers són reconeguts pels seus particulars tocs excèntrics i dramàtics en les seves pel·lícules.",
          "name": "",
          "primary": false
        }
      },
      {
        "iso_3166_1": "TW",
        "iso_639_1": "zh",
        "name": "普通话",
        "english_name": "Mandarin",
        "data": {
          "biography": "",
          "name": "詹姆斯·史派德",
          "primary": false
        }
      },
      {
        "iso_3166_1": "UA",
        "iso_639_1": "uk",
        "name": "Український",
        "english_name": "Ukrainian",
        "data": {
          "biography": "",
          "name": "Джеймс Спейдер",
          "primary": false
        }
      },
      {
        "iso_3166_1": "RU",
        "iso_639_1": "ru",
        "name": "Pусский",
        "english_name": "Russian",
        "data": {
          "biography": "Американский киноактер.\n\nРодился 7 февраля 1960 года в Бостоне, штат Массачусетс, США в семье школьных учителей. Мать Джеймса Спейдера преподавала искусство. Окончил школу Брукс в Андовере, штат Массачусетс. Продолжил обучение в академии Филиппса в Андовере и актерской школе имени Михаила Чехова в Нью-Йорке.\n\nНекоторое время работал инструктором по йоге, водителем грузовика и автопогрузчика на железной дороге.\n\nВ кино с 1978 года. Дебют состоялся в фильме \"Team Meats\", где Спейдер исполнил небольшую роль Джимми. Первой крупной ролью стал Кейт Баттерфилд в романтическом фильме \"Бесконечная любовь\" (1981).\n\nИзвестность актеру принесла роль Стефа в ленте \"Милашка в розовом\" (1986) и сексуального вуайериста Грэхема Далтона в фильме \"Секс, ложь и видео\" (1989, Премия на МКФ в Канне), египтолога Дэниэла Джексона в фантастической ленте \"Звездные врата\" (1994)и автофетишиста в нашумевшей ленте Д.Кроненберга\n\n\"Автокатастрофа\" (1996).\n\nДжеймс Спейдер — лауреат премий \"Эмми\" 2005 и 2007 годов за роль Алана Шора в сериале \"Юристы Бостона\" и в 2004 году за участие в телесериале \"Практика\".",
          "name": "Джеймс Спэйдер",
          "primary": false
        }
      },
      {
        "iso_3166_1": "IR",
        "iso_639_1": "fa",
        "name": "فارسی",
        "english_name": "Persian",
        "data": {
          "biography": "",
          "name": "جیمز اسپیدر",
          "primary": false
        }
      },
      {
        "iso_3166_1": "IL",
        "iso_639_1": "he",
        "name": "עִבְרִית",
        "english_name": "Hebrew",
        "data": {
          "biography": "",
          "name": "ג'יימס ספיידר",
          "primary": false
        }
      }
    ]
  }
  
  const {
    isVisiblePerson, personDetails, setIsVisiblePerson,
    prsonCompZIndex, setPrsonCompZIndex, setPersonDetails
  } = useContext(ToggleShowPersonContext)
    

  const imageRef = useRef<HTMLImageElement | null>(null)
  const cardRef = useRef<HTMLDivElement | null>(null)
  const AKAContainer = useRef<HTMLDivElement>(null)
  const [imageColor, setImageColor] = useState('')
  // apect_ratio: number;
  // height: number;
  // iso_639_1: string;
  // file_path: string;
  // vote_average: number;
  // vote_count: number;
  // width: number;
  const [personImages, setPersonImages] = 
  useState([] as CommonTypes['Person']['images']['profiles'])

  const [forSmallScreen, setForSmallScreen] = useState(false)

  
  // const [AKAWidth, setAKAWidth] =  useState(
  //   (() => {
  //     if (innerWidth >= 640) {
  //       return `${innerWidth - (innerWidth*0.5)}px`
  //     } else {
  //       return `${innerWidth - (innerWidth*0.20)}px`
  //     }
  //   })()
  // )

  // const {links} = useContext(MoviesOrTVshowsLinksContext)

  // const [personDetails, setPersonDetails] = 
  // useState({} as MediaTypeInfoType['personDetails'])

  useImagePixel({
    backdrop_path: personDetails.profile_path ? personDetails.profile_path : '/no-image.png', 
    imageRef, 
    setColor: setImageColor
  })

  useEffect(() => {
    if(!isVisiblePerson) {
      setPersonImages([])
    }
}, [isVisiblePerson])
  // const [prsonCompZIndex, setPrsonCompZIndex] = 
  // useState(20)

  // console.log({personImages})
  // console.log({personDetails})



  // useEffect(() => {//!this effect is for testing
  //   try {
  //     (async () => {
  //       const {data}: {data: MediaTypeInfoType['personDetails']} = await axios(
  //         `https://api.themoviedb.org/3/person/${testPersonId}?language=en-US}`,
  //         TMDBOptions
  //       )
  //       setPrsonCompZIndex(20)
  //       setIsVisiblePerson(true)
  //       setPersonDetails(data)
  //     })()
  //   } catch(err: any) {
  //     console.log(err)
  //   }
  // }, [testPersonId])
  

  function handleCloseCardPageClick() {
    // document.body.style.overflow = 'auto'
    // setIsLoadingBackdropImage(true)
    // setIsVisibleCardPage(false)

    // window.scroll({
    //   top: scrollTop,
    //   left: 0,
    //   behavior: "smooth",
    // });

    setIsVisiblePerson(false)
  }

  // console.log()

  // personDetails.homepage = 'https://www.imdb.com/name/' 

  // useEffect(() => {
  //   if (isVisiblePerson) {
  //     document.body.style.overflow = 'hidden'
  //     return
  //   }

  //   document.body.style.overflow = 'auto'
  // }, [isVisiblePerson])
  
  // fetch person
  // useEffect(() => {
  //   // if (!toBeViewedId) return
    
  //   (async () => {
  //     try {
  //       const {data}: {
  //         data: MediaTypeInfoType['personDetails']
  //       } = await axios(
  //         `${links.INFOS.personDetails.beforeStr}${personDetails.id}${links.INFOS.personDetails.afterStr}`,
  //         TMDBOptions
  //       )

  //       setPersonDetails(data)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   })()

  // }, [personDetails.id, links.INFOS.personDetails, ])

  // console.log(personDetails)

  // resize
  // useEffect(() => {
  //   let timerId: ReturnType<typeof setTimeout>
    
  //   const fn = () => {
  //     clearTimeout(timerId)
  //     timerId = setTimeout(() => {
  //       if (innerWidth >= 640) {
  //         setAKAWidth(`${innerWidth - (innerWidth*0.5)}px`)
  //       } else {
  //         setAKAWidth(`${innerWidth - (innerWidth*0.20)}px`)
  //       }
  //     }, 10)

  //   }

  //   addEventListener('resize', fn)
  //   return () => {
  //     removeEventListener('resize', fn)
  //   }
  // })

// alert(innerWidth)
// 3d2626
const defaultBG = '#3d2626'

let brightness = lightOrDark(getColor(imageColor || 'rgb(22 6 6 / 1)'));
const styleOnLight = brightness === 'light' && personDetails.profile_path
? ' bg-stone-600/60 text-black' : ''
;

//get person images
useEffect(() => {
  (async () => {
    if (!personDetails.id) return
    try {
      const personProfiles: typeof personImages = await axios(
        `https://api.themoviedb.org/3/person/${personDetails.id}/images?language=en-US`,
        TMDBOptions
      ).then(res => res.data.profiles)
      setPersonImages(personProfiles)
    } catch (error) {
      console.log(error)
    }
  })()

}, [personDetails.id])

// media query
useEffect(() => {
  let mediaQuery = window.matchMedia(`(min-width: 1020px)`)//md
  
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


  if (!isVisiblePerson) return null

  return (
    <div 
      // onClick={handleCloseCardPageClick}
      className={`bg-[#222] bg-whitep absolute w-full h-screen top-0 z-${prsonCompZIndex} ${isVisiblePerson ? 'left-0' : 'left-[-100%]'} [transition:left_300ms_ease-in-out] overflow-hidden overflow-y-auto mb-4`}
    >
      <div className="w-full flex justify-end gap-2  h-[50px] bg-red-600p"> 
        <button 
          className="text-white text-2xl cursor-pointer bg-red-500p p-4"
          onClick={handleCloseCardPageClick}
          >
          <TfiClose />
        </button>
      </div>

      {
        forSmallScreen ? (
          <div 
            // onClick={(e) => e.stopPropagation()}
            className={`bg-red-500/10 rounded-xl p-4 max-w-[700px] mx-auto my-8 w-[calc(100%-16px)] ${styleOnLight} border  className="border border-white/70 dark:border-gray-500 "`}
            ref={cardRef}
            style={{
              background: personDetails.profile_path ? imageColor : defaultBG
            }}
            >
            
            <div className="flex gap-4 flex-wrap justify-center mb-10 bg-green-900p">
              <Image
                ref={imageRef}
                src={personDetails.profile_path ? ImagePath+(personDetails.profile_path) : '/no-image.png'
                }
                alt={personDetails.name || 'no-image'}
                width={200+40}
                height={300+40}
                className="w-fullp max-w-full h-auto  max-h-[300px]p rounded-xl object-cover"
              />

              <div className="sm:w-[60%] w-full bg-red-900p w-fullp pr-4">
                <div className="flex items-center justify-between  w-full pr-4p">
                  <h1 className="text-3xl inline">{personDetails.name}</h1>
                  {
                    personDetails.birthday && (
                      <p className=" inline-flexp inline justify-endp items-centerp">
                        {
                          `(${ 
                          personDetails?.deathday && 
                          personDetails?.birthday
                          ? (
                          Number(personDetails.deathday.slice(0,4)) -
                          Number(personDetails.birthday.slice(0,4))
                          )
                          :  (
                            new Date().getFullYear() -
                            Number(personDetails.birthday.slice(0,4))
                          )
                          })`
                        }
                      </p>
                    )
                  }
                </div>

                <div className="my-10 " 
                  ref={AKAContainer}
                >
                  <p className="text-2xl">Also knows as</p>
                  <ul className={`overflow-hidden overflow-x-auto grid grid-flow-col gap-4 justify-start xs:max-w-[315px]p sm:max-w-[430px]p w-[230px]p w-fullp mx-auto`}  
                    style={{
                      paddingBlock: personDetails.also_known_as?.length ? '10px' : '5px',
                    }}
                  >
                    {
                      personDetails.also_known_as?.length
                      ?
                      personDetails.also_known_as
                      ?.map((aka, i) => {
                        return <li 
                        key={i}
                          className="whitespace-nowrap mx-4"
                        >
                          {aka}
                        </li>
                      })
                      : <li>Not set / no aliases available</li> 
                    }
                  </ul>

                </div>

                <div className="mt-10 ">
                  <p className="text-2xl">Biography</p>
                  <p className="max-h-[150px] max-w-[500px] overflow-hidden overflow-y-auto">
                    {
                      personDetails.biography
                      ? personDetails.biography 
                      : 'Not set / biography not available'
                    }
                  </p>
                </div>
              </div>

            </div>
            <hr  className="border border-white/70 dark:border-gray-500 "/>

            <div className="grid gap-6 my-10">
              <p>
                <span className="mr-10">Place of birth:</span>
                <span>
                  {
                    personDetails.place_of_birth
                    ? personDetails.place_of_birth
                    : 'Not set / not specified'
                  }
                </span>
              </p>
              <p>
                <span className="mr-10">Known for:</span>
                <span>{personDetails.known_for_department}</span>
              </p>
              <p>
                <span className="mr-10">Birthday:</span>
                <span>
                  {
                    personDetails.birthday
                    ? personDetails.birthday
                    : 'Not set / not specified'
                  }
                </span>
              </p>
              <p>
                <span className="mr-10">age:</span>
                <span>
                  {
                    personDetails?.deathday && 
                    personDetails?.birthday
                    ? (
                      Number(personDetails.deathday.slice(0,4)) -
                      Number(personDetails.birthday.slice(0,4))
                    )
                    : personDetails?.birthday
                      ? (
                        new Date().getFullYear() -
                        Number(personDetails.birthday.slice(0,4))
                      )
                      : 'Not set / not specified'
                  }
                </span>
                <span>
                  {
                    !personDetails.deathday
                    ? '  (still alive)' 
                    : '  (passed away on ' 
                    + personDetails.deathday
                    +')'
                  }
                </span>
              </p>
              <p>
                <span className="mr-10">Gender:</span>
                <span>{getGenderByNumber(personDetails.gender)}</span>
              </p>
              <p>
                <span className="mr-10">Popularity:</span>
                <span>{personDetails.popularity}</span>
              </p>
              <p>
                <span className="mr-10">Homepage:</span>
                {
                  personDetails?.homepage
                  ? (
                    <Link href={personDetails.homepage}
                      target="_blank" 
                      className="inline-flex items-center gap-2"
                    >
                      <span>Visit {personDetails.name +"'s"} page</span>
                      <FiExternalLink color="lime"/>
                    </Link>
                  )
                  : 'Not set / not specified'
                }
              </p>
            </div>
            <hr className="border border-white/70 dark:border-gray-500 "/>

            <div className="my-10 "
              key={isVisiblePerson ? '1' : '0'}
            >
              <PersonCreditsSlickSlider 
                id={personDetails.id}
                setPrsonCompZIndex={setPrsonCompZIndex}
              />
            </div>    
            <hr className="border border-white/70 dark:border-gray-500 "/>
            <p className="text-center my-4">
              {
                personDetails && (
                  personDetails.name + "'s images"
                )
              }
            </p>
            <div className="bg-amber-600/30p max-h-[400px]p flex max-w-[600px]p [@media(max-width:1246px)]:max-w-[400px]p ">
              {
                isVisiblePerson
                ? (
                  <BackdropLogoPosterImageSwiper 
                    key={personDetails.id}
                    images={personImages} 
                    type="posters" 
                    isVisibleAllImages={true} 
                  />
                ): <div></div>
              }
            </div>
          </div>

        ) : (
          <div className="mx-auto flex justify-center">
            <div className="bg-rose-950/10 border border-white/70 dark:border-gray-500 min-h-[500px] rounded-xl p-4 my-8 grid grid-cols-[1fr_1fr]p gap-2 mx-1 [@media(min-width:1300px)]:mx-4 max-w-[1562px] mx-autop ">
            <div className="bg-green-600/10p gridp grid-cols-3p flex flex-nowrap gap-2 border-b  border-white/70 dark:border-gray-500 ">
              <div className="bg-amber-600/80p  [flex:10_10_100%;]">

                <div className="grid grid-cols-2 justify-end max-w-[700px] bg-green-300p flex-1 ">
                  <div className="min-w-[280px]p bg-red-500p w-max flex gap-3 [@media(max-width:1246px)]:gap-1 [@media(max-width:600px)]:gap-1">
                  <Image 
                    src={
                      personDetails.profile_path 
                      ? ImagePath+(personDetails.profile_path) 
                      : '/no-image.png'
                    }
                    alt={personDetails.name || 'person profile image'}
                    width={280}
                    height={600}
                    className=" max-w-full h-auto  rounded-md object-contain block mt-[6px] min-w-[280px]"
                  />
                <div className="bg-slate-600p px-2 [@media(min-width:600px)]:w-[300px] [@media(max-width:1100px)]:max-w-[290px] [@media(max-width:600px)]:w-[100px]">
                  <div className="flex justify-between  w-full gap-2">
                    <h1 className="text-3xl inline truncate">{personDetails.name}</h1>
                    {
                      personDetails.birthday && (
                        <p className=" h-full pt-[6px]">
                          {
                            `(${ 
                            personDetails?.deathday && 
                            personDetails?.birthday
                            ? (
                            Number(personDetails.deathday.slice(0,4)) -
                            Number(personDetails.birthday.slice(0,4))
                            )
                            :  (
                              new Date().getFullYear() -
                              Number(personDetails.birthday.slice(0,4))
                            )
                            })`
                          }
                        </p>
                      )
                    }
                  </div>
                  <div className="my-10 " 
                    ref={AKAContainer}
                  >
                    <p className="text-xl">Also knows as</p>
                    <ul className={`overflow-hidden overflow-x-auto grid grid-flow-col gap-4 justify-start xs:max-w-[315px]p sm:max-w-[430px]p w-[230px]p w-fullp mx-auto bg-red-500p`}  
                      style={{
                        paddingBlock: personDetails.also_known_as?.length ? '10px' : '5px',
                      }}
                    >
                      {
                        personDetails.also_known_as?.length
                        ?
                        personDetails.also_known_as
                        ?.map((aka, i) => {
                          return <li 
                          key={i}
                            className="whitespace-nowrap mx-4"
                          >
                            {aka}
                          </li>
                        })
                        : <li>Not set / no aliases available</li> 
                      }
                    </ul>
                  </div>

                  <div className="mt-10 ">
                    <p className="text-2xl my-3">Biography</p>
                    <p className="max-h-[185px] [@media(min-width:1020px)]:max-h-[145px]p   overflow-hidden overflow-y-auto bg-red-500p flex h-full">
                      {
                        personDetails.biography
                        ? personDetails.biography 
                        : 'Not set / biography not available'
                      }
                    </p>
                  </div>
                </div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-600/30p max-h-[400px]p flex max-w-[600px] [@media(max-width:1246px)]:max-w-[400px] ">
                <BackdropLogoPosterImageSwiper 
                  images={personImages} 
                  type="posters" 
                  isVisibleAllImages={true} 
                />
              </div>
            </div>
            <div className="bg-green-600/10p grid grid-cols-2 gap-2p items-center">
              <div className="bg-emerald-500p max-w-[500px] ">
                <p className="text-2xl my-6 underline">More info</p>
                <div className="grid gap-5 my-10 bg-red-800p h-fullp">
                  <p className="flex">
                    <span className="mr-10p w-[120px] bg-red-500p ">Place of birth:</span>
                    <span>
                      {
                        personDetails.place_of_birth
                        ? personDetails.place_of_birth
                        : 'Not set / not specified'
                      }
                    </span>
                  </p>
                  <p className="flex">
                    <span className="mr-10p w-[120px] bg-red-500p ">Known for:</span>
                    <span>{personDetails.known_for_department}</span>
                  </p>
                  <p className="flex">
                    <span className="mr-10p w-[120px] bg-red-500p ">Birthday:</span>
                    <span>
                      {
                        personDetails.birthday
                        ? personDetails.birthday
                        : 'Not set / not specified'
                      }
                    </span>
                  </p>
                  <p className="flex">
                    <span className=" w-[120px] bg-red-500p ">age:</span>
                    <span className="mr-2">
                      {
                        personDetails?.deathday && 
                        personDetails?.birthday
                        ? (
                          Number(personDetails.deathday.slice(0,4)) -
                          Number(personDetails.birthday.slice(0,4))
                        )
                        : personDetails?.birthday
                          ? (
                            new Date().getFullYear() -
                            Number(personDetails.birthday.slice(0,4))
                          )
                          : 'Not set / not specified'
                      }
                    </span>
                    <span>
                      {
                        !personDetails.deathday
                        ?  <small>{'(still alive)'}</small>
                        : '  (passed away on ' 
                        + personDetails.deathday
                        +')'
                      }
                    </span>
                  </p>
                  <p className="flex">
                    <span className="mr-10p w-[120px] bg-red-500p ">Gender:</span>
                    <span>{getGenderByNumber(personDetails.gender)}</span>
                  </p>
                  <p className="flex">
                    <span className="mr-10p w-[120px] bg-red-500p ">Popularity:</span>
                    <span>{personDetails.popularity}</span>
                  </p>
                  <p className="flex">
                    <span className="mr-10p w-[120px] bg-red-500p ">Homepage:</span>
                    {
                      personDetails?.homepage
                      ? (
                        <Link href={personDetails.homepage}
                          target="_blank" 
                          className="inline-flex items-center gap-2"
                        >
                          <span>Visit {personDetails.name +"'s"} page</span>
                          <FiExternalLink color="lime"/>
                        </Link>
                      )
                      : 'Not set / not specified'
                    }
                  </p>
                </div>
              </div>        
              <div className="bg-amber-500p bg-green-500p max-h-[400px]p">
                <div className="my-10 "
                  key={isVisiblePerson ? '1' : '0'}
                >
                  <PersonCreditsSlickSlider 
                    id={personDetails.id}
                    setPrsonCompZIndex={setPrsonCompZIndex}
                  />
                </div> 
              </div>        
            </div>
            </div>
          </div>
        )
      }
    
    </div>
  )
}