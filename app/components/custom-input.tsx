'use client'

import React, { ChangeEvent, ChangeEventHandler, useState } from 'react'
import { FieldErrors, Path, UseFormRegister } from 'react-hook-form'
import { CardFormInterface } from '../utils/interfaces'
import { convertText } from '../utils/helper'

type props = {
  label: Path<CardFormInterface>
  register: UseFormRegister<CardFormInterface>
  errors: FieldErrors<CardFormInterface>
}

/**
 * 
 * Custom input field name
 * 
 * @param label Path<CardForminterface> 
 * @param register UseFormRegister<CardFormInterface>
 * @param register FieldErrors<CardFormInterface>
 * @returns React component
 */

export default function FieldName({ label, register, errors }: props) {
  return (
    <div>
      <label htmlFor={label}>{ convertText(label)}</label>
      <input type="text" id={label} { 
        ...register(label, {
          required: {
            value: true,
            message: 'name is required'
          },
          pattern: {
            value: /^[a-zA-Z\s]{1,}$/i, // Regular expression to check the name
            message: 'name cant contain numbers or special characters'
          },
          minLength: {
            value: 2,
            message: 'minimum length of name should be 2 chars.'
          },
          maxLength: {
            value: 15,
            message: 'maximum lenght of name should be 15 chars.'
          }
        })
      } 
      aria-invalid={ errors.name ? 'true' : 'false'}
      aria-errormessage={`${label}ErrorMessage`}/>
      {
        errors.name && <span id={`${label}ErrorMessage`} role='alert'>{ errors.name.message }</span>
      }
    </div>
  )
}

export function FieldCardNumber({ label, register, errors }: props) {

  const [cardNumber, setCardNumber] = useState('')

  const formatCardNumber = (value: string) => {

    const formattedValue = value.replace(/\d{4}(?!\s)/g, '$& ');

    return formattedValue.trim();

  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    
    const formatted = formatCardNumber(event.target.value)

    setCardNumber(formatted)

  }

  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <input type="text" id={label} { 
        ...register(label, {
          required: {
            value: true,
            message: 'card number is required'
          },
          pattern: {
            value: /^\d{0,16}(?:\s\d{0,16})*$/,
            message: 'only digits are allowed'
          },
          minLength: {
            value: 19,
            message: 'minimum length of card number should be 16.'
          },
          maxLength: {
            value: 19,
            message: 'maximum lenght of card number should be 16'
          },
        })
      }
      value={cardNumber}
      onChange={handleChange}
      aria-invalid={ errors.cardNumber ? 'true' : 'false'}
      aria-errormessage={`${label}ErrorMessage`}/>
      {
        errors.cardNumber && <span id={`${label}ErrorMessage`} role='alert'>{ errors.cardNumber.message }</span>
      }
    </div>
  )
}

export function FieldMounth({ label, register, errors }: props) {
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <input type="text" id={label} { 
        ...register(label, {
          required: {
            value: true,
            message: 'mount is required'
          },
          pattern: {
            value: /^(0[1-9]|1[0-2])$/,
            message: 'only 01-12 are allowed'
          },
        })
      }
      aria-invalid={ errors.expDate?.mounth ? 'true' : 'false'}
      aria-errormessage={`${label}ErrorMessage`}/>
      {
        errors.expDate?.mounth && <span id={`${label}ErrorMessage`} role='alert'>{ errors.expDate.mounth.message }</span>
      }
    </div>
  )
}

export function FieldYear({ label, register, errors }: props) {

  const currentYear = new Date().getFullYear().toString().slice(2, 4);

  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <input type="text" id={label} { 
        ...register(label, {
          required: {
            value: true,
            message: 'year is required'
          },
          pattern: {
            value: /^(\d{2})$/,
            message: 'only number are allowed'
          },
          minLength: {
            value: 2,
            message: 'must be a two digit year'
          },
          maxLength: {
            value: 2,
            message: 'must be a two digit year'
          },
          min: {
            value: currentYear,
            message: 'must be more than or equal to current year'
          },
        })
      }
      defaultValue={ currentYear }
      aria-invalid={ errors.expDate?.year ? 'true' : 'false'}
      aria-errormessage={`${label}ErrorMessage`}/>
      {
        errors.expDate?.year && <span id={`${label}ErrorMessage`} role='alert'>{ errors.expDate.year.message }</span>
      }
    </div>
  )
}

export function FieldCVC({ label, register, errors }: props) {
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <input type="text" id={label} { 
        ...register(label, {
          required: {
            value: true,
            message: 'cvc is required'
          },
          pattern: {
            value: /^([0-9]{3})$/,
            message: 'only accepted numeric'
          },
          minLength: {
            value: 3,
            message: 'must be a three digits'
          },
          maxLength: {
            value: 3,
            message: 'must be a three digits'
          },
        })
      }
      aria-invalid={ errors.cvc ? 'true' : 'false'}
      aria-errormessage={`${label}ErrorMessage`}/>
      {
        errors.cvc && <span id={`${label}ErrorMessage`} role='alert'>{ errors.cvc.message }</span>
      }
    </div>
  )
}
