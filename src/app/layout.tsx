import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { options } from '../service/options'
import { getServerSession } from 'next-auth'

import Navbarauth from '@/app/componentes/geral/navbar/Navbar'
import Footer from '@/app/componentes/geral/footer/footer'
import Provider from '@/app/componentes/geral/Provider'
import Sidebar from '@/app/componentes/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(options)
  return (
    <html lang="en">
      
      <body className={inter.className}>

        <Provider>
          <Navbarauth/> 
            {session?.user?.role === 'ADMIN' ? <Sidebar> 
              <div className='mt-5'>{children}</div> </Sidebar> : 
              <div className='pt-10'>{children}</div> 
            }
          <Footer/>
        </Provider>
      </body>
    </html>
  )
}
