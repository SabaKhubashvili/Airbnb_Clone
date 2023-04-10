'use client'

import useCountries from '@/app/hooks/useCountries'
import { SafeListing, SafeUser, safeReservations } from '@/app/types'
import { format } from 'date-fns'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useCallback, useMemo } from 'react'
import { HeartButton } from './HeartButton'
import { MainButton } from '../Buttons'

interface Props{
  data:SafeListing
  reservation?:safeReservations
  onAction?:(id:string)=>void
  disabled?:boolean
  actionLabel?:string
  actionId?:string
  CurrentUser?: SafeUser | null
}

export const ListingCard = ({data,disabled,reservation,onAction,actionId = "",actionLabel,CurrentUser}:Props) => {
  const router  = useRouter()
  const {getByValue} = useCountries();

  const location = getByValue(data.locationValue)

  const handleCancel = useCallback((e:React.MouseEvent<HTMLButtonElement>)=>{
    e.stopPropagation()
    if(disabled){
      return;
    }
    onAction?.(actionId)
  },[actionId,onAction,disabled])

  const price = useMemo(()=>{
    if(reservation){
      return reservation.totalPrice
    }
    return data.price
  },[reservation,data])

  const reservationDate = useMemo(()=>{
    if(!reservation){
      return null
    }

    const start = new Date(reservation.startDate)
    const end = new Date(reservation.endDate)
    
    return `${format(start,'PP')} - ${format(end,'PP')}`
  },[reservation])
  
  return (
    <div className='col-span-1 row-span-1 cursor-pointer flex flex-col gap-4 min-h-[22rem] group relative ' onClick={()=>{router.push(`/listings/${data.id}`)}}>
      <div className='w-full h-full'>
        <Image 
        src={data.imageSrc}
        alt={data.title}
        width={400}
        height={400}
        className='w-full  object-cover min-h-full rounded-xl group-hover:scale-105 transition-transform duration-300'
        />
      </div>

        <HeartButton listingId={data.id} currentUser={CurrentUser} />

      <div className='flex flex-col justify-start'>
        <div className='font-bold'>
          {location?.region} ,{location?.label}
        </div>
        <div className='font-light text-neutral-500'>
            {reservationDate || data.category}
        </div>
        <div>
          <span className='text-black font-bold'>${price}
          
          {!reservation && (
            <span> night</span>
          )}
          </span>
        </div>
      </div>
      {
        onAction && actionLabel && (
          <MainButton
            label={actionLabel} 
            onClick={handleCancel}
            disabled={disabled}         
          />
        )
      }
    </div>
  )
}
