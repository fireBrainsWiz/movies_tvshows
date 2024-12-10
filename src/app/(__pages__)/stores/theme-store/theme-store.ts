import { create } from "zustand";


const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: 'system',
  setTheme: (theme: ThemeStoreConf['theme'] ) => set({theme: theme}),

  getThemeOptions: () => getThemeOptions(get().theme),
  possibleThemes: ['system', 'light', 'dark'],
}))


export default useThemeStore 

interface ThemeStore {
  theme: ThemeStoreConf['theme']
  setTheme: (theme: ThemeStoreConf['theme']) => void

  getThemeOptions: () => {
    bg: string
    imgSrc: string
    text: string
  }
  possibleThemes: ['system', 'light', 'dark']
}
  
interface ThemeStoreConf {
  theme: 'system' | 'light' | 'dark'
}

const getThemeOptions = function(theme: ThemeStoreConf['theme']) {
  return  {
    light: {
      bg: '',
      imgSrc: '/white-bg-img-1px.png',
      text: '',
    },
    dark: {
      bg: '',
      imgSrc: '/dark-bg-img-1px.png',
      text: '',
    },
    system: {
      bg: '',
      imgSrc: '',
      text: '',
    },
  }[theme]
  
}


// for white bg
{/* <Image 
src ='/white-bg-img-1px.png'
alt="background image"
width={1} 
height={1}
className="absolute inset-0 -z-10 w-full"
/> */}