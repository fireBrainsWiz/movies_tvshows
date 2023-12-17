import { IoAddOutline } from "react-icons/io5";

export default function AddToMyListButton() {
  return (
    <div>
      <button className="absolute bottom-[10px] left-[10px] z-10 bg-stone-500/60 rounded-full w-[4vmin] h-[4vmin] flex items-center justify-center">
        <IoAddOutline size="100%"/>
      </button>
    </div>
  )
}