import prisma from '@/app/Libs/prismadb'
import getCurrentUser from './getCurrentUser'



export default async function(){
    try{
        const currentUser = await getCurrentUser();
        if(!currentUser){
            return []
        }

        const favorites = await prisma.listing.findMany({
            where:{
                id:{
                    in:[...(currentUser.favoriteIds  || [] )]
                }
            }
        })

        const safeFavorites = favorites.map((favorites)=>({
            ...favorites,
            createdAt: favorites.createdAt.toISOString()
        }),[])

        return safeFavorites

    }catch(error:any){
        throw new Error(error);
    }
}
