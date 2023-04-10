import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import { SafeUser } from "../types";
import { UseLoginModal } from "./UseLoginModal";


interface Props{
    listingId   :string,
    currentUser?:SafeUser | null
}
const useFavorite = ({listingId,currentUser}:Props) =>{

    const loginModal = UseLoginModal()
    const router = useRouter();

    
    if(!listingId || typeof listingId !== 'string'){
        throw new Error('Invalid listing id')
    }
    
    const hasFavorited = useMemo(()=>{
        
        const favoritedArr = currentUser?.favoriteIds || []
        
        return favoritedArr.includes(listingId)
    },[listingId,currentUser])
    
    const toggleFavorite = useCallback(async (e:React.MouseEvent<HTMLDivElement>)=>{
        e.stopPropagation()

        if(!currentUser){
           return loginModal.onOpen()
        }

        try{
            let request;
            
            if(hasFavorited){
                request = () => axios.delete(`/api/favorites/${listingId}`)
            }else{
                request = () => axios.post(`/api/favorites/${listingId}`);
            }
            await request();
            router.refresh();
            toast.success('Success')

        }catch(error){
            toast.error('Something went wrong')
        }
        
    },[currentUser,hasFavorited,loginModal,router,toast,listingId])
    return{
        hasFavorited,
        toggleFavorite
    }
}

export default useFavorite