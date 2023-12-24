import Link from "next/link"

let n = 0
export default function AiringToday() {
  // console.log('N is; ', n++)
  // console.log(Math.random())
  
  return (
    <div>
      Airing Today
      <Link href={'top-rated'} >Go back</Link>
    </div>
  )
}