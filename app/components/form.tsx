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
    <form onSubmit={ handleSubmit(onSubmit) } id='form' role='form' >
      
      <FieldName label='name' register={register} errors={errors} />
      <FieldCardNumber label='cardNumber' register={register} errors={errors} />
      <FieldMounth label='expDate.mounth' register={register} errors={errors} />
      <FieldYear label='expDate.year' register={register} errors={errors} />
      <FieldCVC label='cvc' register={register} errors={errors} />

      <input type="submit" value="submit" />
    </form>
  )
}
