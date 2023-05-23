'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

export const Logo = () =>{
    const Router = useRouter()
    
    return(
        <Image alt="Logo"
        onClick={()=>{Router.push('/')}}
        className="hidden md:block cursor-pointer w-auto h-auto"
        height={100}
        width={100}
        src='/images/logo.webp'/>
    )
}
