'use client'

import { FaVoteYea } from "react-icons/fa";
import { useSession } from 'next-auth/react'
import Link from "next/link";


export default function Home() {

  const { data: session} = useSession()

  return (
    <main className='bg-gradient-to-b from-red-500 to-red-800 flex flex-col items-center gap-4 min-h-screen h-max min-w-full'>
      
      <span className='font-bold text-white italic drop-shadow-sm text-4xl md:text-6xl lg:text-8xl mb-2 mt-8'>
        The Best Pokemon
      </span>
      
      {/* CTA Buttons */}
      <nav className='w-max h-max flex items-center justify-center gap-4'>
        <Link href="/catalogue" className='h-auto w-auto p-2 cursor-pointer flex items-center text-lg md:text-2xl md:px-4 font-bold rounded-md bg-white hover:scale-105 shadow-md'>Pokedéx</Link>
        {session ? 
          <Link href="/ranking" className='h-auto w-auto p-2 cursor-pointer flex items-center gap-2 text-lg md:text-2xl md:px-4 font-bold rounded-md bg-white hover:scale-105 shadow-md'>
            <FaVoteYea/>
            Go Vote
          </Link>
           : 
          <Link href="/login" className='h-auto w-auto p-2 cursor-pointer flex items-center text-lg md:text-2xl md:px-4 font-bold rounded-md bg-white hover:scale-105 shadow-md'>Sign In and Vote</Link>}
      </nav>

      {session && 
        <span className='text-lg text-white font-semibold flex gap-2 items-center'>
          <div className='bg-green-600 border-white border-4 w-4 h-4 rounded-full flex items-center justify-center animate-pulse'>
          </div>
          Conected as &apos;{session?.user?.name}&apos;
        </span>
      }

      {/* Presentation Section */}
      <section className='w-[80%] h-96 bg-white flex items-center justify-center'>
        Presentation
      </section>

      {/* Highlights Section */}
      <section className='w-[80%] flex flex-col items-center justify-center text-center'>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque atque nemo distinctio ipsa expedita veritatis nisi cum eligendi vel, nihil et eius aspernatur voluptas iste omnis? Quis dolore nulla illum!
      </section>

      {/* Button to go to the rankings page */}
      <Link 
        href='/ranking' 
        className='h-14 w-auto p-4 my-12 cursor-pointer flex items-center text-3xl font-bold rounded-md bg-white hover:scale-105 shadow-md'
        target='_self'
      >
        Go Vote
      </Link>

    </main>
  )
}
