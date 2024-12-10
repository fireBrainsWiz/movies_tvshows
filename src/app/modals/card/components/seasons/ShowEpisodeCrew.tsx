import useSeasonsStore from "@/app/(__pages__)/stores/seasons-store/seasons-store";
import { SeasonDetails } from "@/app/lib/MoviesOrTVshowsInfoContextType_tvshows";
import { MdKeyboardArrowDown } from "react-icons/md";


export function ShowEpisodeCrew({
  episode
}: {
  episode: SeasonDetails['episodes'][number];
}) {
  const {setShowEpisodeCastOrCrew} = useSeasonsStore()

  return (
    <button 
      className="bg-lime-400/30p flex items-center justify-center p-2p"
      onClick={() => {
        setShowEpisodeCastOrCrew({
          isVisibleEpisodeCastOrCrew: true, 
          episodeCastOrCrew: episode.crew
        })
      }}
      >
      <span>Crew</span>
      <span><MdKeyboardArrowDown size={40} /></span>
    </button>
  );
}
