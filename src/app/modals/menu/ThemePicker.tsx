import useThemeStore from "@/app/(__pages__)/stores/theme-store/theme-store";
import { FaMoon } from "react-icons/fa6";


export default function ThemePicker() {

  const {theme, setTheme, possibleThemes, getThemeOptions} = useThemeStore()
  // console.log(theme, getThemeOptions().imgSrc)



  return (
    <li className="py-2 my-6 flex items-center gap-2 pl-1">
      <span><FaMoon size={25}/></span>
      <span className="bgred-500 border border-gray-500 rounded-md p-1 divide-x divide-gray-500 flex ">
        {
          possibleThemes.map((_theme) => (
            <button 
              key={_theme} 
              className={`px-4 py-1 ${_theme === theme ? 'bg-gray-500' : ''}`}
              onClick={() => setTheme(_theme)}
            >
              {_theme}
            </button>
          ))
        }
      </span>
    </li>
  )
}


