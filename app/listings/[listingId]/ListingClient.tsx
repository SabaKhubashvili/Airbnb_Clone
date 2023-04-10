'use client'

import { CategoryArray } from '@/app/Components/Category/Categories'
import { Container } from '@/app/Components/Container'
import { SafeListing, SafeUser, safeReservations } from '@/app/types'
import { Reservation } from '@prisma/client'
import React, { useCallback, useEffect, useMemo } from 'react'
import { ListingHeading } from './ListingHeading'
import { ListingInfo } from './ListingInfo'
import { UseLoginModal } from '@/app/hooks/UseLoginModal'
import { useRouter } from 'next/navigation'
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import  ListingReservation  from '@/app/Components/Listings/ListingReservation'
import { Range } from 'react-date-range'

interface Props {
    reservations?: safeReservations[];
    listing: SafeListing 
    listingCreator:SafeUser 
    currentUser: SafeUser | null;
  }


  const initialDateRange = {
    startDate:new Date(),
    endDate:new Date(),
    key:'selection'
  }

export const ListingClient = ({listing,currentUser, reservations = [] ,listingCreator}:Props) => {


    const loginModal = UseLoginModal();
    const router = useRouter()

    const disabledDates= useMemo(()=>{
        let dates: Date[] = []

        reservations.forEach((reservation:any)=>{
            const range = eachDayOfInterval({
                start:new Date(reservation.startDate),
                end:new Date(reservation.endDate)
            })
            dates = [...dates,...range]
        })
        return dates
    },[reservations])

    const category = React.useMemo(()=>{
        return CategoryArray.find((item)=> item.label === listing.category)
    },[listing.category])
    
    const [isLoading,setIsLoading] = React.useState<boolean>(false) 
    const [totalPrice,setTotalPrice] = React.useState<number>(listing.price)   
    const [dateRange,setDateRange] = React.useState<Range>(initialDateRange) 

    const onCreateReservations = useCallback(()=>{
        if(!currentUser){
            return loginModal.onOpen()
        }

        setIsLoading(true)  

        axios.post('/api/reservations',{
            totalPrice,
            startDate: dateRange.startDate,
            endDate:dateRange.endDate,
            listingId:listing.id 
        }).then(()=>{
            toast.success('Listing reserved')
            setDateRange(initialDateRange)

            router.push('/Trips')

        }).catch(()=>{
            toast.error('Something went wrong')
        }).finally(()=>{
            setIsLoading(false)
        })
    },[totalPrice,dateRange,listing.id,loginModal,router,currentUser])

    useEffect(()=>{
        if(dateRange.startDate && dateRange.endDate){
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            )
            if(dayCount && listing.price){
                setTotalPrice(dayCount * listing.price)
            }else{
                setTotalPrice(listing.price)
            }
        } 
    },[dateRange,listing.price,setTotalPrice])

  return (
    <Container>
        <div className='max-w-screen-lg mx-auto'>
            <div className='flex flex-col gap-6'>
                <ListingHeading
                    title={listing.title}
                    locationValue={listing.locationValue}
                    imageSrc={listing.imageSrc}
                    currentUser={currentUser}
                    listingId={listing.id}

                />
                <div className='grid grid-cols-1 md:grid-cols-7 gap-4'>
                
                <ListingInfo
                    user={listingCreator}
                    category={category}
                    description={listing.description}
                    roomCount={listing.roomCount}
                    guestCount={listing.guestCount}
                    bathroomCount={listing.bathroomCount}
                    locationValue={listing.locationValue}
                    />

                    <div className='order-first mb-10 md:order-last md:col-span-3'>
                        <ListingReservation price={listing.price} totalPrice={totalPrice} 
                        onChangeDate={(value) => setDateRange(value)} dateRange={dateRange} onSubmit={onCreateReservations}
                        disabled={isLoading} disabledDates={disabledDates} />
                    </div>

                </div>
            </div>
        </div>
    </Container>
  )
}
