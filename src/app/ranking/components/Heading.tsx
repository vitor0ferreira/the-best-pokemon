import { VotesContext } from "@/src/contexts/RankingContext"
import { useContext } from "react"


export default function Heading () {
  const { remainingVotes } = useContext(VotesContext)

  return (
    <>
      <span className="text-5xl md:text-6xl lg:text-8xl text-center text-white font-bold block mt-6">Rankings Available to Vote</span>
      {remainingVotes != undefined ? (<span className="font-bold text-3xl text-yellow-400 block">Remaining Votes: {remainingVotes}</span>) : null}
    </>
  )
}