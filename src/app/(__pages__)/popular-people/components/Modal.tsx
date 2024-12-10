'use client';

import { TfiClose } from "react-icons/tfi";


export function Modal({
  isActiveToViewSVG, setIsActiveToViewSVG
}: {
  isActiveToViewSVG: boolean;
  setIsActiveToViewSVG: React.Dispatch<React.SetStateAction<boolean>>;
}) {

  function handleModalClick() {
    document.body.style.overflow = 'auto';
    setIsActiveToViewSVG(false);
  }

  return (
    <div
      onClick={handleModalClick}
      className="bg-stone-950/95 absolute inset-0 z-10">
          <button 
          className="text-white text-2xl cursor-pointer  p-4 absolute top-2 right-2"
          >
          <TfiClose />
        </button>
    </div>
  );
}
