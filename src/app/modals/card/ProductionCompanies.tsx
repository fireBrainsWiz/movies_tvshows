import { MediaTypeInfoType } from "@/app/lib/MediaTypeInfoTypes"
import { ImagePath } from "@/app/lib/types"
import Image from "next/image"


export default function ProductionCompanies(
  {companies}: {
    companies: MediaTypeInfoType["details"]["production_companies"]
  }
  ) {
  return (
    <div>
      {companies.map((company) => (
        <div key={company.id}>
          <div>
            <Image 
              src={ImagePath+company.logo_path} 
              alt={company.name} 
              width={100} height={100} 
              className="rounded-full"
            />
          </div>
          <div>
            <p>{company.name}</p>
            <p>{company.origin_country}</p>
          </div>
        </div>
      ))}
    </div>
  )
}