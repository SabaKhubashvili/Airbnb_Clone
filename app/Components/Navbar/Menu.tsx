'use client'
import React, { useCallback } from 'react'

import {AiOutlineMenu} from 'react-icons/ai'
import { Avatar } from '../Avatar'
import { MenuItem } from './MenuItem'
import { useRegisterModal } from '@/app/hooks/UseRegisterModal'
import { UseLoginModal } from '@/app/hooks/UseLoginModal'
import { signOut } from 'next-auth/react'
import { SafeUser } from '@/app/types'
import { useRentModal } from '@/app/hooks/useRentModal'

import { useRouter } from 'next/navigation'

interface Props{
    currentUser?:SafeUser | null
}

export const Menu = ({currentUser}:Props) => {
    const router = useRouter();
    
    const [isOpen,setIsOpen] = React.useState<boolean>(false)

    const RegisterModal = useRegisterModal()
    const LoginModal = UseLoginModal()
    const RentModal = useRentModal()

  

    const toggleOpen = useCallback(()=>{
        setIsOpen((value)=>(!value))
    },[])

    const onRent = useCallback(()=>{
        if(!currentUser){
            return LoginModal.onOpen();
        }

        RentModal.onOpen()

    },[currentUser,LoginModal,RentModal])


  return (
    <div className='relative'>
         <div className="flex flex-row items-center gap-3">
            <div className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 tranistion cursor-pointer'
            onClick={onRent}

            >
                 Airbnb your home
            </div>
            <div onClick={toggleOpen} className='p-4 md:py-1 md:px-3 border-[1px] border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'>
                <AiOutlineMenu/>    
                <div className='border-l-[1px] px-2 hidden md:block'>
                     <Avatar src={currentUser?.image} />
                </div>
            </div>
         </div>

         {
            isOpen && (
                <div className=' absolute top-12 text-sm  w-[40vw] md:w-3/4 bg-white overflow-hidden  right-0 rounded-xl shadow-md'>
                    <div className='flex flex-col cursor-pointer'>
                        {
                            currentUser
                            ?
                            <React.Fragment>
                                 <MenuItem onClick={()=>{router.push('/Trips')}} label='My trips'/>
                                 <MenuItem onClick={()=>{router.push('/Favorites')}} label='My favorites'/>
                                 <MenuItem onClick={()=>{router.push('/Reservations')}} label='My reservations'/>
                                 <MenuItem onClick={()=>{router.push('/Properties')}} label='My properties'/>
                                 <MenuItem onClick={()=>{RentModal.onOpen()}} label='Airnb my home'/>
                                 <div className='py-1 border-t-[1px]'>
                                    <MenuItem onClick={()=>signOut()} label='Log out'/>
                                 </div>
                            </React.Fragment>
                            :
                            <React.Fragment>
                                <MenuItem onClick={LoginModal.onOpen} label='Login'/>
                                <MenuItem onClick={RegisterModal.onOpen} label='Sign Up'/>
                        
                            </React.Fragment>
                        }
                    </div>
                </div>
            )
         }
    </div>
  )
}
