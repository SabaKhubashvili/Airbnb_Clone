'use client'

interface Props{
    children:React.ReactNode
}

export const Container = ({children}:Props) => {
  return (
    <div 
    className="max-w-[2520px] mx-auto xl:px-20 md:px10 sm:px-2 px-4">
        {children}
    </div>
  )
}
