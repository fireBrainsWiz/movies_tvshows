import SlickSlider from "@/app/(__pages__)/(top_links)/popular/crime-drama-mystery/SlickSlider"


export default function Similar(
  {id}: {id: number}
  ) {
    
  return (
    <div>
      <SlickSlider 
        genre={null} 
        title='similar'
        id={id}
      />
    </div>
  )
}
