import { create } from "zustand";

const useCompanyImagesViewerStore = create<CompanyImagesViewerStore>(set => ({
  companyImagesTrigger: {
    isVisibleCompanyImagesViewer: false, //to be set to false
    companyId: null,//to be set to null, 3
    logoPath: null// to be set to null, '/cm111bsDVlYaC1foL0itvEI4yLG.png'
  },
  setCompanyImagesTrigger: (companyImagesTrigger) => set(_ => ({companyImagesTrigger})),
}))


interface CompanyImagesViewerStore {
  companyImagesTrigger: {
    isVisibleCompanyImagesViewer: boolean
    companyId: number | null
    logoPath: string | null
  }

  setCompanyImagesTrigger: (_: CompanyImagesViewerStore['companyImagesTrigger']) => void
}


export type CompanyDetails = {
  description: string
  headquarters: string
  homepage: string
  id: number
  logo_path: string | null
  name: string
  origin_country: string
  parent_company: 
  | {
      name: string
      id: number
      logo_path: string
    } 
  | null
}

let test = {
  // "description": "",
  // "headquarters": "",
  // "homepage": "",
  // "id": 8,
  // "logo_path": "/78ilmDNTpdCfsakrsLqmAUkFTrO.png",
  // "name": "Fine Line Features",
  // "origin_country": "US",
  "parent_company": {
    "name": "New Line Cinema",
    "id": 12,
    "logo_path": "/2ycs64eqV5rqKYHyQK0GVoKGvfX.png"
  }
}

let testParent ={
  "description": "",
  "headquarters": "Burbank, California",
  "homepage": "https://www.warnerbros.com/company/divisions/motion-pictures",
  "id": 12,
  "logo_path": "/2ycs64eqV5rqKYHyQK0GVoKGvfX.png",
  "name": "New Line Cinema",
  "origin_country": "US",
  "parent_company": null
}


export default useCompanyImagesViewerStore
