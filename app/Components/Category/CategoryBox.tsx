'use client'

import { CategoriesInterface } from '@/app/types'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback } from 'react'
import queryString from 'query-string'

interface Props extends CategoriesInterface{
    selected?:boolean
}

export const CategoryBox = ({label,description,icon:Icon,selected}:Props) => {
    const router = useRouter();
    const params = useSearchParams();

   const handleClick = useCallback(()=>{
    let Query;
    if(!selected){
         Query = {
            category:label
        }
    }
    else{
        Query = {}
    }
    

    const url = queryString.stringifyUrl({
        url:'/',
        query:Query
    })

    router.push(url)
   },[router,params,label])
  return (
    <div
    onClick={handleClick}
    className={`
    ${selected ? 'border-b-800': 'border-transparent'}
    ${selected ? 'text-neutral-800' : 'text-neutral-500'}
    flex flex-col items-center justify-center gap-2
    border-b-2 p-3 hover:text-neutral-800 transition cursor-pointer`}
    >
        <Icon size={26} />
        <div className='font-medium text-sm'>
            {label}
        </div>
    </div>
  )
}
