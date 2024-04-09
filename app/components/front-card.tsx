import Image from 'next/image'
import React from 'react'
import bgCardFront from '@/assets/bg-card-front.png'
import { formatCardNumber } from '../utils/helper'

type props = {
  className?: string,
  cardNumber?: string,
  name?: string,
  expDate?: string,
}

export default function FrontCard({
  cardNumber = '0000000000000000',
  name = 'jane',
  expDate = '00/00',
  className
}: props) {
  return (
    <div id='frontCard' className={`flex ${className}`} >
      <div className="relative">
        <Image src={bgCardFront} alt='bg card back' className='w-full' />
        <div className="inline-flex w-full px-6 absolute top-4 gap-2 place-items-center">
          <div className="flex size-6 bg-white rounded-full"></div>
          <div className="flex size-4 border-white border rounded-full"></div>
        </div>
        <hgroup className='flex flex-col w-full top-2/4 z[11] absolute px-6 text-white gap-2'>
          <h1 className='font-bold text-sm md:text-lg' >
            { cardNumber === '' ? formatCardNumber('0000000000000000') : formatCardNumber(cardNumber)}
          </h1>
          <h3 className="text-xs inline-flex justify-between">
            {name === '' ? 'Jane' : name}
            <span className='text-right'>
              {expDate}
            </span>
          </h3>
        </hgroup>

      </div>
    </div>
  )
}
