import React from 'react'
import { Container } from '../Container'
import { Logo } from './Logo'
import { Search } from './Search'
import { Menu } from './Menu'

import { SafeUser } from '@/app/types'
import { Categories } from '../Category/Categories'

interface Props{
  currentUser?:SafeUser | null
}

export const Navbar = ({currentUser}:Props) => {

  
  
  return (
    <nav className='fixed w-full bg-white shadow-sm z-[99]'>
        <div className='py-4 border-b-[1px] border-b-[#cac8c8] border-solid'>
            <Container>
                    <div className='flex flex-row items-center justify-between
                                    gap-3 md:gap-0'>
                            <Logo/>
                            <Search/>
                            <Menu currentUser={currentUser}/>
                    </div>
            </Container>
        </div>
        <Categories/>
    </nav>
  )
}
