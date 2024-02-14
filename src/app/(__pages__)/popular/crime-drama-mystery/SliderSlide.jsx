
import Result from "../../components/Result"

export default function SliderSlide({result}) {

  return (
    <div className="bg-rose-700p  flex flex-wrapp items-center justify-between gap-1"
    >
      {
        result.map((res, i) => (
          <div key={i} className="w-[clamp(100px_10vmin_510px)] relative ">
            <Result 
              item={res} 
            />
          </div>
        ))
      }
    </div>
  )
}


// function create4Slides(results = []) {
//   let i = 0
//   const sizes = {
//     xs: 320,
//     sm: 576,
//     md: 768,
//     lg: 1024,
//     xl: 1280,
//     xl2: 1536,
//   }

//   let n = window.innerWidth <= sizes.md
//       ? 5 : innerWidth <= sizes.lg
//       ? 4 : innerWidth <= sizes.xl2
//       ? 2 : 
//         1
      
//   const slides = [...Array(n)].map(_ => [])

//   results.forEach(res => {
//     if (i>n-1) i=0
//     slides[i].push(res)
//     i++
//   });

//   return slides
// }


//? 'https://api.themoviedb.org/3/genre/tv/list?language=en'
const genres = [
    {
      "id": 10759,
      "name": "Action & Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 10762,
      "name": "Kids"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10763,
      "name": "News"
    },
    {
      "id": 10764,
      "name": "Reality"
    },
    {
      "id": 10765,
      "name": "Sci-Fi & Fantasy"
    },
    {
      "id": 10766,
      "name": "Soap"
    },
    {
      "id": 10767,
      "name": "Talk"
    },
    {
      "id": 10768,
      "name": "War & Politics"
    },
    {
      "id": 37,
      "name": "Western"
    }
]


/* 
className="bg-rose-700  flex flex-wrapp items-center justify-center gap-3 px-3p my-8 md:flex-wrapp"
 */