import { TrailerType } from '@/app/lib/types'
import { memo } from 'react'

export default memo( function Trailer({
  trailers
}: {
  trailers: TrailerType[]
}) {
  return (
    <>
      {
        trailers?.[0] ?  (
        <iframe
          onClick={() => console.log('clicked')}
          title={trailers[0]?.name}
          key={trailers[0]?.key}
          className="w-full mx-auto mt-7p min-h-[216px] h-full"
          src={`https://www.${trailers[0]?.site}.com/embed/${trailers[0]?.key}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;  "
          allowFullScreen
        >
          <p>Your browser does not support iframes.</p>
        </iframe>
      )
      : (
        <div className="w-full h-[150px] mx-auto flex items-center justify-center  text-center italic">Sorry, no traliers available 😢</div>
        )
      }
    </>
  )
})

// export default memo( function Trailer({
//   trailers
// }: {
//   trailers: TrailerType[]
// }) {
//   return (
//     <>
//       {
//         trailers?.[0] ?  (
//         <iframe
//           title={trailers[0]?.name}
//           key={trailers[0]?.key}
//           className="w-[95%] mx-auto mt-7 min-h-[216px]"
//           src={`https://www.${trailers[0]?.site}.com/embed/${trailers[0]?.key}`}
//           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//           allowFullScreen
//         >
//           <p>Your browser does not support iframes.</p>
//         </iframe>
//       )
//       : (
//         <div className="w-full h-[150px] mx-auto flex items-center justify-center  text-center italic">Sorry, no traliers available 😢</div>
//         )
//       }
//     </>
//   )
// })