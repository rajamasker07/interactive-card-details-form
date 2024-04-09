import Image from 'next/image'
import React from 'react'
import bgCardBack from '@/assets/bg-card-back.png'

type props = {
  cvc?: string | number,
  className?: string,
}

export default function BackCard({cvc = 123, className}: props) {
  return (
    <div id='backCard' className={`flex w-full ${className}`} >
      <div className="relative">
        <Image src={bgCardBack} alt='bg card back' className='w-full' />
        <h5 className='flex w-full text-right md:top-[45%] top-[40%] z[11] absolute place-content-end md:px-10 px-6 text-gray-800 text-sm font-bold' >{cvc}</h5>
      </div>
    </div>
  )
}
