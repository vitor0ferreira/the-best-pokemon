'use client'

import AllTimesPokemon from '@/components/AllTimesPokemon'
import DailyPokemon from '@/components/DailyPokemon'
import WeeklyPokemon from '@/components/WeeklyPokemon'
import { useState } from 'react'

export default function Home() {
  const [selectedOption, setSelectedOption] = useState('allTimes');
  const radioValue:any = {
    'allTimes': <AllTimesPokemon/>,
    'weekly': <WeeklyPokemon/>,
    'daily': <DailyPokemon/>
  }

  const handleRadioChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
    console.log(selectedOption)
  };

  return (
    <main className='bg-gradient-to-b from-red-500 to-red-800 flex flex-col justify-around items-center gap-3 p-3 min-h-screen h-max min-w-full'>
      <span className='font-bold text-white drop-shadow-sm text-8xl mb-8'>The Best Pokemon</span>
      <div className='outline outline-6 outline-white bg-white rounded-xl w-[80%] h-[60vh] relative'>
        <ul id='radio_options' className='relative -top-14 left-0 w-full flex gap-3 min-h-max'>
          {/* All Times Radio Input*/}
          <li className='grow relative'>
            <input
              id='allTimes_option'
              type='radio'
              name='date_choice'
              value='allTimes'
              checked={selectedOption === 'allTimes'}
              onChange={handleRadioChange}
              className='opacity-0 cursor-pointer peer w-full h-12 z-0 absolute top-0 left-0'
            />
            <label
              htmlFor='allTimes_option'
              className='pb-2 z-15 cursor-pointer h-16 peer-checked:outline peer-checked:outline-6 peer-checked:outline-white rounded-t-md peer-checked:bg-white peer-checked:text-black bg-transparent text-white flex justify-center items-center transition-colors'
            >
              <div className='z-14 text-2xl font-bold'>All Times</div>
            </label>
          </li>

          {/* Last Week Radio Input*/}
          <li className='grow relative'>
            <input
              id='weekly_option'
              type='radio'
              name='date_choice'
              value='weekly'
              checked={selectedOption === 'weekly'}
              onChange={handleRadioChange}
              className='opacity-0 cursor-pointer peer w-full h-12 z-0 absolute top-0 left-0'
            />
            <label
              htmlFor='weekly_option'
              className='pb-2 z-15 cursor-pointer h-16 peer-checked:outline peer-checked:outline-6 peer-checked:outline-white rounded-t-md peer-checked:bg-white peer-checked:text-black bg-transparent text-white flex justify-center items-center transition-colors'
            >
              <div className='z-14 text-2xl font-bold'>Last Week</div>
            </label>
          </li>

          {/* Today Radio Input*/}
          <li className='grow relative'>
            <input
              id='daily_option'
              type='radio'
              name='date_choice'
              value='daily'
              checked={selectedOption === 'daily'}
              onChange={handleRadioChange}
              className='opacity-0 cursor-pointer peer w-full h-12 z-0 absolute top-0 left-0'
            />
            <label
              htmlFor='daily_option'
              className='pb-2 z-15 cursor-pointer h-16 peer-checked:outline peer-checked:outline-6 peer-checked:outline-white rounded-t-md peer-checked:bg-white peer-checked:text-black bg-transparent text-white flex justify-center items-center transition-colors'
            >
              <div className='z-14 text-2xl font-bold'>Today</div>
            </label>
          </li>
        </ul>
      {/* Pokemon Card Selectioned */}
      {radioValue[selectedOption]}
      </div>
      <a 
        href='/ranking' 
        className='h-14 w-auto p-4 cursor-pointer flex items-center text-3xl font-bold rounded-md bg-white hover:scale-105 shadow-md'
        target='_self'
      >
        Vote {'->'}
      </a>
    </main>
  )
}
