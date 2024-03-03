import { memo } from "react"
import { starDirectorWriterCreator } from "../lib/utils"
import { MediaTypeInfoType } from "@/app/lib/MediaTypeInfoTypes"


export default memo( function StarDirectorWriterCreator(
  {
    credits, details
  }: {
    credits: MediaTypeInfoType['credits'],
    details: MediaTypeInfoType['details']
  }) {
  return (
    <>
          {/* starDirectorWriter */}
          {
            credits.crew &&
            starDirectorWriterCreator(details, null)[0] &&

            <div className="flex flex-wrap items-center gap-x-4 mx-4 my-10">
              <span className="text-lg">
                {
                  starDirectorWriterCreator(details, null)[0]
                }
              </span> 
              <ul className=" flex flex-wrap gap-x-10 "
              style={{
                listStyleType: starDirectorWriterCreator(details, null)[1]?.length === 1 ? 'none' : 'disc'
              }}
              >
                {
                  starDirectorWriterCreator(details, null)[1]?.map(
                    star => (
                    <li key={star.id} >
                      {star.name}
                    </li>
                  ))
                }
              </ul>
            </div>
          }
          
          {
            credits.crew && 
            starDirectorWriterCreator(credits, 'Director')[0] &&
            
            <div className="flex flex-wrap items-center gap-x-4 mx-4 my-10">
                <span className="text-lg">
                {
                  starDirectorWriterCreator(credits, 'Director')[0]
                }
              </span> 
              <ul className="flex flex-wrap gap-x-10 "
              style={{
                listStyleType: starDirectorWriterCreator(credits, 'Director')[1]?.length === 1 ? 'none' : 'disc'
              }}
              >
                {
                  starDirectorWriterCreator(credits, 'Director')[1]?.map(
                    star => (
                    <li key={star.id} >
                      {star.name}
                    </li>
                  ))
                }
              </ul>
            </div>
          }
        
          {
            credits.crew && 
            starDirectorWriterCreator(credits, 'Writer')[0] &&

            <div className="flex flex-wrap items-center gap-x-4  mx-4 my-10">
              <span className="text-lg">
                {
                  starDirectorWriterCreator(credits, 'Writer')[0]
                }
              </span> 
              <ul className=" flex flex-wrap gap-x-10"
              style={{
                listStyleType: starDirectorWriterCreator(credits, 'Writer')[1]?.length === 1 ? 'none' : 'disc' 
              }}
              >
                {
                  starDirectorWriterCreator(credits, 'Writer')[1]?.map(
                    star => (
                    <li key={star.id} >
                      {star.name}
                    </li>
                  ))
                }
              </ul>
            </div>
          }
    </>
  )
})