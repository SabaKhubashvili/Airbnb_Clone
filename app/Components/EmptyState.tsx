'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Heading } from './Headings/Heading'
import { MainButton } from './Buttons'

interface Props{
    title?:string,
    subTitle?:string
    showReset?:boolean
}

export const EmptyState = ({title='No exact mathes',subTitle = 'Try changing or remove some of yor filters',showReset}:Props) => {
  const router = useRouter()

    return (
    <div className='h-[60vh] flex flex-col gap-2 justify-center items-center text-center'>
        <Heading title={title} subTitle={subTitle} center />
        <div className='w-48 mt-4'>
            {
                showReset &&
                (
                    <MainButton label='Remove all filters' onClick={()=>{router.push('/')}} outline/>
                )
            }
        </div>
    </div>
  )
}
