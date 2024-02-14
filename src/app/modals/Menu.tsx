'use client'

import { useContext, useEffect, useRef, } from "react"
import CardBeingViewedContext from "../(__pages__)/context/CardBeingViewedContext"
import { TfiClose } from "react-icons/tfi";
import ToggleMenuContext from "../(__pages__)/context/ToggleMenuContext";
import MoviesOrTVshowsLinksContext from "../(__pages__)/context/MoviesOrTVshowsLinksContext";


export default function Menu() {

  const menuRef = useRef<HTMLDivElement | null>(null)
  
  const {isVisibleMenu, setIsVisibleMenu} = useContext(ToggleMenuContext)
  const {links} = useContext(MoviesOrTVshowsLinksContext)

  function handleClick() {
    setIsVisibleMenu(false)
    document.body.style.overflow = 'auto'
  }
  

  return (
    <div className={`menu bg-stone-900/95 absolute w-full top-0 bottom-0 z-10 ${isVisibleMenu ? 'left-0' : 'left-[-100%]'} [transition:left_300ms_ease-in-out]`}
    ref={menuRef}
    >

      <ul
        className="grid p-4 gap-4 bg-stone-950 w-[75%] overflow-y-scroll max-w-[500px] absolute top-0 bottom-0"
        style={{height: `${innerHeight}px`}}
      >
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
        <li>10</li>
        <li>11</li>
        <li>12</li>
        <li>13</li>
        <li>14</li>
        <li>15</li>
        <li>16</li>
        <li>17</li>
        <li>18</li>
        <li>19</li>
        <li>20</li>
        <li>21</li>
        <li>22</li>
        <li>23</li>
        <li>24</li>
        <li>25</li>

        {
          [...Object.values(links.TOPLINKS)].map((link) => (
            <li key={link}>
              <a href={link}>{link}</a>
            </li>
          ))
        }
      </ul>

      <div 
        className="text-end p-4 bg-red-500p w-full h-full"
        onClick={handleClick}
        > 
        <button className="text-white text-2xl bg-stone-500 p-2">
          <TfiClose />
        </button>
      </div>

    </div>
  )
}