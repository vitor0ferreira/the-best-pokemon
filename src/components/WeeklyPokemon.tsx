import Image from 'next/image'

import { ImFire } from "react-icons/im";
import { GiStonePile, GiStoneSphere, GiThreeLeaves, GiIceCube } from 'react-icons/gi'
import { IoWaterSharp } from 'react-icons/io5'

export default function WeeklyPokemon () {

  return (
    <div className='flex w-full h-full rounded-xl bg-gradient-to-l from-yellow-400 to-amber-700 justify-start p-6 gap-4 top-0 animate-fadein'>
          <div className='grow gap-2 flex flex-col p-6 bg-white shadow-3xl rounded-lg '>
            <h1 className='font-bold text-[5rem] leading-tight italic text-center'>ARCANINE</h1>
            <h2 className='text-xl indent-8 text-justify bg-red-200 italic px-4 py-2 rounded-md'>
              The badass fire dog from the Pokemon universe. He is beautiful and strong, a true fella for your journey.
            </h2>
            <div id="pokemonAttributes" className='w-full flex flex-wrap'>
              <div id="pokemonTypes" className='flex flex-col w-auto p-1 gap-4 text-xl font-extrabold'>
                <div className="flex items-center gap-4">
                  Type:
                  <span className='w-fit h-min py-2 px-3 rounded-md flex items-center hover:scale-105 shadow-sm text-center bg-red-500 font-bold text-lg text-gray-100'>
                    <abbr title="Fire">
                      <ImFire className='w-8 h-8'/>
                    </abbr>
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  Strong Against:
                  <span className='w-fit h-min py-2 px-3 rounded-md flex items-center hover:scale-105 shadow-sm text-center bg-blue-300 font-bold text-lg text-gray-100'>
                    <abbr title="Ice">
                      <GiIceCube className='w-8 h-8'/>
                    </abbr>
                  </span>
                  <span className='w-fit h-min py-2 px-3 rounded-md flex items-center hover:scale-105 shadow-sm text-center bg-green-700 font-bold text-lg text-white'>
                    <abbr title="Grass">
                      <GiThreeLeaves className='w-8 h-8'/>
                    </abbr>
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  Vulnerable to:
                  <span className='w-fit h-min py-2 px-3 rounded-md flex items-center hover:scale-105 shadow-sm text-center bg-blue-600 font-bold text-lg text-gray-100'>
                    <abbr title="Water">
                      <IoWaterSharp className='w-8 h-8'/>
                    </abbr>
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  Weak Against:
                  <span className='w-fit h-min py-2 px-3 rounded-md flex items-center hover:scale-105 shadow-sm text-center bg-amber-950 font-bold text-lg text-gray-100'>
                    <abbr title="Rock">
                      <GiStoneSphere className='w-8 h-8'/>
                    </abbr>
                  </span>
                  <span className='w-fit h-min py-2 px-3 rounded-md flex items-center hover:scale-105 shadow-sm text-center bg-yellow-900 font-bold text-lg text-gray-100'>
                    <abbr title="Ground">
                      <GiStonePile className='w-8 h-8'/>
                    </abbr>
                  </span>
                </div>
              </div>
              <div></div>
            </div>
          </div>
          <Image
            id='weekly_pokemon'
            className='object-contain h-[auto] hover:scale-110 hover:cursor-pointer drop-shadow-[0_5px_5px_rgba(0,0,0,0.70)]'
            src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/59.png'}
            width={550}
            height={500}
            alt='poke picture'
          />
        </div>
  )
}