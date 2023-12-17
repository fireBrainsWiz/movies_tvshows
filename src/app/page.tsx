"use client"
import { useQueryClient } from "@tanstack/react-query"
import HomePageHeaderSection from "./(__pages__)/components/HomePageHeaderSection"
import BelowTheHeader from "./(__pages__)/card/components/BelowTheHeader"

export default function Home() {
  const queryClient = useQueryClient()
  console.log(queryClient.getQueryData(['about']))
  
  return (
    <div className=" bg-[#111] ">
      <HomePageHeaderSection />
      <BelowTheHeader />
    </div>
  )
}
