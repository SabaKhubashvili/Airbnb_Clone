'use client'
import React, { useCallback, useState } from 'react'
import { SafeUser, safeReservations } from '../types'
import { Container } from '../Components/Container'
import { Heading } from '../Components/Headings/Heading'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { ListingCard } from '../Components/Listings/ListingCard'


interface Props{
    reservations:safeReservations[],
    currentUser:SafeUser
}

export const ReservationsClient = ({
    reservations,
    currentUser 
}:Props) => {

    const router = useRouter();
    const [deletingId,setDeletingId] = useState('')

    const onCancel = useCallback((id:string)=>{
        setDeletingId(id)

        axios.delete(`/api/reservations/${id}`)
            .then(()=>{
                toast.success('Succesfully removed')
                router.refresh()
            })
            .catch(()=>{
                toast.error('Something went wrong')
            })
            .finally(()=>{
                setDeletingId('')
            })
    },[setDeletingId,router])

  return (
    <Container>
        <Heading 
        title='Reservations'
        subTitle='Bookings on you properties'
        /> 
        <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-col-6'>
            {
                reservations.map((reservation)=>(
                    <ListingCard
                    key={reservation.id}
                    data={reservation.listing}
                    reservation={reservation}
                    actionId={reservation.id}
                    onAction={onCancel}
                    disabled={deletingId === reservation.id}
                    actionLabel='Cancel guest reservation'
                    CurrentUser={currentUser}
                    />   
                ))
            }
        </div>
    </Container>
  )
}
