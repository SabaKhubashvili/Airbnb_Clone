'use client'
import React, { useCallback, useMemo, useState } from 'react'
import { Modal } from './Modal'
import { useSearchModal } from '@/app/hooks/useSearchModal'
import { useRouter, useSearchParams } from 'next/navigation'
import { Range } from 'react-date-range'
import dynamic from 'next/dynamic'
import { CountrySelect, CountrySelectValue } from '../Inputs/CountrySelect'
import queryString from 'query-string'
import { formatISO } from 'date-fns'
import { Heading } from '../Headings/Heading'
import Calendar from '../Inputs/Calendar'
import { Counter } from '../Inputs'

enum Steps{
    LOCATION=0,
    DATE=1,
    INFO=2
}

export const SearchModal = () => {
    const router = useRouter()
    const params = useSearchParams()
    const searchModal = useSearchModal();

    const [step,setStep] = useState<Steps>(Steps.LOCATION);

    const [location,setLocation] = useState<CountrySelectValue>()
    const [guestCount,setGuestCount] = useState<number>(1)
    const [roomCount,setRoomCount] = useState<number>(1)
    const [bathroomCount,setbahtroomCount] = useState<number>(1)

    const [dateRange,setDateRange] = useState<Range>({
            startDate:new Date(),
            endDate:new Date(),
            key:'selection'
    })
    
    const Map = useMemo(()=>
        dynamic(()=> import('../Maps/Map'),{
            ssr:false
        })
    ,[location])

    const onBack = useCallback(()=>{

        setStep((prevState)=>prevState - 1)
    },[])

    const onNext = useCallback(()=>{
        setStep((prevState)=> prevState + 1)
    },[])

    const onSubmit = useCallback(async () => {
        if (step !== Steps.INFO) {
          return onNext();
        }
    
        let currentQuery = {};
    
        if (params) {
          currentQuery = queryString.parse(params.toString())
        }
    
        const updatedQuery: any = {
          ...currentQuery,
          locationValue: location?.value,
          guestCount,
          roomCount,
          bathroomCount
        };
    
        if (dateRange.startDate) {
          updatedQuery.startDate = formatISO(dateRange.startDate);
        }
    
        if (dateRange.endDate) {
          updatedQuery.endDate = formatISO(dateRange.endDate);
        }
    
        const url = queryString.stringifyUrl({
          url: '/',
          query: updatedQuery,
        }, { skipNull: true });
    
        setStep(Steps.LOCATION);
        searchModal.onClose();
        router.push(url);
      }, 
      [
        step, 
        searchModal, 
        location, 
        router, 
        guestCount, 
        roomCount,
        dateRange,
        onNext,
        bathroomCount,
        params
      ]);

    const actionLabel = useMemo(()=>{
        if(step == Steps.INFO){
            return 'Search'
        }
        return 'Next'
    },[step])
    const secondaryLabel = useMemo(()=>{
        if(step == Steps.LOCATION){
            return undefined
        }
        return 'Back'
    },[step])

    let bodyContent = (
        <div className='flex flex-col gap-8'>
            <Heading title='Where do you wanna go '
            subTitle='Find a perfect location'
            />

            <CountrySelect
            value={location}
            onChange={(value)=> setLocation(value as CountrySelectValue)}
            />
            <hr />

            <Map center={location?.latlng}  />
        </div>
    )

    if(step === Steps.DATE){
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading title='When do you plan to go?'
                subTitle='Make sure everyone is free!'
                />
                 <Calendar
                    onChange={(value) => setDateRange(value.selection)}
                    value={dateRange}
                />
            </div>
        )
    }

    if(step === Steps.INFO){
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading title='More information'
                subTitle='Find your perfect place'
                />
                
                <Counter
                value={guestCount}
                onChange={(value) => setGuestCount(value)}
                title="Guests"
                subTitle="How many guests are coming?"
                />

                <Counter
                value={roomCount}
                onChange={(value) => setRoomCount(value)}
                title="Rooms"
                subTitle="How many rooms do you need"
                />

                <Counter
                value={bathroomCount}
                onChange={(value) => setbahtroomCount(value)}
                title="Bahtroom"
                subTitle="How many bathrooms do you need"
                />
                    </div>
        )
    }

  return (
    <Modal
        isOpen={searchModal.isOpen}
        onClose={searchModal.onClose}
        onSubmit={onSubmit}
        body={bodyContent}
        title='Filters'
        actionLabel={actionLabel}
        secondaryAction={step === Steps.LOCATION ? undefined : onBack}
        secondaryLabel={secondaryLabel}
    />
  )
}
