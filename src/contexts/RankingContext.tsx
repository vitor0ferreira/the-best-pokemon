import { createContext } from "react";

interface RankingContextProps {
  remainingVotes: number;
  setRemainingVotes: React.Dispatch<React.SetStateAction<number>>;
}

export const VotesContext = createContext<RankingContextProps>({
  remainingVotes: 10,
  setRemainingVotes: ()=>{},
})
