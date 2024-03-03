import { MediaTypeInfoType } from "@/app/lib/MediaTypeInfoTypes"
import { memo } from "react"

export default memo(function SpokenLanguages(
  {details}: {details: MediaTypeInfoType['details']}
) {

  return (
    <p className="my-10 mx-4">
      Spoken languages: {
      details.spoken_languages && details.spoken_languages.map((language) => (
        `${language.english_name} (${language.iso_639_1})`
      )).join(', ')
      }
    </p>
  )
})