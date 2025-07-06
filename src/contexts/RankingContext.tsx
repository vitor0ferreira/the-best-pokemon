import { createContext } from "react";

interface RankingContextProps {
  remainingVotes: number | null;
  setRemainingVotes: React.Dispatch<React.SetStateAction<number | null>>;
}

export const VotesContext = createContext<RankingContextProps>({
  remainingVotes: null,
  setRemainingVotes: ()=>{},
})
