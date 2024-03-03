import SlickSliderT2 from "@/app/(__pages__)/popular/crime-drama-mystery/SlickSliderT2"


export default function Similar(
  {id}: {id: number}
  ) {
    
  return (
    <div>
      <SlickSliderT2 
        genre={null} 
        title='similar'
        id={id}
      />
    </div>
  )
}
