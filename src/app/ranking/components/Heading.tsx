import { VotesContext } from "@/src/contexts/RankingContext"
import { useContext } from "react"


export default function Heading () {
  const { remainingVotes } = useContext(VotesContext)

  return (
    <>
      <span className="text-3xl md:text-5xl lg:text-7xl text-center text-white font-bold block mt-6">Rankings Available to Vote</span>
      {remainingVotes != undefined ? (<span className="font-bold text-3xl text-yellow-400 block">Remaining Votes: {remainingVotes}</span>) : null}
    </>
  )
}