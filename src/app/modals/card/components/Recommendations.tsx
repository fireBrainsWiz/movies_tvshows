import SlickSliderT2 from "@/app/(__pages__)/popular/crime-drama-mystery/SlickSliderT2"


export default function Recommendations(
  {id}: {id: number}
  ) {

  return (
    <div>
      <SlickSliderT2 
        genre={null} 
        title='recommendations'
        id={id}
      />
    </div>
  )
}