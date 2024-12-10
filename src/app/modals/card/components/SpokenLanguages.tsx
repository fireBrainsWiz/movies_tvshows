import { MediaTypeInfoType } from "@/app/lib/MediaTypeInfoTypes"
import { memo } from "react"

export default memo(function SpokenLanguages(
  {details}: {details: MediaTypeInfoType['details']}
) {

  if (!details.spoken_languages) return null

  // console.log(details.spoken_languages)

  return (
    <div className="p-4 my-10 flex justify-center flex-wrap">
      <p className="text-lg w-full text-center">
        Spoken Language  {details.spoken_languages.length > 1 ? 's' : ''}
      </p>
        <ul className="grid grid-flow-col overflow-x-auto justify-start gap-6 py-6">
          {
            details.spoken_languages && details.spoken_languages.map((language) => (
              <li 
                key={language.english_name} 
                className="flex flex-wrap w-[100px] h-[100px] rounded-[11px] overflow-hidden border border-gray-500 p-1"
              >
                <span className="w-full h-1/2 flex items-center justify-center">
                  {language.name || language.english_name}
                </span>
                <span className="w-1/2 flex items-end flex-wrap uppercase">
                  <span className="w-full">
                    <span className="border-b border-gray-500">
                      {language.iso_639_1.split('')[0]}
                    </span>
                  </span>
                  <span>{language.iso_639_1.split('')[1]}</span>
                </span>
                <span className="w-1/2 flex justify-end items-end uppercase underline decoration-gray-500  pb-1">
                  <span>{language.iso_639_1}</span>
                </span>
              </li>
            ))
          }
        </ul>
    </div>
  )
})