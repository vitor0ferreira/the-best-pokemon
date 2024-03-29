import './globals.css'
import { Inter, Roboto } from 'next/font/google'
import { FaSquareFacebook, FaInstagram, FaXTwitter } from 'react-icons/fa6'
import { getServerSession } from 'next-auth'
import SessionProvider from '@/contexts/ServerProvider'
import DropdownMenu from '@/components/DropdownMenu';

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
        <SessionProvider session={session}>
        {/* Header */}
        <div className="h-max w-full bg-white flex items-center justify-center flex-col gap-1 px-2 py-2 sm:flex-row sm:gap-4 md:justify-evenly xl:justify-between xl:px-10">
          <span className='italic font-extrabold text-red-600 mt-2 text-2xl whitespace-nowrap sm:text-3xl sm:mt-0 md:text-4xl lg:text-5xl'>
            <a href="">The Best Pokemon</a>
          </span>
          <nav className='flex items-center font-semibold text-lg gap-1 sm:gap-2 sm:text-xl md:text-2xl'>
            <a href="/" className='hover:bg-red-600 hover:text-white p-1 md:p-2 rounded-md'>Home</a>
            <a href="/catalogue" className='hover:bg-red-600 hover:text-white p-1 md:p-2 rounded-md'>Catalogue</a>
            <a href="/ranking" className='hover:bg-red-600 hover:text-white p-1 md:p-2 rounded-md'>Rankings</a>
            <DropdownMenu/>
          </nav>
        </div>
        
        {children}

        {/* Footer */}
        <footer className='w-full h-max py-10 px-14 bg-white flex flex-wrap items-start justify-start gap-12 border-t-4 border-gray-300'>

          {/* Main Sections Navigation */}
          <nav className='flex flex-col gap-1'>
            <span className="mb-2 font-bold text-3xl">The Best Pokemon</span>
            <a href="" className='w-max rounded-md font-bold text-xl text-slate-500 mt-2 p-2 hover:bg-red-400 hover:text-white'>Home</a>
            <a href="" className='w-max rounded-md font-bold text-xl text-slate-500 mt-2 p-2 hover:bg-red-400 hover:text-white'>Catalogue</a>
            <a href="" className='w-max rounded-md font-bold text-xl text-slate-500 mt-2 p-2 hover:bg-red-400 hover:text-white'>Rankings</a>
          </nav>

          {/* Company Navigation */}
          <nav className='flex flex-col gap-1'>
            <span className="mb-2 font-bold text-3xl">Company</span>
            <a href="" className='w-max rounded-md font-bold text-xl text-slate-500 mt-2 p-2 hover:bg-red-400 hover:text-white'>About Us</a>
            <a href="" className='w-max rounded-md font-bold text-xl text-slate-500 mt-2 p-2 hover:bg-red-400 hover:text-white'>Contact</a>
            <a href="" className='w-max rounded-md font-bold text-xl text-slate-500 mt-2 p-2 hover:bg-red-400 hover:text-white'>Work with us</a>
          </nav>

          {/* Social Links Navigation */}
          <nav className='flex flex-col gap-1'>
            <span className="mb-2 font-bold text-3xl">Follow Us</span>
            <div className='flex gap-1 text-4xl'>
              <a href="" className='w-max rounded-md hover:text-blue-600'><FaSquareFacebook className='w-full h-full'/></a>
              <a href="" className='w-max rounded-md p-1 hover:bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] hover:text-white'><FaInstagram/></a>
              <a href="" className='w-max rounded-md p-1 hover:bg-black hover:text-white'><FaXTwitter/></a>
            </div>
          </nav>

          <div className='w-64 h-64 rounded-sm flex items-center justify-center bg-slate-400'>
            QR CODE
          </div>

          <div className='bg-slate-800 flex flex-col flex-1 justify-start items-center flex-wrap p-4 gap-4 h-64 text-2xl text-slate-100 font-medium rounded-md'>
            <span>Sign our Newsletter to receive weekly news and promos.</span>
            <form className='w-full h-min flex items-center gap-3 border-b-4 border-slate-200 pb-6'>
              <label htmlFor="email_input">E-mail</label>
              <input type="email" id='email_input' className='p-1 rounded-sm h-min focus:outline-none focus:bg-slate-50 text-slate-900'/>
            </form>
            <span className='text-base font-thin overflow-hidden text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, error consequuntur modi aperiam molestias nam fuga veniam excepturi quam laborum? Accusamus sit harum dolore? Quo similique ipsa nemo culpa animi!</span>
          </div>

        </footer>
        </SessionProvider>
      </body>
    </html>
  )
}
