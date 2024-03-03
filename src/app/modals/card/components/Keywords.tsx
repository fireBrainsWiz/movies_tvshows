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
              <li key={keyword.id} className="list-disc">
                {keyword.name}
              </li>
            ))
          )
          
          : 'results' in keywords 
          ? (
            keywords.results.map((result, i) => (
              <li key={i} className="list-disc">
                {result.name}
              </li>
            ))
          )
          : null
      }
    </>
  )
})