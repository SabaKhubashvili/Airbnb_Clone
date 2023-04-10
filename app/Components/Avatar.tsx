'use client'

import Image from "next/image"

interface Props{
  src:string | undefined | null
}

export const Avatar = ({src}:Props) => {
  return (
    
    <Image className="rounded-full"
    height={30}
    width={30}
    alt="avatar"
    src={src || '/images/placeholder.webp'}
    draggable='true'/>
  )
}
