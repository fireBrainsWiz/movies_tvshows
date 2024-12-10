import SlickSlider from "@/app/(__pages__)/(top_links)/popular/crime-drama-mystery/SlickSlider"


export default function Recommendations(
  {id}: {id: number}
  ) {

  return (
    <div>
      <SlickSlider 
        genre={null} 
        title='recommendations'
        id={id}
      />
    </div>
  )
}