import type { MediaTypeInfoType } from '@/app/lib/MediaTypeInfoTypes'
import { memo } from 'react'

export default memo( function Keywords({
  keywords
}: {
  keywords: MediaTypeInfoType['keywords']
}) {
  return (
    <>
      {
        'keywords' in keywords 
        ? (
            keywords.keywords.map((keyword, i) => (
              <li key={keyword.id} className="whitespace-nowrap">
                {keyword.name}
              </li>
            ))
          )
          
          : 'results' in keywords 
          ? (
            keywords.results.map((result, i) => (
              <li key={i} className="whitespace-nowrap">
                {result.name}
              </li>
            ))
          )
          : null
      }
    </>
  )
})