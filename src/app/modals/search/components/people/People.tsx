import { ResultType } from "@/app/lib/types";
import { PopularPeopleList } from "@/app/(__pages__)/popular-people/layout";
import PopularPeopleCards, { CardData, ToViewCoordsAndInfo } from './PopularPeopleCards';
import ToViewSVG from "./modal/ToViewSVG";

// type Data = {
//   page: number
//   results: ResultType[]
//   total_pages: number
//   total_results: number
// }
export function People({
  results, itemsContainerParentRef, page, currentSlide, slideIndex,
  setIsActiveToViewSVG,
  setToViewCoordsAndInfo,
  setCardData,
}: {
  results: ResultType[] | PopularPeopleList['results'];
  itemsContainerParentRef: React.RefObject<HTMLDivElement | null>;
  page: number;
  currentSlide: number;
  slideIndex: number;

  setIsActiveToViewSVG: (_: boolean) => void,
  setToViewCoordsAndInfo: React.Dispatch<React.SetStateAction<ToViewCoordsAndInfo>>,
  setCardData: React.Dispatch<React.SetStateAction<CardData>>,
}) {
  // console.log(results)
  // if (!('known_for' in results)) return null
  return (
    <PopularPeopleCards page={page}
      itemsContainerParentRef={itemsContainerParentRef}
      results={results! as PopularPeopleList['results']}
      currentSlide={currentSlide}
      slideIndex={slideIndex} 

      setIsActiveToViewSVG={setIsActiveToViewSVG}
      setToViewCoordsAndInfo={setToViewCoordsAndInfo}
      setCardData={setCardData}
    />
    // null
  );
}
