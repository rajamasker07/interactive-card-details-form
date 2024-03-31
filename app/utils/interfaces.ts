export interface CardFormInterface {
  name: string,
  cardNumber: string,
  expDate: ExpDate
  cvc: number
}

interface ExpDate {
  mounth: number,
  year: number
}