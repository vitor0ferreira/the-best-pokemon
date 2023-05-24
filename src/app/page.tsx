import Image from 'next/image'



export default function Home() {
  return (
    <main className='bg-gradient-to-b from-red-600 to-red-900 flex flex-col justify-evenly items-center gap-3 p-3 min-h-screen min-w-full'>
      <span className='font-bold text-white drop-shadow-sm text-8xl'>The Best Pokemon</span>
      <div className='outline outline-6 outline-white bg-white rounded-xl w-[80%] h-[60vh] relative'>
        <ul className=' relative -top-14 left-0 w-full flex gap-3 min-h-max'>
          <li className='grow relative'>
            <input id='allTimes_option' type='radio' name='date_choice' defaultChecked className='opacity-0 cursor-pointer peer w-full h-12 z-0 absolute top-0 left-0'/>
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
      </div>
    </main>
  )
}
