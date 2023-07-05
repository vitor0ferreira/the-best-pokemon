import { VotesContext } from "@/contexts/RankingContext"
import { useContext } from "react"


export default function Heading () {
  const { remainingVotes } = useContext(VotesContext)

  return (
    <>
      <span className="text-8xl text-center text-white font-bold block mt-6">Rankings Available to Vote</span>
      <span className="font-bold text-3xl text-yellow-400 block">Remaining Votes: {remainingVotes}</span>
    </>
  )
}