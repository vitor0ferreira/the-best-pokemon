'use client'

import Image from 'next/image'
import { AiFillThunderbolt } from "react-icons/ai"
import { FaDragon } from 'react-icons/fa'
import { GiStonePile, GiFluffyWing, GiThreeLeaves } from 'react-icons/gi'
import { IoWaterSharp } from 'react-icons/io5'

export default function Home() {
  return (
    <main className='bg-gradient-to-b from-red-500 to-red-800 flex flex-col justify-around items-center gap-3 p-3 min-h-screen h-full min-w-full'>
      <span className='font-bold text-white drop-shadow-sm text-8xl'>The Best Pokemon</span>
      <div className='outline outline-6 outline-white bg-white rounded-xl w-[80%] h-[60vh] relative'>
        <ul className=' relative -top-14 left-0 w-full flex gap-3 min-h-max'>
          <li className='grow relative'>
            <input id='allTimes_option' type='radio' name='date_choice' defaultChecked
              ref={input => {
                if(input?.defaultChecked)
                  input.checked = true
              }} className='opacity-0 cursor-pointer peer w-full h-12 z-0 absolute top-0 left-0'/>
            <label htmlFor="allTimes_option" className='pb-2 z-15 cursor-pointer h-16 peer-checked:outline peer-checked:outline-6 peer-checked:outline-white rounded-t-md peer-checked:bg-white peer-checked:text-black bg-transparent text-white flex justify-center items-center transition-colors'>
              <div className='z-14 text-2xl font-bold'>
                All Times
              </div>
            </label>
          </li>
          <li className='grow relative'>
            <input id='weekly_option' type='radio' name='date_choice' className='opacity-0 cursor-pointer peer w-full h-12 z-0 absolute top-0 left-0'/>
            <label htmlFor="weekly_option" className='pb-2 z-15 cursor-pointer h-16 peer-checked:outline peer-checked:outline-6 peer-checked:outline-white rounded-t-md peer-checked:bg-white peer-checked:text-black bg-transparent text-white flex justify-center items-center transition-colors'>
              <div className='z-14 text-2xl font-bold'>
                Last Week
              </div>
            </label>
          </li>
          <li className='grow relative'>
            <input id='daily_option' type='radio' name='date_choice' className='opacity-0 cursor-pointer peer w-full h-12 z-0 absolute top-0 left-0'/>
            <label htmlFor="daily_option" className='pb-2 z-15 cursor-pointer h-16 peer-checked:outline peer-checked:outline-6 peer-checked:outline-white rounded-t-md peer-checked:bg-white peer-checked:text-black bg-transparent text-white flex justify-center items-center transition-colors'>
              <div className='z-14 text-2xl font-bold'>
                Today
              </div>
            </label>
          </li>
        </ul>
        <div className='flex w-full h-full rounded-xl bg-gradient-to-l from-green-300 to-yellow-300 justify-start p-6 absolute gap-4 top-0'>
          <div className='grow gap-2 flex flex-col p-6 bg-white shadow-3xl rounded-lg '>
            <h1 className='font-bold text-[5rem] leading-tight italic text-center'>PIKACHU</h1>
            <h2 className='text-xl indent-8 text-justify bg-yellow-50 italic px-4 py-2 rounded-md'>
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
                  <span className='w-fit h-min py-2 px-3 rounded-md flex items-center hover:scale-105 shadow-sm text-center bg-yellow-500 font-bold text-lg text-gray-100'>
                    <abbr title="Eletric">
                      <AiFillThunderbolt className='w-8 h-8'/>
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
            className='object-contain h-[auto] hover:scale-110 hover:cursor-pointer'
            src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/25.png'}
            width={550}
            height={500}
            alt='poke picture'
          />
        </div>
      </div>
      <a 
        href='/ranking' 
        className='h-14 w-auto p-4 cursor-pointer flex items-center text-3xl font-bold rounded-md bg-white hover:scale-105 shadow-md'
        target='_self'
      >
        Votar {'->'}
      </a>
    </main>
  )
}
