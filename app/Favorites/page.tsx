import React from 'react'
import getCurrentUser from '../actions/getCurrentUser'
import { ClientOnly } from '../Components/ClientOnly'
import { EmptyState } from '../Components/EmptyState'

import getFavoriteListings from '../actions/getFavoriteListings'
import { FavoritesClient } from './FavoritesClient'



const page = async() => {

    const currentUser = await getCurrentUser()
    const listings = await getFavoriteListings();
    
    if(listings.length <= 0){

      return (
        <ClientOnly>
    <EmptyState title='No favorites found' subTitle='Looks like you have no favorite listings.' />
   </ClientOnly>
    )
  }

  return(
    <ClientOnly>
      <FavoritesClient currentUser={currentUser} listings={listings} />
    </ClientOnly>
  )

}

export default page