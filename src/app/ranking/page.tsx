'use client'

import { useState, useEffect } from "react"
import RankingCard from "@/components/RankingCard";


export default function Ranking() {


  return(
    <main className="bg-gradient-to-b from-red-600 to-red-900 flex flex-col items-center
    justify-evenly min-h-screen min-w-full">
      <span className="text-8xl text-center text-white font-bold block">Top Ranking</span>
      <span className="font-bold text-3xl text-yellow-400 block">Votos Disponíveis: 10</span>
      <section id="rankings" className="flex w-full justify-around">
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
        Voltar {'<-'}
      </a>
    </main>
  )
}