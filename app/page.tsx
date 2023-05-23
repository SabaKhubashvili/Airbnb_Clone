import { ClientOnly } from "./Components/ClientOnly";
import {Container } from "./Components/Container";
import { EmptyState } from "./Components/EmptyState";
import { ListingCard } from "./Components/Listings/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";
import { IlistingsParmas, getListings } from "./actions/getListings";
import { SafeListing } from "./types";

interface Props{
  searchParams: IlistingsParmas
}

const Home = async({searchParams}:Props) => {

  const listings = await getListings(searchParams)
  console.log(listings);
  
  const currentUser = await getCurrentUser();

  if(listings.length <= 0) {
    return(
    <ClientOnly>
      <EmptyState showReset />
    </ClientOnly>
      )
  }

  return (
    <ClientOnly>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {
            listings.map((listing:SafeListing)=>{
              return(
                <ListingCard key={listing.id} data={listing} CurrentUser={currentUser} />
              )
            })
          }
        </div>
      </Container>
    </ClientOnly>
  )
}

export default  Home