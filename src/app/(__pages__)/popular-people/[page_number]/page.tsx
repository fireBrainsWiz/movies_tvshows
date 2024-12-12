import { TMDBOptions } from "@/app/client/helpers/TMDB_API"
import { Params, PopularPeopleList } from "../layout"
import PopularPeopleCards from "../components/PopularPeopleCards"
import axios from "axios";


export default async function PopularPeopleDynamicHome({
  params,
}: {
  params: Params,
}) {

  const {results}: PopularPeopleList = await axios(
    `https://api.themoviedb.org/3/person/popular?language=en-US&page=${
      params?.page_number || 1
    }`, TMDBOptions
  ).then(res => res.data) 

  return (
    <div className="bg-slate-500p bg-[#d9d9d9]p bg-[#222]">
      <PopularPeopleCards 
        results={results}
      />
    </div>
  )
}

export const dynamicParams = false // true | false, 

export async function generateStaticParams() {
  return [...Array(500)].map((_,i) => ({
    page_number: (i + 1).toString(),
  }))
}



// export const dynamic = 'force-static'

// export const runtime = 'edge'

// export const revalidate = 60

export async function generateMetadata({params}: {params: Params}) {

  const {results}: PopularPeopleList = await axios(
    `https://api.themoviedb.org/3/person/popular?language=en-US&page=${
      params?.page_number || 1
    }`, TMDBOptions
  ).then(res => res.data)

  // const metadata = results.map(item => (
  //   item.name + ' ' + item.known_for_department +
  //   (item.known_for.map(item => item.title) || []).join(', ')
  // ))

  const metadata = results.map(item => (item.name ))
  const keywords = [...metadata.slice(10)].join(', ')

  return {
    title: `Popular People page ${params?.page_number || 1}`,
    description: `${metadata}`,
    keywords,
  } 
}