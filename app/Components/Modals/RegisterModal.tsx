'use client'

import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai'
import {FcGoogle} from 'react-icons/fc'
import { useCallback,useState } from 'react'
import{
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form'
import { useRegisterModal } from '@/app/hooks/UseRegisterModal'
import { Modal } from './Modal'
import { Heading } from '../Headings/Heading'
import { NavInput } from '../Inputs'

import toast from 'react-hot-toast'
import { MainButton } from '../Buttons'
import { signIn } from 'next-auth/react'
import { UseLoginModal } from '@/app/hooks/UseLoginModal'


export const RegisterModal = () => {
  
    const RegisterModal =  useRegisterModal();
    const LoginModal = UseLoginModal();
    const [isLoading,setIsLoading] = useState<boolean>(false)

    const {
        register,
        handleSubmit,
        formState:{
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues:{
            name: '' ,
            email: '',
            password: '',
         }
    })
    const onToggle = useCallback(()=>{
        RegisterModal.onClose()
        LoginModal.onOpen()
    },[RegisterModal,UseLoginModal])

    const onSubmit: SubmitHandler<FieldValues> = (data) =>{
        setIsLoading(true)

        axios.post('/api/register',data)
            .then(()=>{
                toast.success('Succesfully registered')
                RegisterModal.onClose()
                LoginModal.onOpen()
            }).catch(error=>{
                toast.error('Something Went Wrong')
            }).finally(()=>{
                setIsLoading(false)
            })
    }
    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading title='Welcome to Airbnb' subTitle='Create a accaunt'/>
            <NavInput  id='email' label='Email' disabled={isLoading} register={register} errors={errors} required/>
            <NavInput  id='name' label='Name' disabled={isLoading}  register={register} errors={errors} required/>
            <NavInput  id='password' label='Password' disabled={isLoading} type='password' register={register} errors={errors} required/>
        </div>
    )
    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <MainButton onClick={()=>signIn('google')} label='Continue with Google' Icon={FcGoogle} outline  />
            <MainButton onClick={()=>signIn('github')} label='Continue with Github' Icon={AiFillGithub} outline  />

            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className='flex flex-row gap-2 items-center justify-center'>
                    Already Have Accaunt? <a onClick={onToggle} className='text-neutral-800 cursor-pointer hover:underline'>Log in</a>
                </div>
            </div>
        </div>  
    )

    return (
    <Modal disabled={isLoading} isOpen={RegisterModal.isOpen} title='Register' actionLabel='Continue' onClose={RegisterModal.onClose}
    onSubmit={handleSubmit(onSubmit)} body={bodyContent} footer={footerContent}   />
  )
}
