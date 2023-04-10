import { ListingCategory } from '@/app/Components/Listings/ListingCategory'
import useCountries from '@/app/hooks/useCountries'
import { CategoriesInterface, SafeUser } from '@/app/types'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import React from 'react'
import { IconType } from 'react-icons'


const Map = dynamic(() => import("@/app/Components/Maps/Map"), {
  ssr: false,
})

interface Props{
    user:SafeUser
    category?:CategoriesInterface
    description:string
    roomCount:number
    guestCount:number
    bathroomCount:number
    locationValue:string
}

export const ListingInfo = ({
  user,
  category,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  locationValue}:Props) => {
      const {getByValue} = useCountries();
      const coordinates = getByValue(locationValue)?.latlng
      
    
  return (
   <div className='md:col-span-4 cols-span-1 flex flex-col gap-4'>
      <div className='text-lg font-bold flex gap-3 items-center'>
        {category?.label} Hosted By {user.name}
        <div className='w-9'>
        {
          user.image ? (
              <Image
              src={user.image}
              alt='Profile_Image'
              width={100}
              className='rounded-full'
              height={100}
              />
              ):(
                <Image
                src='/Images/placeholder.webp'
                alt='Profile_Image'
                width={100}
                className='rounded-full'
                height={100}
                />
                )
              }
              </div>
      </div>

      <ul className='gap-4 text-neutral-500 flex   pb-2 '>
        <li>
          {roomCount} Rooms,
        </li>
        <li>
            {guestCount} Guests,
        </li>
        <li>
              {bathroomCount} Bathrooms,
        </li>
      </ul>
      <hr />
      {
        category &&(
          <ListingCategory
          {...category}
          />
        )
      }
      <hr />
      <div className='text-lg font-light text-neutral-500'>
        {description}
      </div>
      <hr />
      <Map center={coordinates} />

      
   </div>
  )
}
