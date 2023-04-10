'use client'

interface Props{
    title:string,
    subTitle?:string,
    center?:boolean
}

export const Heading = ({title,subTitle,center}:Props) => {
  return (
    <div className={`${center ? 'text-center' : 'text-start'}`}>
        <div className="text-2xl font-bold">
            {title}
        </div>
        {
            subTitle && 
            (
                <div className="font-light text-neutral-500">
                    {subTitle}
                </div>
            )
        }

    </div>
  )
}
