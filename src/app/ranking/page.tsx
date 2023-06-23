'use client'

import RankingCard from "@/components/RankingCard";
import { createContext, useContext, useState } from "react";

const VotesContext = createContext(10);

export default function Ranking() {

  const [availableVotes, setAvailableVotes] = useState(10)

  return(
    <VotesContext.Provider value={availableVotes}>
      <main className="bg-gradient-to-b from-red-500 to-red-800 flex flex-col items-center
      justify-center min-h-screen h-max min-w-full gap-5">
        <span className="text-8xl text-center text-white font-bold block">Top Ranking</span>
        <span className="font-bold text-3xl text-yellow-400 block">Remaining Votes: {availableVotes}</span>
        <section id="rankings" className="flex w-full gap-8 justify-center flex-wrap">
          <article className="bg-white h-max w-[30rem] rounded-2xl overflow-hidden border-[3px] border-black">
            <RankingCard rank='1'/>
            <RankingCard rank='2'/>
            <RankingCard rank='3'/>
            <RankingCard rank='4'/>
            <RankingCard rank='5'/>
            <RankingCard rank='6'/>
            <RankingCard rank='7'/>
            <RankingCard rank='8'/>
            <RankingCard rank='9'/>
            <RankingCard rank='10'/>
          </article>
          <article className="bg-white h-max w-[30rem] rounded-2xl overflow-hidden border-[3px] border-black">
            <RankingCard rank='1'/>
            <RankingCard rank='2'/>
            <RankingCard rank='3'/>
            <RankingCard rank='4'/>
            <RankingCard rank='5'/>
            <RankingCard rank='6'/>
            <RankingCard rank='7'/>
            <RankingCard rank='8'/>
            <RankingCard rank='9'/>
            <RankingCard rank='10'/>
          </article>
          <article className="bg-white h-max w-[30rem] rounded-2xl overflow-hidden border-[3px] border-black ">
            <RankingCard rank='1'/>
            <RankingCard rank='2'/>
            <RankingCard rank='3'/>
            <RankingCard rank='4'/>
            <RankingCard rank='5'/>
            <RankingCard rank='6'/>
            <RankingCard rank='7'/>
            <RankingCard rank='8'/>
            <RankingCard rank='9'/>
            <RankingCard rank='10'/>
          </article>
        </section>
        <a
          href='/'
          className='h-14 w-max p-4 cursor-pointer flex items-center text-3xl font-bold rounded-md bg-white hover:scale-105 shadow-md'
          target='_self'
        >
          Back {'<-'}
        </a>
      </main>
    </VotesContext.Provider>
  )
}