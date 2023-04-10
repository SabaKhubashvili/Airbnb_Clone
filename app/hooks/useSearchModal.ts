import { create } from "zustand";

interface searchModalStore{
    isOpen:boolean,
    onOpen:()=>void,
    onClose:()=>void
}

export const useSearchModal  = create<searchModalStore>((set)=>({
    isOpen:false,
    onOpen:() => set({isOpen:true}),
    onClose:() => set({isOpen:false})
}))