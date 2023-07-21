import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'The Best Pokemon',
  description: 'A ranking project to determinate (democratically) the best pokemon of all times.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="h-max w-full bg-white flex items-center justify-center flex-col px-2 py-2 sm:flex-row sm:gap-4 md:justify-evenly xl:justify-between xl:px-10">
          <span className='italic font-extrabold text-blue-800 text-2xl whitespace-nowrap sm:text-3xl'><a href="">The Best Pokemon</a></span>
          <nav className='flex font-bold text-lg gap-1 md:text-xl'>
            <a href="/" className='hover:bg-red-600 hover:text-white p-1 rounded-md'>Home</a>
            <a href="/catalogue" className='hover:bg-red-600 hover:text-white p-1 rounded-md'>Catalogue</a>
            <a href="/ranking" className='hover:bg-red-600 hover:text-white p-1 rounded-md'>Rankings</a>
          </nav>
        </div>
        {children}
      </body>
    </html>
  )
}
