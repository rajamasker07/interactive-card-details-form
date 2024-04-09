'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import FieldName, { FieldCVC, FieldCardNumber, FieldMounth, FieldYear } from './custom-input'
import { CardFormInterface } from '../utils/interfaces'


export interface formProps {
  dataOnChange: (data: CardFormInterface) => void
}

export default function Form( { dataOnChange }: formProps ) {

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<CardFormInterface>()

  const onSubmit = ( data: CardFormInterface) => {

    dataOnChange(data);

  }

  return (
    <form onSubmit={ handleSubmit(onSubmit) } id='form' role='form' className='flex gap-3 w-full flex-col md:w-4/12' >
      <FieldName label='name' register={register} errors={errors} name='Name' />
      <FieldCardNumber label='cardNumber' register={register} errors={errors} name='Card Number' />
      <div className="inline-flex gap-3 w-fit max-w-full">
        <div className="inline-flex gap-3 w-1/2">
          <FieldMounth label='expDate.mounth' register={register} errors={errors} name='MM' />
          <FieldYear label='expDate.year' register={register} errors={errors} name='YY' />
        </div>
        <FieldCVC label='cvc' register={register} errors={errors} name='CVC'/>
      </div>
      <input type="submit" value="submit" className='flex w-full bg-[#1F0A31] text-white rounded-md py-3 uppercase font-bold text-center cursor-pointer' />
    </form>
  )
}
