'use client'

import useSeasonsStore from "@/app/(__pages__)/stores/seasons-store/seasons-store";
import Options from "./Options";

export default function SelectSeason() {

  const { 
    setIsVisibleSeasons, setSelectedSeason, options, isVisibleSelectSeason, setIsVisibleSelectSeason, 
  } = useSeasonsStore();



  function onchange(id: number) {
    setSelectedSeason(
      options.find(option => option.id === id) || options[0]
    );
    setIsVisibleSeasons(true);
    setIsVisibleSelectSeason(false);
  }




  return (
    <div className={`bg-neutral-700/50 absolute w-full h-screen top-0 z-20 ${isVisibleSelectSeason ? 'left-0' : 'left-[-100%]'} overflow-hidden mb-4 cursor-pointer`}
      onClick={() => setIsVisibleSelectSeason(false)}
    >
      <ul className="bg-neutral-700 absolute top-[50px] right-0  p-4 bottom-0 z-20 overflow-hidden overflow-y-auto divide-y divide-zinc-600">
        <Options
          options={options}
          onchange={onchange} 
        />
      </ul>
    </div>
  );
}
