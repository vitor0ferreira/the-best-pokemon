import './globals.css'
import { Inter, Roboto } from 'next/font/google'
import { FaSquareFacebook, FaInstagram, FaXTwitter } from 'react-icons/fa6'
import { getServerSession } from 'next-auth'
import SessionProvider from '@/contexts/ServerProvider'

const inter = Inter({ subsets: ['latin'] })
const roboto = Roboto({ subsets: ['latin'], weight: ['400','500','700','900']})

const fontsClassnames = `${inter.className} ${roboto.className}`

export const metadata = {
  title: 'The Best Pokemon',
  description: 'A ranking project to determinate (democratically) the best pokemon of all times.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={fontsClassnames}>
        {/* Header */}
        <div className="h-max w-full bg-white flex items-center justify-center flex-col gap-1 px-2 py-2 sm:flex-row sm:gap-4 md:justify-evenly xl:justify-between xl:px-10">
          <span className='italic font-extrabold text-blue-800 mt-2 text-2xl whitespace-nowrap sm:text-3xl sm:mt-0 md:text-4xl lg:text-5xl'><a href="">The Best Pokemon</a></span>
          <nav className='flex font-semibold text-lg gap-4 md:text-xl lg:text-2xl xl:text-3xl'>
            <a href="/" className='hover:bg-red-600 hover:text-white p-1 rounded-md'>Home</a>
            <a href="/catalogue" className='hover:bg-red-600 hover:text-white p-1 rounded-md'>Catalogue</a>
            <a href="/ranking" className='hover:bg-red-600 hover:text-white p-1 rounded-md'>Rankings</a>
          </nav>
        </div>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
        {/* Footer */}
        <footer className='w-full h-max py-10 bg-white flex items-start justify-around'>

          {/* Main Sections Navigation */}
          <nav className='flex flex-col gap-1'>
            <span className="mb-2 font-bold text-5xl">The Best Pokemon</span>
            <a href="" className='w-max rounded-md font-bold text-2xl text-slate-500 mt-2 p-2 hover:bg-red-400 hover:text-white'>Home</a>
            <a href="" className='w-max rounded-md font-bold text-2xl text-slate-500 mt-2 p-2 hover:bg-red-400 hover:text-white'>Catalogue</a>
            <a href="" className='w-max rounded-md font-bold text-2xl text-slate-500 mt-2 p-2 hover:bg-red-400 hover:text-white'>Rankings</a>
          </nav>

          {/* Company Navigation */}
          <nav className='flex flex-col gap-1'>
            <span className="mb-2 font-bold text-5xl">Company</span>
            <a href="" className='w-max rounded-md font-bold text-2xl text-slate-500 mt-2 p-2 hover:bg-red-400 hover:text-white'>About Us</a>
            <a href="" className='w-max rounded-md font-bold text-2xl text-slate-500 mt-2 p-2 hover:bg-red-400 hover:text-white'>Contact</a>
            <a href="" className='w-max rounded-md font-bold text-2xl text-slate-500 mt-2 p-2 hover:bg-red-400 hover:text-white'>Work with us</a>
          </nav>

          {/* Social Links Navigation */}
          <nav className='flex flex-col gap-1'>
            <span className="mb-2 font-bold text-5xl">Follow Us</span>
            <div className='flex gap-1 text-4xl'>
              <a href="" className='w-max rounded-md hover:text-blue-600'><FaSquareFacebook className='w-full h-full'/></a>
              <a href="" className='w-max rounded-md p-1 hover:bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] hover:text-white'><FaInstagram/></a>
              <a href="" className='w-max rounded-md p-1 hover:bg-black hover:text-white'><FaXTwitter/></a>
            </div>
          </nav>

        </footer>
      </body>
    </html>
  )
}
