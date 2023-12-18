import Image from 'next/image'
import { AiFillThunderbolt } from "react-icons/ai"
import { FaDragon } from 'react-icons/fa'
import { GiStonePile, GiFluffyWing, GiThreeLeaves } from 'react-icons/gi'
import { IoWaterSharp } from 'react-icons/io5'

export default function AllTimesPokemon () {

  return (
    <div className='flex w-full h-full rounded-xl bg-gradient-to-l from-emerald-500 to-yellow-300 justify-start p-6 absolute gap-4 top-0 animate-fadein'>
          <div className='grow gap-2 flex flex-col p-6 bg-white shadow-3xl rounded-lg '>
            <h1 className='font-bold text-[5rem] leading-tight italic text-center'>PIKACHU</h1>
            <h2 className='text-xl indent-8 text-justify bg-yellow-100 italic px-4 py-2 rounded-md'>
              The first pokemon that Ash Ketchum got on his crew. Definitely the most famous of all and loved for everyone, Pikachu are one of the most important pokemons from the saga.
            </h2>
            <div id="pokemonAttributes" className='w-full flex flex-wrap'>
              <div id="pokemonTypes" className='flex flex-col w-auto p-1 gap-4 text-xl font-extrabold'>
                <div className="flex items-center gap-4">
                  Type:
                  <span className='w-fit h-min py-2 px-3 rounded-md flex items-center hover:scale-105 shadow-sm text-center bg-yellow-500 font-bold text-lg text-gray-100'>
                    <abbr title="Eletric">
                      <AiFillThunderbolt className='w-8 h-8'/>
                    </abbr>
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  Strong Against:
                  <span className='w-fit h-min py-2 px-3 rounded-md flex items-center hover:scale-105 shadow-sm text-center bg-blue-600 font-bold text-lg text-gray-100'>
                    <abbr title="Water">
                      <IoWaterSharp className='w-8 h-8'/>
                    </abbr>
                  </span>
                  <span className='w-fit h-min py-2 px-3 rounded-md flex items-center hover:scale-105 shadow-sm text-center bg-blue-300 font-bold text-lg text-black'>
                    <abbr title="Flying">
                      <GiFluffyWing className='w-8 h-8'/>
                    </abbr>
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  Vulnerable to:
                  <span className='w-fit h-min py-2 px-3 rounded-md flex items-center hover:scale-105 shadow-sm text-center bg-yellow-900 font-bold text-lg text-gray-100'>
                    <abbr title="Ground">
                      <GiStonePile className='w-8 h-8'/>
                    </abbr>
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  Weak Against:
                  <span className='w-fit h-min py-2 px-3 rounded-md flex items-center hover:scale-105 shadow-sm text-center bg-green-700 font-bold text-lg text-white'>
                    <abbr title="Grass">
                      <GiThreeLeaves className='w-8 h-8'/>
                    </abbr>
                  </span>
                  <span className='w-fit h-min py-2 px-3 rounded-md flex items-center hover:scale-105 shadow-sm text-center bg-orange-500 font-bold text-lg text-gray-100'>
                    <abbr title="Dragon">
                      <FaDragon className='w-8 h-8'/>
                    </abbr>
                  </span>
                </div>
              </div>
              <div></div>
            </div>
          </div>
          <Image
            id='allTimes_pokemon'
            className='object-contain h-[auto] hover:scale-110 hover:cursor-pointer drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]'
            src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/25.png'}
            width={550}
            height={500}
            alt='poke picture'
          />
        </div>
  )
}