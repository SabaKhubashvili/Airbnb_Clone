import React from 'react'
import { SafeListing, SafeUser } from '../types'
import { Container } from '../Components/Container'
import { Heading } from '../Components/Headings/Heading'
import { ListingCard } from '../Components/Listings/ListingCard'

interface Props{
    listings:SafeListing[],
    currentUser?:SafeUser | null
}

export const FavoritesClient = ({listings,currentUser}:Props) => {
  return (
    <Container>
        <Heading title='Favorites' subTitle='List of places you have favorited'/>

        <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-col-6'>
            {
                listings.map((listing)=>(
                    <ListingCard data={listing} CurrentUser={currentUser} key={listing.id} />
                ))
            }
        </div>
    </Container>
  )
}
