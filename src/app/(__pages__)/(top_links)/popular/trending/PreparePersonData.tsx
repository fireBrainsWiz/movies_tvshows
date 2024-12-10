import { TMDBOptions } from "@/app/client/helpers/TMDB_API";
import { ImagePath, PLACEHOLDER_IMAGE } from "@/app/lib/types";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { TVcast } from "@/app/lib/MoviesOrTVshowsInfoContextType_tvshows";
import { MediaTypeInfoType } from "@/app/lib/MediaTypeInfoTypes";
import ToggleShowPersonContext from "@/app/(__pages__)/context/ToggleShowPersonContext";
import getTailwindColorUsingNumber from "@/app/client/helpers/getTailwindColorsUsingNumber";
import Image from "next/image";
import { getGenderByNumber } from "@/app/modals/card/lib/utils";
import { TrendingPeopleData, CombinedCredits, getBestCombinedCredit } 
from "./TrendingPeople";
import isIOS from "@/app/client/helpers/isIOS";
import CardBeingViewedContext from "@/app/(__pages__)/context/CardBeingViewedContext";


export function PreparePersonData({
  personData
}: {
  personData: TrendingPeopleData['results'][number];
}) {


  const {scrollTop, setScrollTop} = useContext(CardBeingViewedContext)


  const {
    isVisiblePerson, setIsVisiblePerson, setPersonDetails
  } = useContext(ToggleShowPersonContext);

  const [personDetail, setPersonDetail] = useState({} as MediaTypeInfoType['personDetails']);

  const [personTVCast, setPersonTVCast] = useState<TVcast | null>(null);
  const [scrollingToTop, setScrollingToTop] = useState(false);


  useEffect(() => {
    (async () => {
      try {
        if (!personData.id) return;

        const personDetails: MediaTypeInfoType['personDetails'] = await axios(
          `https://api.themoviedb.org/3/person/${personData.id}?language=en-US`,
          TMDBOptions
        ).then(res => res.data);

        const combinedCredits: CombinedCredits = await axios(
          `https://api.themoviedb.org/3/person/${personData.id}/combined_credits?language=en-US`,
          TMDBOptions
        ).then(res => res.data);

        const bestCombineCredits = getBestCombinedCredit(combinedCredits.cast)
        if (!bestCombineCredits) return;

        const tvCast: TVcast = {
          character: bestCombineCredits.character,
          credit_id: bestCombineCredits.credit_id,
          order: 'order' in bestCombineCredits? bestCombineCredits.order : 0,
          adult: bestCombineCredits.adult,
          gender: personData.gender,
          id: bestCombineCredits.id,
          known_for_department: personData.known_for_department,
          name: personData.name,
          original_name: personData.original_name,
          popularity: personData.popularity,
          profile_path: personData.profile_path || bestCombineCredits.poster_path
        };

        // console.log(bestCombineCredits)

        setPersonDetail(personDetails);
        setPersonTVCast(tvCast);

      } catch (err: any) {
        console.log(err);
      }
    })();

  }, [personData.id]);


  useEffect(() => {
    if (!isVisiblePerson && scrollingToTop) {
      document.body.style.overflow = 'auto'
      window.scroll({
        top: scrollTop,
        left: 0,
      });
      setScrollingToTop(false)
    }
  }, [isVisiblePerson, scrollingToTop])
  

  const smallAppleDevice = isIOS()
  const bg = getTailwindColorUsingNumber(personData.id, false, smallAppleDevice).split(' ')

  if (!personData.profile_path) return null

  return smallAppleDevice ? 
  (
    // <div className="w-[clamp(100px,48%,250px)] bg-red-500p relative">
      <svg width="200" height="100%" viewBox="0 0 167 249" fill="none" xmlns="http://www.w3.org/2000/svg"
        className="cursor-pointer"
        onClick={() => {
          setScrollTop(document.documentElement.scrollTop)
          window.scroll({
            top: 0,
            left: 0,
          });
          document.body.style.overflow = 'hidden'
          setScrollingToTop(true);
          setIsVisiblePerson(true);
          setPersonDetails(personDetail);
        }}
      >

          <foreignObject x="0.3" y="34" width="99.2%" height="86.2%" fill="#a50a88"
          className={`${bg} w-full h-full rounded-[13px]`}>
          
          </foreignObject>


        <g>
          <path d="M42.48 1C42.7561 1 42.98 0.776142 42.98 0.5C42.98 0.223858 42.7561 0 42.48 0C42.2038 0 41.98 0.223858 41.98 0.5C41.98 0.776142 42.2038 1 42.48 1Z" fill={bg[1]} />
          <path d="M20.3401 9.37109C20.6162 9.37109 20.8401 9.14724 20.8401 8.87109C20.8401 8.59495 20.6162 8.37109 20.3401 8.37109C20.0639 8.37109 19.8401 8.59495 19.8401 8.87109C19.8401 9.14724 20.0639 9.37109 20.3401 9.37109Z" fill={bg[1]} />
          <path d="M40.48 1.05859C40.7561 1.05859 40.98 0.834736 40.98 0.558594C40.98 0.282451 40.7561 0.0585938 40.48 0.0585938C40.2038 0.0585938 39.98 0.282451 39.98 0.558594C39.98 0.834736 40.2038 1.05859 40.48 1.05859Z" fill={bg[1]} />
          <path d="M18.8799 10.75C19.156 10.75 19.3799 10.5261 19.3799 10.25C19.3799 9.97386 19.156 9.75 18.8799 9.75C18.6037 9.75 18.3799 9.97386 18.3799 10.25C18.3799 10.5261 18.6037 10.75 18.8799 10.75Z" fill={bg[1]} />
          <path d="M38.48 1.25C38.7561 1.25 38.98 1.02614 38.98 0.75C38.98 0.473858 38.7561 0.25 38.48 0.25C38.2038 0.25 37.98 0.473858 37.98 0.75C37.98 1.02614 38.2038 1.25 38.48 1.25Z" fill={bg[1]} />
          <path d="M17.5 12.1992C17.7761 12.1992 18 11.9754 18 11.6992C18 11.4231 17.7761 11.1992 17.5 11.1992C17.2239 11.1992 17 11.4231 17 11.6992C17 11.9754 17.2239 12.1992 17.5 12.1992Z" fill={bg[1]} />
          <path d="M36.48 1.53906C36.7561 1.53906 36.98 1.3152 36.98 1.03906C36.98 0.76292 36.7561 0.539062 36.48 0.539062C36.2038 0.539062 35.98 0.76292 35.98 1.03906C35.98 1.3152 36.2038 1.53906 36.48 1.53906Z" fill={bg[1]} />
          <path d="M16.1799 13.7617C16.4561 13.7617 16.6799 13.5379 16.6799 13.2617C16.6799 12.9856 16.4561 12.7617 16.1799 12.7617C15.9038 12.7617 15.6799 12.9856 15.6799 13.2617C15.6799 13.5379 15.9038 13.7617 16.1799 13.7617Z" fill={bg[1]} />
          <path d="M34.48 1.96094C34.7561 1.96094 34.98 1.73708 34.98 1.46094C34.98 1.1848 34.7561 0.960938 34.48 0.960938C34.2038 0.960938 33.98 1.1848 33.98 1.46094C33.98 1.73708 34.2038 1.96094 34.48 1.96094Z" fill={bg[1]} />
          <path d="M14.8701 15.5312C15.1463 15.5312 15.3701 15.3074 15.3701 15.0312C15.3701 14.7551 15.1463 14.5312 14.8701 14.5312C14.594 14.5312 14.3701 14.7551 14.3701 15.0312C14.3701 15.3074 14.594 15.5312 14.8701 15.5312Z" fill={bg[1]} />
          <path d="M32.48 2.51953C32.7561 2.51953 32.98 2.29567 32.98 2.01953C32.98 1.74339 32.7561 1.51953 32.48 1.51953C32.2038 1.51953 31.98 1.74339 31.98 2.01953C31.98 2.29567 32.2038 2.51953 32.48 2.51953Z" fill={bg[1]} />
          <path d="M13.76 17.2617C14.0362 17.2617 14.26 17.0379 14.26 16.7617C14.26 16.4856 14.0362 16.2617 13.76 16.2617C13.4839 16.2617 13.26 16.4856 13.26 16.7617C13.26 17.0379 13.4839 17.2617 13.76 17.2617Z" fill={bg[1]} />
          <path d="M30.48 3.21875C30.7561 3.21875 30.98 2.99489 30.98 2.71875C30.98 2.44261 30.7561 2.21875 30.48 2.21875C30.2038 2.21875 29.98 2.44261 29.98 2.71875C29.98 2.99489 30.2038 3.21875 30.48 3.21875Z" fill={bg[1]} />
          <path d="M12.73 19.1016C13.0061 19.1016 13.23 18.8777 13.23 18.6016C13.23 18.3254 13.0061 18.1016 12.73 18.1016C12.4538 18.1016 12.23 18.3254 12.23 18.6016C12.23 18.8777 12.4538 19.1016 12.73 19.1016Z" fill={bg[1]} />
          <path d="M28.48 4.05859C28.7561 4.05859 28.98 3.83474 28.98 3.55859C28.98 3.28245 28.7561 3.05859 28.48 3.05859C28.2038 3.05859 27.98 3.28245 27.98 3.55859C27.98 3.83474 28.2038 4.05859 28.48 4.05859Z" fill={bg[1]} />
          <path d="M11.8 21.0586C12.0762 21.0586 12.3 20.8347 12.3 20.5586C12.3 20.2825 12.0762 20.0586 11.8 20.0586C11.5239 20.0586 11.3 20.2825 11.3 20.5586C11.3 20.8347 11.5239 21.0586 11.8 21.0586Z" fill={bg[1]} />
          <path d="M26.48 5.07031C26.7561 5.07031 26.98 4.84645 26.98 4.57031C26.98 4.29417 26.7561 4.07031 26.48 4.07031C26.2038 4.07031 25.98 4.29417 25.98 4.57031C25.98 4.84645 26.2038 5.07031 26.48 5.07031Z" fill={bg[1]} />
          <path d="M10.98 23.1406C11.2561 23.1406 11.48 22.9168 11.48 22.6406C11.48 22.3645 11.2561 22.1406 10.98 22.1406C10.7038 22.1406 10.48 22.3645 10.48 22.6406C10.48 22.9168 10.7038 23.1406 10.98 23.1406Z" fill={bg[1]} />
          <path d="M24.48 6.25C24.7561 6.25 24.98 6.02614 24.98 5.75C24.98 5.47386 24.7561 5.25 24.48 5.25C24.2038 5.25 23.98 5.47386 23.98 5.75C23.98 6.02614 24.2038 6.25 24.48 6.25Z" fill={bg[1]} />
          <path d="M10.26 25.3398C10.5362 25.3398 10.76 25.116 10.76 24.8398C10.76 24.5637 10.5362 24.3398 10.26 24.3398C9.98387 24.3398 9.76001 24.5637 9.76001 24.8398C9.76001 25.116 9.98387 25.3398 10.26 25.3398Z" fill={bg[1]} />
          <path d="M22.48 7.64062C22.7561 7.64062 22.98 7.41677 22.98 7.14062C22.98 6.86448 22.7561 6.64062 22.48 6.64062C22.2038 6.64062 21.98 6.86448 21.98 7.14062C21.98 7.41677 22.2038 7.64062 22.48 7.64062Z" fill={bg[1]} />
          <path d="M9.68994 27.7109C9.96608 27.7109 10.1899 27.4871 10.1899 27.2109C10.1899 26.9348 9.96608 26.7109 9.68994 26.7109C9.4138 26.7109 9.18994 26.9348 9.18994 27.2109C9.18994 27.4871 9.4138 27.7109 9.68994 27.7109Z" fill={bg[1]} />
          <path d="M9.26001 30.2188C9.53615 30.2188 9.76001 29.9949 9.76001 29.7188C9.76001 29.4426 9.53615 29.2188 9.26001 29.2188C8.98387 29.2188 8.76001 29.4426 8.76001 29.7188C8.76001 29.9949 8.98387 30.2188 9.26001 30.2188Z" fill={bg[1]} />
          <path d="M12.8901 50.1992C13.1663 50.1992 13.3901 49.9754 13.3901 49.6992C13.3901 49.4231 13.1663 49.1992 12.8901 49.1992C12.614 49.1992 12.3901 49.4231 12.3901 49.6992C12.3901 49.9754 12.614 50.1992 12.8901 50.1992Z" fill={bg[1]} />
          <path d="M11.9199 48.1992C12.1961 48.1992 12.4199 47.9754 12.4199 47.6992C12.4199 47.4231 12.1961 47.1992 11.9199 47.1992C11.6438 47.1992 11.4199 47.4231 11.4199 47.6992C11.4199 47.9754 11.6438 48.1992 11.9199 48.1992Z" fill={bg[1]} />
          <path d="M11.1001 46.1992C11.3762 46.1992 11.6001 45.9754 11.6001 45.6992C11.6001 45.4231 11.3762 45.1992 11.1001 45.1992C10.824 45.1992 10.6001 45.4231 10.6001 45.6992C10.6001 45.9754 10.824 46.1992 11.1001 46.1992Z" fill={bg[1]} />
          <path d="M14.05 52.1992C14.3262 52.1992 14.55 51.9754 14.55 51.6992C14.55 51.4231 14.3262 51.1992 14.05 51.1992C13.7739 51.1992 13.55 51.4231 13.55 51.6992C13.55 51.9754 13.7739 52.1992 14.05 52.1992Z" fill={bg[1]} />
          <path fillRule="evenodd" clipRule="evenodd" d="M154.1 33.7983H116.5L90.5 31.3983V37.5283L116.8 34.7983H154.1C160.17 34.7983 165.1 39.7183 165.1 45.7983V236.798C165.1 242.878 160.17 247.798 154.1 247.798H12.1C6.02 247.798 1.1 242.878 1.1 236.798V45.7983C1.1 44.3983 1.36 43.0483 1.84 41.8183C2.93 39.5483 5.12 37.9183 7.72 37.5783L9.68 37.3883C9.6 36.6383 9.55 35.8783 9.52 35.1083C9.52 35.0683 9.52 35.0283 9.52 34.9883C9.52 34.6583 9.51 34.3383 9.51 34.0083C9.51 33.1083 9.55 32.2083 9.62 31.3183H9.36C4.15 31.2183 0.09 35.1383 0 40.3483L0.12 48.9483V236.798C0.12 243.428 5.49 248.798 12.12 248.798H154.12C160.75 248.798 166.12 243.428 166.12 236.798V45.7983C166.12 39.1683 160.75 33.7983 154.12 33.7983H154.1Z" fill={bg[1]} />
          <path fillRule="evenodd" clipRule="evenodd" d="M8.71997 37.8088C9.01997 40.4788 9.61997 43.0487 10.5 45.4987C10.54 45.3887 10.6 45.2787 10.7 45.1987C10.92 45.0287 11.21 45.0188 11.44 45.1488C10.59 42.7888 10.01 40.2987 9.71997 37.7188L8.71997 37.8187V37.8088Z" fill={bg[1]} />
          <path fillRule="evenodd" clipRule="evenodd" d="M14.4501 52.2095C14.5901 52.0995 14.6701 51.9395 14.6901 51.7695C17.4033 56.0061 21.0599 59.5845 25.3639 62.206L24.7019 62.9728C20.3313 60.2808 16.6158 56.6275 13.8501 52.3095C14.0501 52.3695 14.2701 52.3495 14.4501 52.2095ZM26.4672 63.9885C31.2409 66.5474 36.6962 67.9995 42.4901 67.9995V66.9995C36.9464 66.9995 31.7226 65.6299 27.1373 63.2123L26.4672 63.9885Z" fill={bg[1]} />
        </g>

        <foreignObject x="12" y="3" width="62" height="62" fill="#D9D9D9">
          <div className="w-full h-full">
            <Image
              src={personData.profile_path
                ? ImagePath + personData.profile_path : '/no-image-2.webp'}
              alt="crew image"
              width={100}
              height={100}
              placeholder="blur"
              blurDataURL={PLACEHOLDER_IMAGE.TMDB_IMAGE}
              className="w-fullp h-full object-cover rounded-full" />
          </div>
        </foreignObject>
        <foreignObject x="82" y="38" width="79" height="50">
          <div className="w-full h-full px-2 py-1">
            <p className=" font-semibold flex justify-end [font-size:10px] leading-[14px]">
              <span>
                {personDetail?.deathday &&
                  personDetail?.birthday
                  ? (
                    Number(personDetail.deathday.slice(0, 4)) -
                    Number(personDetail.birthday.slice(0, 4))
                  )
                  : personDetail?.birthday
                    ? (
                      new Date().getFullYear() -
                      Number(personDetail.birthday.slice(0, 4))
                    )
                    : <span>N/A</span>}
              </span>
            </p>
          </div>
        </foreignObject>
        <foreignObject x="2" y="89" width="162" height="151">
          <div className="w-full h-full px-2 [font-size:10px] leading-[14px] grid ">
            <div className="bg-red-500p">
              <h3 className="font-bold text-sm">{personData.name}</h3>
              <p className="py-1">
                {personTVCast?.character 
                  ? personTVCast.character === 'Self' ? personData.name 
                  : personTVCast.character : 'N/A'
                }
              </p>
              <p className="py-1">{personTVCast?.known_for_department}</p>
            </div>

            <div className=" grid items-end">
              <p>{personDetail.birthday ? personDetail.birthday : 'N/A'}</p>
              <p className="max-h-[40px] overflow-hidden overflow-y-auto">
                {personTVCast?.character ? personDetail.place_of_birth : 'N/A'}
              </p>
              <p>{getGenderByNumber(personData.gender)}</p>
            </div>
          </div>
        </foreignObject>

      </svg>









  ) : 
  (
      <svg width="200" height="100%" viewBox="0 0 167 249" fill="none" xmlns="http://www.w3.org/2000/svg"
        className="cursor-pointer "
        onClick={() => {
          setScrollTop(document.documentElement.scrollTop)
          window.scroll({
            top: 0,
            left: 0,
          });
          document.body.style.overflow = 'hidden'
          setScrollingToTop(true);
          setIsVisiblePerson(true);
          setPersonDetails(personDetail);
        }}
      >
        <foreignObject x="1.3" y="34" width="165.3" height="215">
          <div className={`bg-red-500p h-full rounded-xl ${bg[0]} opacity-20`}>
            
          </div>
        </foreignObject>

        <g>
          <path d="M42.48 1C42.7561 1 42.98 0.776142 42.98 0.5C42.98 0.223858 42.7561 0 42.48 0C42.2038 0 41.98 0.223858 41.98 0.5C41.98 0.776142 42.2038 1 42.48 1Z" fill={bg[1]} />
          <path d="M20.3401 9.37109C20.6162 9.37109 20.8401 9.14724 20.8401 8.87109C20.8401 8.59495 20.6162 8.37109 20.3401 8.37109C20.0639 8.37109 19.8401 8.59495 19.8401 8.87109C19.8401 9.14724 20.0639 9.37109 20.3401 9.37109Z" fill={bg[1]} />
          <path d="M40.48 1.05859C40.7561 1.05859 40.98 0.834736 40.98 0.558594C40.98 0.282451 40.7561 0.0585938 40.48 0.0585938C40.2038 0.0585938 39.98 0.282451 39.98 0.558594C39.98 0.834736 40.2038 1.05859 40.48 1.05859Z" fill={bg[1]} />
          <path d="M18.8799 10.75C19.156 10.75 19.3799 10.5261 19.3799 10.25C19.3799 9.97386 19.156 9.75 18.8799 9.75C18.6037 9.75 18.3799 9.97386 18.3799 10.25C18.3799 10.5261 18.6037 10.75 18.8799 10.75Z" fill={bg[1]} />
          <path d="M38.48 1.25C38.7561 1.25 38.98 1.02614 38.98 0.75C38.98 0.473858 38.7561 0.25 38.48 0.25C38.2038 0.25 37.98 0.473858 37.98 0.75C37.98 1.02614 38.2038 1.25 38.48 1.25Z" fill={bg[1]} />
          <path d="M17.5 12.1992C17.7761 12.1992 18 11.9754 18 11.6992C18 11.4231 17.7761 11.1992 17.5 11.1992C17.2239 11.1992 17 11.4231 17 11.6992C17 11.9754 17.2239 12.1992 17.5 12.1992Z" fill={bg[1]} />
          <path d="M36.48 1.53906C36.7561 1.53906 36.98 1.3152 36.98 1.03906C36.98 0.76292 36.7561 0.539062 36.48 0.539062C36.2038 0.539062 35.98 0.76292 35.98 1.03906C35.98 1.3152 36.2038 1.53906 36.48 1.53906Z" fill={bg[1]} />
          <path d="M16.1799 13.7617C16.4561 13.7617 16.6799 13.5379 16.6799 13.2617C16.6799 12.9856 16.4561 12.7617 16.1799 12.7617C15.9038 12.7617 15.6799 12.9856 15.6799 13.2617C15.6799 13.5379 15.9038 13.7617 16.1799 13.7617Z" fill={bg[1]} />
          <path d="M34.48 1.96094C34.7561 1.96094 34.98 1.73708 34.98 1.46094C34.98 1.1848 34.7561 0.960938 34.48 0.960938C34.2038 0.960938 33.98 1.1848 33.98 1.46094C33.98 1.73708 34.2038 1.96094 34.48 1.96094Z" fill={bg[1]} />
          <path d="M14.8701 15.5312C15.1463 15.5312 15.3701 15.3074 15.3701 15.0312C15.3701 14.7551 15.1463 14.5312 14.8701 14.5312C14.594 14.5312 14.3701 14.7551 14.3701 15.0312C14.3701 15.3074 14.594 15.5312 14.8701 15.5312Z" fill={bg[1]} />
          <path d="M32.48 2.51953C32.7561 2.51953 32.98 2.29567 32.98 2.01953C32.98 1.74339 32.7561 1.51953 32.48 1.51953C32.2038 1.51953 31.98 1.74339 31.98 2.01953C31.98 2.29567 32.2038 2.51953 32.48 2.51953Z" fill={bg[1]} />
          <path d="M13.76 17.2617C14.0362 17.2617 14.26 17.0379 14.26 16.7617C14.26 16.4856 14.0362 16.2617 13.76 16.2617C13.4839 16.2617 13.26 16.4856 13.26 16.7617C13.26 17.0379 13.4839 17.2617 13.76 17.2617Z" fill={bg[1]} />
          <path d="M30.48 3.21875C30.7561 3.21875 30.98 2.99489 30.98 2.71875C30.98 2.44261 30.7561 2.21875 30.48 2.21875C30.2038 2.21875 29.98 2.44261 29.98 2.71875C29.98 2.99489 30.2038 3.21875 30.48 3.21875Z" fill={bg[1]} />
          <path d="M12.73 19.1016C13.0061 19.1016 13.23 18.8777 13.23 18.6016C13.23 18.3254 13.0061 18.1016 12.73 18.1016C12.4538 18.1016 12.23 18.3254 12.23 18.6016C12.23 18.8777 12.4538 19.1016 12.73 19.1016Z" fill={bg[1]} />
          <path d="M28.48 4.05859C28.7561 4.05859 28.98 3.83474 28.98 3.55859C28.98 3.28245 28.7561 3.05859 28.48 3.05859C28.2038 3.05859 27.98 3.28245 27.98 3.55859C27.98 3.83474 28.2038 4.05859 28.48 4.05859Z" fill={bg[1]} />
          <path d="M11.8 21.0586C12.0762 21.0586 12.3 20.8347 12.3 20.5586C12.3 20.2825 12.0762 20.0586 11.8 20.0586C11.5239 20.0586 11.3 20.2825 11.3 20.5586C11.3 20.8347 11.5239 21.0586 11.8 21.0586Z" fill={bg[1]} />
          <path d="M26.48 5.07031C26.7561 5.07031 26.98 4.84645 26.98 4.57031C26.98 4.29417 26.7561 4.07031 26.48 4.07031C26.2038 4.07031 25.98 4.29417 25.98 4.57031C25.98 4.84645 26.2038 5.07031 26.48 5.07031Z" fill={bg[1]} />
          <path d="M10.98 23.1406C11.2561 23.1406 11.48 22.9168 11.48 22.6406C11.48 22.3645 11.2561 22.1406 10.98 22.1406C10.7038 22.1406 10.48 22.3645 10.48 22.6406C10.48 22.9168 10.7038 23.1406 10.98 23.1406Z" fill={bg[1]} />
          <path d="M24.48 6.25C24.7561 6.25 24.98 6.02614 24.98 5.75C24.98 5.47386 24.7561 5.25 24.48 5.25C24.2038 5.25 23.98 5.47386 23.98 5.75C23.98 6.02614 24.2038 6.25 24.48 6.25Z" fill={bg[1]} />
          <path d="M10.26 25.3398C10.5362 25.3398 10.76 25.116 10.76 24.8398C10.76 24.5637 10.5362 24.3398 10.26 24.3398C9.98387 24.3398 9.76001 24.5637 9.76001 24.8398C9.76001 25.116 9.98387 25.3398 10.26 25.3398Z" fill={bg[1]} />
          <path d="M22.48 7.64062C22.7561 7.64062 22.98 7.41677 22.98 7.14062C22.98 6.86448 22.7561 6.64062 22.48 6.64062C22.2038 6.64062 21.98 6.86448 21.98 7.14062C21.98 7.41677 22.2038 7.64062 22.48 7.64062Z" fill={bg[1]} />
          <path d="M9.68994 27.7109C9.96608 27.7109 10.1899 27.4871 10.1899 27.2109C10.1899 26.9348 9.96608 26.7109 9.68994 26.7109C9.4138 26.7109 9.18994 26.9348 9.18994 27.2109C9.18994 27.4871 9.4138 27.7109 9.68994 27.7109Z" fill={bg[1]} />
          <path d="M9.26001 30.2188C9.53615 30.2188 9.76001 29.9949 9.76001 29.7188C9.76001 29.4426 9.53615 29.2188 9.26001 29.2188C8.98387 29.2188 8.76001 29.4426 8.76001 29.7188C8.76001 29.9949 8.98387 30.2188 9.26001 30.2188Z" fill={bg[1]} />
          <path d="M12.8901 50.1992C13.1663 50.1992 13.3901 49.9754 13.3901 49.6992C13.3901 49.4231 13.1663 49.1992 12.8901 49.1992C12.614 49.1992 12.3901 49.4231 12.3901 49.6992C12.3901 49.9754 12.614 50.1992 12.8901 50.1992Z" fill={bg[1]} />
          <path d="M11.9199 48.1992C12.1961 48.1992 12.4199 47.9754 12.4199 47.6992C12.4199 47.4231 12.1961 47.1992 11.9199 47.1992C11.6438 47.1992 11.4199 47.4231 11.4199 47.6992C11.4199 47.9754 11.6438 48.1992 11.9199 48.1992Z" fill={bg[1]} />
          <path d="M11.1001 46.1992C11.3762 46.1992 11.6001 45.9754 11.6001 45.6992C11.6001 45.4231 11.3762 45.1992 11.1001 45.1992C10.824 45.1992 10.6001 45.4231 10.6001 45.6992C10.6001 45.9754 10.824 46.1992 11.1001 46.1992Z" fill={bg[1]} />
          <path d="M14.05 52.1992C14.3262 52.1992 14.55 51.9754 14.55 51.6992C14.55 51.4231 14.3262 51.1992 14.05 51.1992C13.7739 51.1992 13.55 51.4231 13.55 51.6992C13.55 51.9754 13.7739 52.1992 14.05 52.1992Z" fill={bg[1]} />
          <path fillRule="evenodd" clipRule="evenodd" d="M154.1 33.7983H116.5L90.5 31.3983V37.5283L116.8 34.7983H154.1C160.17 34.7983 165.1 39.7183 165.1 45.7983V236.798C165.1 242.878 160.17 247.798 154.1 247.798H12.1C6.02 247.798 1.1 242.878 1.1 236.798V45.7983C1.1 44.3983 1.36 43.0483 1.84 41.8183C2.93 39.5483 5.12 37.9183 7.72 37.5783L9.68 37.3883C9.6 36.6383 9.55 35.8783 9.52 35.1083C9.52 35.0683 9.52 35.0283 9.52 34.9883C9.52 34.6583 9.51 34.3383 9.51 34.0083C9.51 33.1083 9.55 32.2083 9.62 31.3183H9.36C4.15 31.2183 0.09 35.1383 0 40.3483L0.12 48.9483V236.798C0.12 243.428 5.49 248.798 12.12 248.798H154.12C160.75 248.798 166.12 243.428 166.12 236.798V45.7983C166.12 39.1683 160.75 33.7983 154.12 33.7983H154.1Z" fill={bg[1]} />
          <path fillRule="evenodd" clipRule="evenodd" d="M8.71997 37.8088C9.01997 40.4788 9.61997 43.0487 10.5 45.4987C10.54 45.3887 10.6 45.2787 10.7 45.1987C10.92 45.0287 11.21 45.0188 11.44 45.1488C10.59 42.7888 10.01 40.2987 9.71997 37.7188L8.71997 37.8187V37.8088Z" fill={bg[1]} />
          <path fillRule="evenodd" clipRule="evenodd" d="M14.4501 52.2095C14.5901 52.0995 14.6701 51.9395 14.6901 51.7695C17.4033 56.0061 21.0599 59.5845 25.3639 62.206L24.7019 62.9728C20.3313 60.2808 16.6158 56.6275 13.8501 52.3095C14.0501 52.3695 14.2701 52.3495 14.4501 52.2095ZM26.4672 63.9885C31.2409 66.5474 36.6962 67.9995 42.4901 67.9995V66.9995C36.9464 66.9995 31.7226 65.6299 27.1373 63.2123L26.4672 63.9885Z" fill={bg[1]} />
        </g>

        <foreignObject x="12" y="3" width="62" height="62" fill="#D9D9D9">
          <div className="w-full h-full">
            <Image
              src={personData.profile_path
                ? ImagePath + personData.profile_path : '/no-image-2.webp'}
              alt="crew image"
              width={100}
              height={100}
              placeholder="blur"
              blurDataURL={PLACEHOLDER_IMAGE.TMDB_IMAGE}
              className="w-fullp h-full object-cover rounded-full" />
          </div>
        </foreignObject>
        <foreignObject x="82" y="38" width="79" height="50">
          <div className="w-full h-full px-2 py-1">
            <p className=" font-semibold flex justify-end [font-size:10px] leading-[14px]">
              <span>
                {personDetail?.deathday &&
                  personDetail?.birthday
                  ? (
                    Number(personDetail.deathday.slice(0, 4)) -
                    Number(personDetail.birthday.slice(0, 4))
                  )
                  : personDetail?.birthday
                    ? (
                      new Date().getFullYear() -
                      Number(personDetail.birthday.slice(0, 4))
                    )
                    : <span>N/A</span>}
              </span>
            </p>
          </div>
        </foreignObject>
        <foreignObject x="2" y="89" width="162" height="151">
          <div className="w-full h-full px-2 [font-size:10px] leading-[14px] grid ">
            <div className="bg-red-500p">
              <h3 className="font-bold text-sm">{personData.name}</h3>
              <p className="py-1">
                {personTVCast?.character 
                  ? personTVCast.character === 'Self' ? personData.name 
                  : personTVCast.character : 'N/A'
                }
              </p>
              <p className="py-1">{personTVCast?.known_for_department}</p>
            </div>

            <div className="bg-green-500p grid items-end text-">
              <p>{personDetail.birthday ? personDetail.birthday : 'N/A'}</p>
              <p className="max-h-[40px] overflow-hidden overflow-y-auto">
                {personTVCast?.character ? personDetail.place_of_birth : 'N/A'}
              </p>
              <p>{getGenderByNumber(personData.gender)}</p>
            </div>
          </div>
        </foreignObject>

      </svg>
  )
}
