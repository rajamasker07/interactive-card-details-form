'use client'

import React, { useState } from 'react'
import Form from './form';
import { CardFormInterface } from '../utils/interfaces';
import BackCard from './back-card';
import FrontCard from './front-card';

export default function Container() {

  const [data, setData] = useState<CardFormInterface>({
    name: '',
    cardNumber: '',
    expDate: {
      mounth: 0,
      year: 0
    },
    cvc: 0
  });

  const dataOnChange = (data: CardFormInterface): void => {
    setData(data);
  }

  return (
    <div className='flex flex-col-reverse place-content-between md:place-items-center m-3 gap-10 md:flex-row-reverse md:w-2/3'>

      <Form dataOnChange={dataOnChange} />

      <div className='md:flex md:flex-col-reverse' >
        <div className="relative top-10 z-[5] md:-right-10 md:max-w-96">
          <BackCard className='place-content-end' cvc={data.cvc} />
        </div>
        <div className="relative z-10 md:-left-10 md:max-w-96" >
          <FrontCard className='' name={data.name} cardNumber={data.cardNumber} expDate={`${data.expDate.mounth}/${data.expDate.year}`} />
        </div>
      </div>


    </div>
  )
}
