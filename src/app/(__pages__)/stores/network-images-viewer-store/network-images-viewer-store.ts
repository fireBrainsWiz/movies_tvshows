import { create } from "zustand";

const useNetworkImagesViewerStore = create<NetworkImagesViewerStore>(set => ({
  networkImagesTrigger: {
    isVisibleNetworkImagesViewer: false, //to be set to false
    networkId: null,//to be set to null 6
    logoPath: null //to be set to null
  },
  setNetworkImagesTrigger: (networkImagesTrigger) => set(_ => ({networkImagesTrigger})),
}))


interface NetworkImagesViewerStore {
  networkImagesTrigger: {
    isVisibleNetworkImagesViewer: boolean
    networkId: number | null
    logoPath: string | null
  }

  setNetworkImagesTrigger: (_: NetworkImagesViewerStore['networkImagesTrigger']) => void
}


export type NetworkImages = {
  id: number;
  logos: {
    aspect_ratio: number;
    file_path: string;
    height: number;
    id: string;
    file_type: string;
    vote_average: number;
    vote_count: number;
    width: number;
  }[]
}

export type NetworkAlternativeNames = {
  id: number,
  results: {
    name: string,
    type: string
  }[]
}


export type NetworkDetails = {
  headquarters: string,
  homepage: string,
  id: number,
  logo_path: string | null,
  name: string,
  origin_country: string
}


export default useNetworkImagesViewerStore
