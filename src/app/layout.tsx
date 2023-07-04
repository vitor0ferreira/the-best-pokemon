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
        <div className="h-14 w-full bg-white flex items-center justify-between px-12 py-4 text-2xl">
          <span className='italic font-extrabold text-blue-800 text-4xl'><a href="">The Best Pokemon</a></span>
          <nav className='flex gap-4 font-bold'>
            <a href="/" className='hover:bg-red-600 hover:text-white p-2'>Home</a>
            <a href="/ranking" className='hover:bg-red-600 hover:text-white p-2'>Rankings</a>
            <a href="" className='hover:bg-red-600 hover:text-white p-2'>About</a>
          </nav>
        </div>
        {children}
      </body>
    </html>
  )
}
