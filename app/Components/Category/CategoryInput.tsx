import React from 'react'
import { IconType } from 'react-icons'

interface Props{
    label:string,
    icon:IconType
    selected?:boolean,
    onClick:(value:string)=>void
}

export const CategoryInput = ({label,icon:Icon,selected,onClick}:Props) => {
  return (
    <div className={`rounded-xl border-2 p-4 flex flex-col gap-3 md:hover:border-black transition cursor-pointer
    ${selected ? 'border-black': 'border-neutral-200'}
    `} onClick={()=>{onClick(label)}}>

        <Icon size={30}/>
        <div className='font-semibold'>
            {label}
        </div>
        
    </div>
  )
}
