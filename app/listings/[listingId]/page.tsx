import { ClientOnly } from '@/app/Components/ClientOnly'
import { EmptyState } from '@/app/Components/EmptyState'
import getCurrentUser from '@/app/actions/getCurrentUser'
import  getListingById  from '@/app/actions/getListingById'
import React from 'react'
import { ListingClient } from './ListingClient'
import { SafeListing } from '@/app/types'
import getReservations from '@/app/actions/getReservations'

interface IParams {
  listingId?: string;
} 

const page = async ({ params }: { params: IParams }) => {
    
    const listing = await getListingById(params)
    const currentUser = await getCurrentUser();
    const reservations = await getReservations(params)
    
    


    if(!listing){
      return (
        <ClientOnly>
          <EmptyState/>
        </ClientOnly>
      )
    }
  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        listingCreator={listing.user}
        reservations={reservations}
        currentUser = {currentUser}
      />
    </ClientOnly>
  )
}
export default page