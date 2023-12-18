
import Image from 'next/image'

import { GiIceCube, GiMagicPalm, GiPunch, GiPoisonBottle } from "react-icons/gi";
import { FaMoon } from "react-icons/fa";
import { IoBug } from "react-icons/io5";
import { SiGhostery } from "react-icons/si";

export default function DailyPokemon () {

  return (
    <div className='flex w-full h-full rounded-xl bg-gradient-to-l from-pink-600 to-violet-600 justify-start p-6 absolute gap-4 top-0 animate-fadein'>
          <div className='grow gap-2 flex flex-col p-6 bg-white shadow-3xl rounded-lg '>
            <h1 className='font-bold text-[5rem] leading-tight italic text-center'>MEWTWO</h1>
            <h2 className='text-xl indent-8 text-justify bg-violet-200 italic px-4 py-2 rounded-md'>
              Its DNA is almost the same as Mew. However, its size and disposition are vastly different.
            </h2>
            <div id="pokemonAttributes" className='w-full flex flex-wrap'>
              <div id="pokemonTypes" className='flex flex-col w-auto p-1 gap-4 text-xl font-extrabold'>
                <div className="flex items-center gap-4">
                  Type:
                  <span className='w-fit h-min py-2 px-3 rounded-md flex items-center hover:scale-105 shadow-sm text-center bg-violet-700 font-bold text-lg text-gray-100'>
                    <abbr title="Psychic">
                      <GiMagicPalm className='w-8 h-8'/>
                    </abbr>
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  Strong Against:
                  <span className='w-fit h-min py-2 px-3 rounded-md flex items-center hover:scale-105 shadow-sm text-center bg-violet-700 font-bold text-lg text-gray-100'>
                    <abbr title="Psychic">
                      <GiMagicPalm className='w-8 h-8'/>
                    </abbr>
                  </span>
                  <span className='w-fit h-min py-2 px-3 rounded-md flex items-center hover:scale-105 shadow-sm text-center bg-red-800 font-bold text-lg text-white'>
                    <abbr title="Fighting">
                      <GiPunch className='w-8 h-8'/>
                    </abbr>
                  </span>
                  <span className='w-fit h-min py-2 px-3 rounded-md flex items-center hover:scale-105 shadow-sm text-center bg-pink-700 font-bold text-lg text-white'>
                    <abbr title="Poison">
                      <GiPoisonBottle className='w-8 h-8'/>
                    </abbr>
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  Vulnerable to:
                  <span className='w-fit h-min py-2 px-3 rounded-md flex items-center hover:scale-105 shadow-sm text-center bg-black font-bold text-lg text-gray-100'>
                    None
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  Weak Against:
                  <span className='w-fit h-min py-2 px-3 rounded-md flex items-center hover:scale-105 shadow-sm text-center bg-violet-950 font-bold text-lg text-gray-100'>
                    <abbr title="Ghost">
                      <SiGhostery className='w-8 h-8'/>
                    </abbr>
                  </span>
                  <span className='w-fit h-min py-2 px-3 rounded-md flex items-center hover:scale-105 shadow-sm text-center bg-lime-600 font-bold text-lg text-gray-100'>
                    <abbr title="Bug">
                      <IoBug className='w-8 h-8'/>
                    </abbr>
                  </span>
                  <span className='w-fit h-min py-2 px-3 rounded-md flex items-center hover:scale-105 shadow-sm text-center bg-zinc-800 font-bold text-lg text-gray-100'>
                    <abbr title="Dark">
                      <FaMoon className='w-8 h-8'/>
                    </abbr>
                  </span>
                </div>
              </div>
              <div></div>
            </div>
          </div>
          <Image
            id='daily_pokemon'
            className='object-contain h-[auto] hover:scale-110 hover:cursor-pointer drop-shadow-[0_5px_5px_rgba(0,0,0,0.80)]'
            src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/150.png'}
            width={550}
            height={500}
            alt='poke picture'
          />
        </div>
  )
}