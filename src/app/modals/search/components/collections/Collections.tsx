import { ResultType } from "@/app/lib/types";
import { CollectionType } from "../../ItemsSlide";
import Collection from "./Collection";


export function Collections({
   results,
   itemsContainerParentRef,
   title,
   isOpenCollectionParts,
   setIsOpenCollectionParts,
   setClickedCollectionId
}: {
   results: ResultType[] | CollectionType[];
   itemsContainerParentRef: React.RefObject<HTMLDivElement | null>;
   title: string,
   isOpenCollectionParts: boolean,
   setIsOpenCollectionParts: (_: boolean) => void
   setClickedCollectionId: (_: number | null) => void
   
}) {
//   console.log(results);

   /*
  adult: false
   ​
backdrop_path: "/3IeW8tLUp60HtIRKqTxO303tqSV.jpg"
   ​
id: 122938
   ​
name: "Ring of Fire Collection"
   ​
original_language: "en"
   ​
original_name: "Ring of Fire Collection"
   ​
overview: `Don "The Dragon" Wilson's Ring of Fire Collection`
   ​
poster_path: "/qXwf2oACn4N2O9qof5KkrTxDfnn.jpg"
  */
   return (
   <>
      {
         results.map((result) => (
            <Collection
               key={result.id}
               result={result}
               isOpenCollectionParts={isOpenCollectionParts}
               setIsOpenCollectionParts={setIsOpenCollectionParts}
               itemsContainerParentRef={itemsContainerParentRef}
               title={title}
               setClickedCollectionId={setClickedCollectionId}
            />
         ))
      }  
   </>
   );
}



