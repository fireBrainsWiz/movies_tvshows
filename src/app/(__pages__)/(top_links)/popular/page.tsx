'use client'
import { useContext } from "react"
import AddToFav from "../../components/AddToFav"

// import ToggleSearchContext from "../context/ToggleSearchContext"


export default function Polpular() {

  return (
    <div>
      <h1 className="text-3xl">Popular</h1>
        <AddToFav />
    </div>
  )
}