'use client'

import React, { useState } from 'react'
import Form from './form';
import { CardFormInterface } from '../utils/interfaces';

export interface dataInterface {
  name: string,
  cardNumber: string,
}

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
    <Form dataOnChange={dataOnChange} />
  )
}
