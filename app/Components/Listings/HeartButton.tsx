'use client'
import useFavorite from '@/app/hooks/useFavorite'
import { SafeUser } from '@/app/types'
import React from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

interface Props{
    listingId:string,
    currentUser?: SafeUser | null
}

export const HeartButton = ({listingId,currentUser}:Props) => {

  const {hasFavorited,toggleFavorite} = useFavorite({
    listingId,
    currentUser
  });


  return (
    <div onClick={toggleFavorite} className='absolute z-40 right-5 top-7  hover:opacity-80 cursor-pointer transition'>
        <AiOutlineHeart size={28} className='fill-white absolute -top-[2px] -right-[2px] z-50'/>
        <AiFillHeart size={24} className={hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'} />
    </div>
  )
}
