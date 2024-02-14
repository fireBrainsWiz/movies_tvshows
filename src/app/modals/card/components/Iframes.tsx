import {TrailerType} from "@/app/lib/types";

export function Iframes({trailers}: {trailers: TrailerType[]}) {
  return (
    <div className="w-full flex flex-wrap gap-4p justify-center">
      {
        trailers && trailers.map((trailer) => {
          return (
            <iframe 
              key={trailer.key}
              className="w-1/4 h-[30vh] p-4"
              src={`https://www.${trailer.site}.com/embed/${trailer.key}`}
            >
              <p>Your browser does not support iframes.</p>
            </iframe>
          )
        })
      }
    </div>
  )
}
