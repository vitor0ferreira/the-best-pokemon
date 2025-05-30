import './globals.css'
import { Inter, Roboto } from 'next/font/google'
import { getServerSession } from 'next-auth'
import SessionProvider from '@/contexts/ServerProvider'
import DropdownMenu from '@/components/DropdownMenu';

const inter = Inter({ subsets: ['latin'] })
const roboto = Roboto({ subsets: ['latin'], weight: ['400','500','700','900']})

const fontsClassnames = `${inter.className} ${roboto.className}`

export const metadata = {
  title: 'The Best Pokemon',
  description: 'A ranking project to determinate (democratically) the best pokemon of all times.'
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
        <header className="h-max w-full bg-white items-center justify-center flex-col gap-1 px-2 py-2 hidden sm:flex sm:flex-row sm:gap-4 md:justify-evenly xl:justify-between xl:px-10">
          <span className='italic font-extrabold text-red-600 mt-2 text-2xl whitespace-nowrap sm:text-3xl sm:mt-0 md:text-4xl'>
            <a href="/">The Best Pokemon</a>
          </span>
          <nav className='flex items-center font-semibold text-lg gap-1 sm:gap-2 sm:text-xl'>
            <a href="/" className='hover:bg-red-600 hover:text-white px-2 py-1 rounded-md'>Home</a>
            <a href="/catalogue" className='hover:bg-red-600 hover:text-white px-2 py-1 rounded-md'>Catalogue</a>
            <a href="/ranking" className='hover:bg-red-600 hover:text-white px-2 py-1 rounded-md'>Rankings</a>
            <DropdownMenu/>
          </nav>
        </header>
        
        {children}

        {/* Footer */}
        <footer className='w-full h-max p-2 bg-white flex items-center justify-center'>

          <span className=" font-bold text-gray-900 text-xl">The Best Pokemon is developed with NextJS and deployed on Vercel.</span>

        </footer>
        </SessionProvider>
      </body>
    </html>
  )
}
