import { create } from "zustand";


const useSavedStore = create<SavedStore>( set => ({
  isVisibleSavedItems: false, //to be set to false
  setIsVisibleSavedItems: (isVisibleSavedItems) => set(_ => ({isVisibleSavedItems}))
}))

export default useSavedStore

interface SavedStore {
  isVisibleSavedItems: boolean
  setIsVisibleSavedItems: (isVisibleSavedItems: boolean) => void
}

