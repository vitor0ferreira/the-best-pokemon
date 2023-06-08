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
      <aside className='absolute top-0 left-0 min-h-full min-w-[3%] from-amber-200 to-amber-400 bg-gradient-to-r'></aside>
      <aside className='absolute top-0 right-0 min-h-full min-w-[3%] from-amber-200 to-amber-400 bg-gradient-to-l'></aside>
        {children}
      </body>
    </html>
  )
}
