import './globals.css'
import { Inter, Roboto } from 'next/font/google'
import SessionProvider from '../contexts/ServerProvider'
import Header from '../components/Header';

const inter = Inter({ subsets: ['latin'] })
const roboto = Roboto({ subsets: ['latin'], weight: ['400','500','700','900']})

const fontsClassnames = `${inter.className} ${roboto.className}`

export const metadata = {
  title: 'The Best Pokemon',
  description: 'A ranking project to determinate (democratically) the best pokemon of all times.'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={`${fontsClassnames} flex flex-col min-h-screen bg-red-600 bg-pokeball-gradient`}>

        <SessionProvider>
          <Header />

          {children}

          {/* Footer */}
          <footer className='w-full h-max p-2 bg-slate-200 flex items-center justify-center'>
            <span className=" font-bold text-center text-gray-900 text-base sm:text-lg md:text-xl">The Best Pokemon is developed with NextJS and deployed on Vercel.</span>
          </footer>

        </SessionProvider>
        <div id='modal-root'></div>
      </body>
    </html>
  )
}
