'use client'

import { HeartButton } from '@/app/Components/Listings/HeartButton'
import useCountries from '@/app/hooks/useCountries'
import { SafeUser } from '@/app/types'
import Image from 'next/image'
import React from 'react'

interface Props{
    title:string,
    locationValue:string,
    imageSrc:string,
    currentUser?:SafeUser | null
    listingId:string
}

export const ListingHeading = ({
    title,
    locationValue,
    imageSrc,
    currentUser,
    listingId
}:Props) => {
    const {getByValue} = useCountries();

    const location = getByValue(locationValue)

    
  return (
    <div className='flex flex-col gap-3'>
        <h1 className='font-bold text-xlg'>{title}</h1>
        <p className='text-normal-300 font-light'>{location?.region},  {location?.label}</p>
        <div className='w-full h-full relative'>
            <Image
            src={imageSrc}
            alt='Listing_Image'
            width={500}
            height={500}
            priority
            draggable={false}
            className='w-full h-full rounded-xl'
        />
            <HeartButton currentUser={currentUser} listingId={listingId}/>
        </div>
    </div>
  )
}
