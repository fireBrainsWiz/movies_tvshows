import { CommonTypes } from '@/app/lib/MediaTypeInfoTypes';
import { useEffect, useState, useContext } from 'react';
MoviesOrTVshowsLinksContext
import axios from 'axios';
import { TMDBOptions } from '@/app/client/helpers/TMDB_API';
import MoviesOrTVshowsLinksContext from '@/app/(__pages__)/context/MoviesOrTVshowsLinksContext';
import ReviewResult from './ReviewResult';
import LoadMoreResults from './LoadMoreResults';


export default function Reviews({cardID = 82856}) {
  const { links } = useContext(MoviesOrTVshowsLinksContext)

  const [reviews, setReviews] = 
  useState<CommonTypes['review']>()
  const [page, setPage] = useState(1)
  const [showAddMoreResults, setShowAddMoreResults] = 
  useState(false)
  

  useEffect(() => {
    (async () => {
      if (!cardID) return
      
      try {
        const {data}: {data: typeof reviews} = await axios(
          `${links.INFOS.review.beforeStr}${cardID}${links.INFOS.review.afterStr}${page}`,
          TMDBOptions
        )

        if (!data) return 

        setReviews(prev => ({
          ...prev,
          ...data,
          results: prev?.results 
            ? [...prev.results, ...data.results]
            : data.results
        }))
        // setReviews({
        //   id: data.id,
        //   page: data.page,
        //   results: data.results,
        //   total_pages: data.total_pages,
        //   total_results: data.total_results
        // })

      } catch (error) {
        console.error(error)
      }
    })()
  }, [
    cardID, page,
    links.INFOS.review.beforeStr, links.INFOS.review.afterStr, 
  ])

  return  reviews?.results?.[0]  ? (
    <div className="flex flex-wrap justify-center gap-6 p-2 my-10 border-b border-gray-500">
      <p className="text-2xl text-center ">
          Review{reviews?.results?.length > 1 ? 's' : ''}
      </p> 
      <ul className="grid grid-flow-col overflow-x-auto justify-start gap-6 py-6 pb-10 ">
        {
          reviews?.results
          .map((review, i, {length}) => {
            return (
              i === length - 1 
              ? (
                <li key={i}>
                  <ReviewResult 
                    review={review}
                    showAddMoreResults={showAddMoreResults}
                    setShowAddMoreResults={setShowAddMoreResults} 
                  />
                </li>
                )
              : (
                <li key={i}>
                  <ReviewResult review={review} />
                </li>
              )
            )
          })
        }
      </ul>

      {
        showAddMoreResults && 
        (reviews?.page && reviews?.total_pages) &&
        (reviews?.page < reviews?.total_pages) && (
          <LoadMoreResults
            setShowAddMoreResults={setShowAddMoreResults}
            setPage={setPage}
          />  
        )
      }
    </div>
  ) : null
}


