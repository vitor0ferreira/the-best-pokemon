import { createContext, useState } from "react";

interface RankingContextProps {
  remainingVotes: number;
  setRemainingVotes: React.Dispatch<React.SetStateAction<number>>;
}

export const VotesContext = createContext<RankingContextProps>({
  remainingVotes: 10,
  setRemainingVotes: ()=>{},
})

export const VotesProvider = ({ children }:any) => {
  const [remainingVotes, setRemainingVotes] = useState(10)

  return (
    <VotesContext.Provider value={{remainingVotes, setRemainingVotes}}>
      {children}
    </VotesContext.Provider>
  )
}