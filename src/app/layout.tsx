import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Toast from './(__secure__)/components/Toast'
import TopNav from './(__secure__)/components/TopNav'
import WelcomeUser from './client/components/WelcomeUser'
import { cookies } from "next/headers";
import ReactQueryClientProvider from './(__pages__)/providers/ReactQueryClientProvider'
import CardPage from './modals/card/CardPage'
import {CardBeingViewedContextProvider} from './(__pages__)/context/CardBeingViewedContext'
import { ToggleMenuContextProvider } from './(__pages__)/context/ToggleMenuContext'
import Menu from './modals/menu/Menu'
import { ToggleSearchContextProvider } from './(__pages__)/context/ToggleSearchContext'
import Search from './modals/search/Search'
import { MoviesOrTVshowsLinksContextProvider } from './(__pages__)/context/MoviesOrTVshowsLinksContext'
import { MoviesOrTVshowsInfoContextProvider } from './(__pages__)/context/MoviesOrTVshowsInfoContext'
// import { ThemeContextProvider } from './(__pages__)/context/ThemeContext'
import AllImages from './modals/all-images-and-videos/AllImages'
import {ToggleShowPersonContextProvider } from './(__pages__)/context/ToggleShowPersonContext'
import Person from './modals/card/components/person/Person'
import AllVideos from './modals/all-images-and-videos/AllVideos'
import Seasons from './modals/card/components/seasons/Seasons'
import CastAndCrew from './modals/card/components/seasons/episode-cast-crew/CastAndCrew'
import SavedItems from './modals/saved-items/SavedItems'
import NetworkImagesViewer from './modals/search/components/company/NetworkImagesViewer'
import CompanyImagesViewer from './modals/search/components/company/CompanyImagesViewer'
import SelectSeason from './modals/card/components/seasons/SelectSeason'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Moviies and TVshows information app',
  description: 'An app about movie and tv shows information and also about actors and actresses',
}




export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies();
  const isGuess = cookieStore.get('TMDB_guest_session_id')?.value
  
  return (
    <html lang="en">
        <body className={`${inter.className} relative overflow-x-hiddenp`}>
          <ReactQueryClientProvider>
            <MoviesOrTVshowsLinksContextProvider>
              <MoviesOrTVshowsInfoContextProvider>
                <CardBeingViewedContextProvider>
                  <ToggleMenuContextProvider>
                    <ToggleSearchContextProvider>
                      {/* <ThemeContextProvider> */}

                        <ToggleShowPersonContextProvider>
                        <>{/* <TopNav /> */}</>
                        {/* {!isGuess && <WelcomeUser /> } */}
                        <main >
                          {children}
                          <canvas id="canvas"></canvas>
                        </main>

                          <br /> {/*to be removed*/}
                          <Menu />
                          <SavedItems />
                          <Search />
                          <CardPage />
                          <Seasons />
                          <SelectSeason />
                          <CompanyImagesViewer />
                          <NetworkImagesViewer />
                          <AllImages />
                          <AllVideos />
                          <CastAndCrew />
                          <Person />
                          <Toast />
                        </ToggleShowPersonContextProvider>

                      {/* </ThemeContextProvider> */}
                    </ToggleSearchContextProvider>
                  </ToggleMenuContextProvider>
                </CardBeingViewedContextProvider>
              </MoviesOrTVshowsInfoContextProvider>
            </MoviesOrTVshowsLinksContextProvider>
          </ReactQueryClientProvider>
        </body>
    </html>
  )
}


// TOPLINKS: {
//   AIRINGTODAY: string,
//   ONTHEAIR: string,
//   POPULAR: string,
//   TOPRATED: string
// },