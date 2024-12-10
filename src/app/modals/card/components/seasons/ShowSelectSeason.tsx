import { MdKeyboardArrowDown } from "react-icons/md";
import useSeasonsStore from "@/app/(__pages__)/stores/seasons-store/seasons-store";


export default function ShowSelectSeason() {

  const { 
    selectedSeason, options, 
    setIsVisibleSelectSeason, isVisibleSelectSeason 
  } = useSeasonsStore();
  
  return (
    <button
      className="h-max gap-1 items-start bg-stone-700/30p p-1 flex justify-center" 
        onClick={() => {
          setIsVisibleSelectSeason(true)
        }}
      >
        {
          selectedSeason ? (
            <span className="w-max">
              {selectedSeason.name.slice(0, 9)}
            </span>
          ): (
            <span className="w-max">
              {options[0]?.name.slice(0, 9)}
            </span>
          )
        }

        <span className={`w-max -mt-[3px] ${isVisibleSelectSeason ? 'rotate-180' : ''} transition-transform duration-300`}>
          <MdKeyboardArrowDown size={30}/>  
        </span>
    </button>
  )
}



