'use client'

import React, { useCallback, useState } from 'react'
import { SafeListing, SafeUser } from '../types'
import { Container } from '../Components/Container'
import { Heading } from '../Components/Headings/Heading'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { ListingCard } from '../Components/Listings/ListingCard'

interface Props{
    listings:SafeListing[]
    currentUser:SafeUser | null
}

export const PropertiesClient = ({
    listings,
    currentUser
}:Props) => {

    const router = useRouter();
    const [deletingId,setDeletingId] = useState('')

    const onCancel = useCallback((id:string)=>{
        setDeletingId(id)

        axios.delete(`/api/properties/${id}`) 
            .then(()=>{
                toast.success('Succesfully removed')
                router.refresh()
            }).catch(error=>{
                toast.error(error?.response?.data?.error)
            }).finally(()=>{
                setDeletingId('')
            })
    },[router])

  return (
    <Container>
        <Heading title='Properties' subTitle='List of your properties' center />

        <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:grid-col-6 gap-8'>
            {
                listings.map((listings)=>(
                    <ListingCard key={listings.id}
                                data={listings}
                                actionId={listings.id}
                                onAction={onCancel}
                                disabled={deletingId === listings.id}
                                actionLabel='Delete Property'
                                CurrentUser={currentUser}
                    />
                ))
            }
        </div>
    </Container>
  )
}
