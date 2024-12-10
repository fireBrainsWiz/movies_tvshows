import { useState } from "react";
import { MediaTypeInfoType } from "@/app/lib/MediaTypeInfoTypes";
import StarDirectorWriterCreator, { ButtonOption } from "./StarDirectorWriterCreator";
import { StarDirectorWriterType } from "../lib/utils";


export default function StarDirectorWriterCreatorBar(
  {
    credits, details
  }: {
    credits: MediaTypeInfoType['credits'];
    details: MediaTypeInfoType['details'];
  }) {

  const options: ButtonOption[] = ['director', 'writer', 'creator'];

  const [selectedOption, setSelectedOption] = useState<ButtonOption>(options[0]);
  const [starDirectorWriterResults, setStarDirectorWriterResults] = 
  useState<StarDirectorWriterResultsType | null>(null);
  
  let allItems = starDirectorWriterResults && 
  Object.values(starDirectorWriterResults).flat()


  if (allItems && !allItems[0]) return null

  return (
    <div className="bg-stone-500p w-[95%] my-4 mx-auto ">
      <div className="bg-stone-500 rounded-full h-[50px] flex items-center overflow-x-auto">
        {options.map((item, i) => {
          return  starDirectorWriterResults && 
            starDirectorWriterResults[item] && 
            starDirectorWriterResults[item].length ? (
            <button 
              key={i} 
              onClick={() => setSelectedOption(item)}
              className={`${selectedOption === item ? 'bg-green-700' : 'bg-amber-500'} rounded-full h-[40px] p-4 inline-flex justify-center items-center mx-4`}>
              <span>
                {item}{starDirectorWriterResults[item].length > 1 ? 's' : ''}
              </span>
              <span className="bg-black rounded-full p-1 px-6 ml-2">
                {
                  starDirectorWriterResults[item].length
                }
              </span>
            </button>
          ): (
            null
          )
        }
        )}
      </div>

      <StarDirectorWriterCreator 
        credits={credits} 
        details={details} 
        selected={selectedOption} 
        setStarDirectorWriterResults={setStarDirectorWriterResults}
      />

    </div>
  );
}


// export type StarDirectorWriterResultsType = {
//   [key in ButtonOption]: StarDirectorWriterType
// }

export type StarDirectorWriterResultsType = {
  [key: string]: any
}