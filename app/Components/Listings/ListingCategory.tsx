import { CategoriesInterface } from '@/app/types'
import React from 'react'



export const ListingCategory = ({label,description,icon:Icon}:CategoriesInterface) => {
  return (
    <div className='flex items-center gap-4'>
        <Icon size={40}/>

        <div>
            <h4 className='font-bold'>{label}</h4>
            <p className='text-neutral-400'>{description}</p>
        </div>
    </div>
  )
}
