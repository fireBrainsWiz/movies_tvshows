'use client';

import { TfiClose } from "react-icons/tfi";


export function Modal({
  isActiveToViewSVG, setIsActiveToViewSVG, itemsContainerParentRef
}: {
  isActiveToViewSVG: boolean;
  setIsActiveToViewSVG: React.Dispatch<React.SetStateAction<boolean>>;
  itemsContainerParentRef: React.RefObject<HTMLDivElement | null>;
}) {

  function handleModalClick() {
    setIsActiveToViewSVG(false);
    const elem = itemsContainerParentRef.current;
    if (!elem) return;
    // elem.style.overflow = 'scroll';
    // elem.scrollTo(0, 0);
  }

  return (
    <div
      onClick={handleModalClick}
      className="bg-stone-950/95 absolute inset-0 z-10 left-0">
          <button 
          className="text-white text-2xl cursor-pointer  p-4 absolute top-2 right-2"
          >
          <TfiClose />
        </button>
    </div>
  );
}
