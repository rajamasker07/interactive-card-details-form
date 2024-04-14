import Image from 'next/image'
import React from 'react'
import bgCardBack from '@/assets/bg-card-back.png'

type props = {
  cvc?: string | number,
  className?: string,
}

export default function BackCard({cvc = 123, className}: props) {
  return (
    <div id='backCard' className={`flex w-fit ${className}`} >
      <div className="relative">
        <Image src={bgCardBack} alt='bg card back' className='w-full' />
        <div className='flex absolute top-0 px-[10%] place-content-end z-[12] w-full'>
          <h5 className='text-sm mt-[30%] text-grey-800 font-bold'>{cvc}</h5>
        </div>
      </div>
    </div>
  )
}
