import '@/app/tailwind.css'


import {Nunito} from 'next/font/google'
import { Navbar } from './Components'

import { ClientOnly } from './Components/ClientOnly'
import {RegisterModal, RentModal, SearchModal } from './Components/Modals'
import { ToasterProvider } from './Providers/ToasterProvider'
import {LoginModal} from './Components/Modals'

import getCurrentUser from './actions/getCurrentUser'


export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}


const font = Nunito({
  subsets:['latin']
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser(); 
  console.log(currentUser);
     

  return (
    <html lang="en">
      <body className={font.className} >
        <ClientOnly>
          <ToasterProvider/>
          <RegisterModal/>
          <LoginModal/>
          <RentModal/>
          <SearchModal/>
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className='pb-20 pt-28'>
          {children}
        </div>
      </body>
    </html>
  )
}
