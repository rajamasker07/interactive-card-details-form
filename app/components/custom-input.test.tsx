import { useForm } from "react-hook-form"
import { CardFormInterface } from "../utils/interfaces"
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import FieldName, { FieldCVC, FieldCardNumber, FieldMounth, FieldYear } from "./custom-input"

describe('Custom Input Component', () => { 

  const user = userEvent.setup()
  let submitElm: HTMLInputElement

  afterEach(() => {
    cleanup()
  })

  describe('Name Field', () => {

    const onSubmitMock = jest.fn()
    let nameFieldElm: HTMLInputElement

    beforeEach(() => {

      render(
        <FormMock/>
      )

      nameFieldElm = screen.getByRole('textbox', {
        name: /Name/i
      })

      submitElm = screen.getByRole('button', {
        name: /submit/i
      })

    })

    const FormMock = () => {

      const {
        handleSubmit,
        register,
        formState: {
          errors
        }
      } = useForm<CardFormInterface>()

      return (
        <form onSubmit={handleSubmit(onSubmitMock)}>
          
          <FieldName label="name" register={register} errors={errors}/>

          <input type="submit" value="submit" />

        </form>
      )
    }

    afterEach(() => {
      cleanup()
      jest.clearAllMocks()
    })

    it("Should render name field with correct type and id", () => {

      expect( nameFieldElm ).toBeInTheDocument()
      expect( nameFieldElm.type ).toEqual( "text" )
      expect( nameFieldElm.id ).toEqual( "name" )

    });

    it('should display error message required if  the input is not filled out', async () => {

      await user.click(submitElm)

      const errormessages = await screen.queryAllByRole('alert') as HTMLElement[]

      await waitFor(() => {
        expect(errormessages).toHaveLength(1)
        expect(errormessages[0].textContent).toContain('name is required')
        expect(onSubmitMock).not.toHaveBeenCalled()
        expect(nameFieldElm.value).toEqual('')
      })

    })

    it('should display error message if value has a number', async () => {

      const value = 'john123'

      await user.click(nameFieldElm)
      await user.keyboard(value)
      await user.click(submitElm)

      const errormessages = await screen.queryAllByRole('alert') as HTMLElement[]

      await waitFor(() => {
        expect(errormessages).toHaveLength(1)
        expect(errormessages[0].textContent).toContain('name cant contain numbers or special characters')
        expect(onSubmitMock).not.toHaveBeenCalled()
        expect(nameFieldElm.value).toEqual('john123')
      })

    })

    it('should display error message if value has a special character', async () => {
      
      const value = '@john'

      await user.click(nameFieldElm)
      await user.keyboard(value)
      await user.click(submitElm)

      const errormessages = await screen.queryAllByRole('alert') as HTMLElement[]

      await waitFor(() => {
        expect(errormessages).toHaveLength(1)
        expect(errormessages[0].textContent).toContain('name cant contain numbers or special characters')
        expect(onSubmitMock).not.toHaveBeenCalled()
        expect(nameFieldElm.value).toEqual('@john')
      })
    })

    it('should display error message if length of value  is less than 2 characters ', async () => {

      const value = 'I'

      await user.click(nameFieldElm)
      await user.keyboard(value)
      await user.click(submitElm)

      const errorMessages = await screen.queryAllByRole('alert') as HTMLElement[]

      await waitFor(() => {

        expect(errorMessages).toHaveLength(1)
        expect(errorMessages[0].textContent).toContain('minimum length of name should be 2 chars.')
        expect(onSubmitMock).not.toHaveBeenCalled()
        expect(nameFieldElm.value).toEqual('I')

      })

    } )

    it('shoud display error message if length of value is more than 15 characters', async () => {
      const value = 'this is name with more than fifteen charachters'

      await user.click(nameFieldElm)
      await user.keyboard(value)
      await user.click(submitElm)

      const errorMessages = await screen.queryAllByRole('alert') as HTMLElement[]

      await waitFor(() => {

        expect(errorMessages).toHaveLength(1)
        expect(errorMessages[0].textContent).toContain('maximum lenght of name should be 15 chars.')
        expect(onSubmitMock).not.toHaveBeenCalled()
        expect(nameFieldElm.value).toEqual('this is name with more than fifteen charachters')

      })

    })

    it('should success form', async () => {

      const value = 'john dhoe'

      await user.click(nameFieldElm)
      await user.keyboard(value)
      await user.click(submitElm)

      const errorMessages = await screen.queryAllByRole('alert') as HTMLElement[]

      await waitFor(() => {

        expect(errorMessages).toHaveLength(0)
        expect(onSubmitMock).toHaveBeenCalled()
        expect(nameFieldElm.value).toEqual('john dhoe')

      })

    })

  })

  describe('Card Number Field', () => { 

    const onSubmitMock = jest.fn()
    let cardNumberFieldElm: HTMLInputElement

    const FormMock = () => {

      const {
        handleSubmit,
        register,
        formState: {
          errors
        }
      } = useForm<CardFormInterface>()

      return (
        <form onSubmit={handleSubmit(onSubmitMock)}>
          
          <FieldCardNumber label="cardNumber" register={register} errors={errors}/>

          <input type="submit" value="submit" />

        </form>
      )
    }

  
    beforeEach(() => {

      render(
        <FormMock/>
      )

      cardNumberFieldElm = screen.getByRole('textbox', {
        name: /cardNumber/i
      })

      submitElm = screen.getByRole('button', {
        name: /submit/i
      })

    })

    afterEach(() => {
      cleanup()
      jest.clearAllMocks()
    })

    test('should rendered card nmumber field  with correct type and id', () => {

      expect(cardNumberFieldElm).toBeInTheDocument()
      expect(cardNumberFieldElm.type).toEqual("text")
      expect(cardNumberFieldElm.id).toEqual("cardNumber")

    })

    test('should display error message if card number field is not filled', async () => {

      await userEvent.click(submitElm)

      const errorMessages = await screen.queryAllByRole('alert') as HTMLElement[]

      await waitFor(() => {

        expect(errorMessages).toHaveLength(1)
        expect(errorMessages[0]).toHaveTextContent(/card number is required/i)
        expect(onSubmitMock).not.toHaveBeenCalled()
        expect(cardNumberFieldElm.value).toEqual('')

      })
      
    })

    test('should display error message if value of card number field is less than 16 digits', async () => {

      const value = '12341234'

      await user.click(cardNumberFieldElm)
      await user.keyboard(value)
      await user.click(submitElm)
      waitFor(() => {

        const errorMessages = screen.queryAllByRole('alert') as HTMLElement[]

        expect(errorMessages).toHaveLength(1)
        expect(errorMessages[0]).toHaveTextContent(/minimum length of card number should be 16./i)
        expect(onSubmitMock).not.toHaveBeenCalled()

      })

    })

    test('should display error message if value of card number field is more than 16 digits', async () => {

      const value = '12341234123412341234'

      await user.click(cardNumberFieldElm)
      await user.keyboard(value)
      await user.click(submitElm)
      await waitFor(() => {

        const errorMessages = screen.queryAllByRole('alert') as HTMLElement[]

        expect(errorMessages).toHaveLength(1)
        expect(errorMessages[0]).toHaveTextContent(/maximum lenght of card number should be 16/i)
        expect(onSubmitMock).not.toHaveBeenCalled()

      })

    })

    test('should value of card number field has spaces in every four characters and success', async () => {

      const value = '1234123412341234'

      await user.click(cardNumberFieldElm)
      await user.keyboard(value)
      await user.click(submitElm)

      await waitFor(() => {

        const errorMessages = screen.queryAllByRole('alert') as HTMLElement[]

        expect(errorMessages).toHaveLength(0)
        expect(cardNumberFieldElm).toHaveValue('1234 1234 1234 1234')
        expect(onSubmitMock).toHaveBeenCalled()

      })

    })

    test('should display error message if value of card number field has contain non-digit characters', async () => {

      const value = '123412341234123A'

      await user.click(cardNumberFieldElm)
      
      await user.keyboard(value)

      await user.click(submitElm)

      const errorMessages = await screen.queryAllByRole('alert') as HTMLElement[]

      waitFor(() => {        

        expect(errorMessages).toHaveLength(1)
        expect(errorMessages[0]).toHaveTextContent(/only digits are allowed/i)
        expect(onSubmitMock).not.toHaveBeenCalled()

      })

    })

    test('should display error message if value of card number field has contain special character', async () => {

      const value = '123412341234123@'

      await user.click(cardNumberFieldElm)
      await user.keyboard(value)
      await user.click(submitElm)
      const errorMessages = await screen.queryAllByRole('alert') as HTMLElement[]
      
      waitFor(() => {

        expect(errorMessages).toHaveLength(1)
        expect(errorMessages[0]).toHaveTextContent(/only digits are allowed/i)
        expect(onSubmitMock).not.toHaveBeenCalled()
      })

    })

  })

  describe('Field Mounth', () => {

    const onSubmitMock = jest.fn()
    let mounthFieldElm: HTMLInputElement

    const FormMock = () => {

      const {
        handleSubmit,
        register,
        formState: {
          errors
        }
      } = useForm<CardFormInterface>()

      return (
        <form onSubmit={handleSubmit(onSubmitMock)}>
          
          <FieldMounth label="expDate.mounth" register={register} errors={errors}/>

          <input type="submit" value="submit" />

        </form>
      )
    }

  
    beforeEach(() => {

      render(
        <FormMock/>
      )

      mounthFieldElm = screen.getByRole('textbox', {
        name: /expDate.mounth/i
      })

      submitElm = screen.getByRole('button', {
        name: /submit/i
      })

    })

    afterEach(() => {
      cleanup()
      jest.clearAllMocks()
    })

    test('should rendered component', () => {

      expect(mounthFieldElm).toBeInTheDocument()
      expect(mounthFieldElm.type).toEqual('text')
      expect(mounthFieldElm.id).toEqual('expDate.mounth')

    })
    
    test('sould display error message if field is empty on submit', async () => {

      await user.click(submitElm)

      const errorMessages = await screen.queryAllByRole('alert') as HTMLElement[]
      
      await waitFor(() => {

        expect(errorMessages).toHaveLength(1)
        expect(errorMessages[0]).toHaveTextContent('mount is required')
        expect(onSubmitMock).not.toHaveBeenCalled()

      })
    })

    test('should display error message if value is not a valid month', async () => {

      const value = '1'

      await user.click(mounthFieldElm)
      await user.keyboard(value)
      await user.click(submitElm)

      const errorMessages = await screen.queryAllByRole('alert') as HTMLElement[]

      await waitFor(() => {
        
        expect(errorMessages).toHaveLength(1)
        expect(errorMessages[0]).toHaveTextContent('only 01-12 are allowed')
        expect(onSubmitMock).not.toHaveBeenCalled()

      })

    })

    test('should display error message if value is more than 12 months', async () => {

      const value = '13'

      await user.click(mounthFieldElm)
      await user.keyboard(value)
      await user.click(submitElm)

      const errorMessages = await screen.queryAllByRole('alert') as HTMLElement[]

      await waitFor(() => {
        
        expect(errorMessages).toHaveLength(1)
        expect(errorMessages[0]).toHaveTextContent('only 01-12 are allowed')
        expect(onSubmitMock).not.toHaveBeenCalled()

      })

    })

    test('dhould display error message if value is less than 01 month', async () => {

      const value = '00'

      await user.click(mounthFieldElm)
      await user.keyboard(value)
      await user.click(submitElm)

      const errorMessages = await screen.queryAllByRole('alert') as HTMLElement[]

      await waitFor(() => {
        
        expect(errorMessages).toHaveLength(1)
        expect(errorMessages[0]).toHaveTextContent('only 01-12 are allowed')
        expect(onSubmitMock).not.toHaveBeenCalled()

      })

    })

    test('should success validation if value is a valid month', async () => {

      const value = '05'

      await user.click(mounthFieldElm)
      await user.keyboard(value)
      await user.click(submitElm)

      const errorMessages = await screen.queryAllByRole('alert') as HTMLElement[]

      await waitFor(() => {
        
        expect(errorMessages).toHaveLength(0)
        expect(onSubmitMock).toHaveBeenCalled()

      })

    })

  })

  describe('Field Year', () => {

    const onSubmitMock = jest.fn()
    let yearFieldElm: HTMLInputElement

    const FormMock = () => {

      const {
        handleSubmit,
        register,
        formState: {
          errors
        }
      } = useForm<CardFormInterface>()

      return (
        <form onSubmit={handleSubmit(onSubmitMock)}>
          
          <FieldYear label="expDate.year" register={register} errors={errors}/>

          <input type="submit" value="submit" />

        </form>
      )
    }

    beforeEach(() => {

      render(
        <FormMock/>
      )

      yearFieldElm = screen.getByRole('textbox', {
        name: /expDate.year/i
      })

      submitElm = screen.getByRole('button', {
        name: /submit/i
      })

    })

    afterEach(() => {
      cleanup()
      jest.clearAllMocks()
    })

    test('should rendered in the document', () => {

      expect(yearFieldElm).toBeInTheDocument()
      expect(yearFieldElm.id).toEqual('expDate.year')
      expect(yearFieldElm.type).toEqual('text')

    })

    test('should display error if field not filled', async () => {

      await user.clear(yearFieldElm)
      await user.click(submitElm)

      const errorMessages = await screen.queryAllByRole( 'alert' ) as HTMLElement[]
      
      await waitFor(() => {

        expect(errorMessages).toHaveLength(1)
        expect(errorMessages[0]).toHaveTextContent('year is required')
        expect(onSubmitMock).not.toHaveBeenCalled()

      })

    })

    test('should display error messsage if value is grether than current year', async () => {

      const value = '1998'

      await user.clear(yearFieldElm)
      await user.click(yearFieldElm)
      await user.keyboard(value)
      await user.click(submitElm)

      const errorMessages = await screen.queryAllByRole( 'alert' ) as HTMLElement[]
      
      await waitFor(() => {

        expect(yearFieldElm.value).toEqual('1998')
        expect(errorMessages).toHaveLength(1)
        expect(errorMessages[0]).toHaveTextContent('must be more than or equal to current year')
        expect(onSubmitMock).not.toHaveBeenCalled()

      })

    })

    test('should display error if message value is less or equal to zero', async () => {

      const value = '0000'

      await user.clear(yearFieldElm)
      await user.click(yearFieldElm)
      await user.keyboard(value)
      await user.click(submitElm)

      const errorMessages = await screen.queryAllByRole( 'alert' ) as HTMLElement[]
      
      await waitFor(() => {

        expect(yearFieldElm.value).toEqual('0000')
        expect(errorMessages).toHaveLength(1)
        expect(errorMessages[0]).toHaveTextContent('must be more than or equal to current year')
        expect(onSubmitMock).not.toHaveBeenCalled()

      })

    })

    test('should display error message if length of value is more than four characters', async () => {

      const value = '20225'

      await user.clear(yearFieldElm)
      await user.click(yearFieldElm)
      await user.keyboard(value)
      await user.click(submitElm)

      const errorMessages = await screen.queryAllByRole( 'alert' ) as HTMLElement[]
      
      await waitFor(() => {

        expect(yearFieldElm.value).toEqual('20225')
        expect(errorMessages).toHaveLength(1)
        expect(errorMessages[0]).toHaveTextContent('must be a four digit year')
        expect(onSubmitMock).not.toHaveBeenCalled()

      })

    })

    test('should display error message if value is not a number', async () => {

      const value = '2O25'

      await user.clear(yearFieldElm)
      await user.click(yearFieldElm)
      await user.keyboard(value)
      await user.click(submitElm)

      const errorMessages = await screen.queryAllByRole( 'alert' ) as HTMLElement[]
      
      await waitFor(() => {

        expect(yearFieldElm.value).toEqual('2O25')
        expect(errorMessages).toHaveLength(1)
        expect(errorMessages[0]).toHaveTextContent('only number are allowed')
        expect(onSubmitMock).not.toHaveBeenCalled()

      })

    })

    test('should success validation if value is a valid year', async () => {

      const value = new Date().getFullYear().toString()

      await user.clear(yearFieldElm)
      await user.click(yearFieldElm)
      await user.keyboard(value)
      await user.click(submitElm)

      const errorMessages = await screen.queryAllByRole( 'alert' ) as HTMLElement[]
      
      await waitFor(() => {

        expect(yearFieldElm.value).toEqual(value)
        expect(errorMessages).toHaveLength(0)
        expect(onSubmitMock).toHaveBeenCalled()

      })

    })
  })

  describe('Field CVC', () => {

    const onSubmitMock = jest.fn()
    let cvcFieldElm: HTMLInputElement

    const FormMock = () => {

      const {
        handleSubmit,
        register,
        formState: {
          errors
        }
      } = useForm<CardFormInterface>()

      return (
        <form onSubmit={handleSubmit(onSubmitMock)}>
          
          <FieldCVC label="cvc" register={register} errors={errors}/>

          <input type="submit" value="submit" />

        </form>
      )
    }

  
    beforeEach(() => {

      render(
        <FormMock/>
      )

      cvcFieldElm = screen.getByRole('textbox', {
        name: /cvc/i
      })

      submitElm = screen.getByRole('button', {
        name: /submit/i
      })

    })

    afterEach(() => {
      cleanup()
      jest.clearAllMocks()
    })

    test('should rendered in the document', () => {

      expect(cvcFieldElm).toBeInTheDocument()
      expect(cvcFieldElm.id).toEqual('cvc')
      expect(cvcFieldElm.type).toEqual( 'text' )

    })

    test('should display error message if field is not filled', async () => {

      await user.clear(cvcFieldElm)
      await user.click(submitElm)

      const errorMessages = await screen.queryAllByRole('alert') as HTMLElement[]

      await waitFor(() => {

        expect(cvcFieldElm).toHaveValue('')
        expect(errorMessages).toHaveLength(1)
        expect(errorMessages[0]).toHaveTextContent('cvc is required')
        expect(onSubmitMock).not.toHaveBeenCalled()

      })

    })

    test('display error message if value contain non-digit characters', async () => {

      const value = 'A23'

      await user.clear(cvcFieldElm)
      await user.click(cvcFieldElm)
      await user.keyboard(value)
      await user.click(submitElm)

      const errorMessages = await screen.queryAllByRole('alert') as HTMLElement[]

      await waitFor(() => {

        expect(cvcFieldElm).toHaveValue('A23')
        expect(errorMessages).toHaveLength(1)
        expect(errorMessages[0]).toHaveTextContent('only accepted numeric')
        expect(onSubmitMock).not.toHaveBeenCalled()

      })

    })

    test('display error message if value is contain special characters', async () => {

      const value = '@23'

      await user.clear(cvcFieldElm)
      await user.click(cvcFieldElm)
      await user.keyboard(value)
      await user.click(submitElm)

      const errorMessages = await screen.queryAllByRole('alert') as HTMLElement[]

      await waitFor(() => {

        expect(cvcFieldElm).toHaveValue('@23')
        expect(errorMessages).toHaveLength(1)
        expect(errorMessages[0]).toHaveTextContent('only accepted numeric')
        expect(onSubmitMock).not.toHaveBeenCalled()

      })

    })

    test('display error message if length of value is less than three characters', async () => {

      const value = '23'

      await user.clear(cvcFieldElm)
      await user.click(cvcFieldElm)
      await user.keyboard(value)
      await user.click(submitElm)

      const errorMessages = await screen.queryAllByRole('alert') as HTMLElement[]

      await waitFor(() => {

        expect(cvcFieldElm).toHaveValue('23')
        expect(errorMessages).toHaveLength(1)
        expect(errorMessages[0]).toHaveTextContent('must be a three digits')
        expect(onSubmitMock).not.toHaveBeenCalled()

      })

    })

    test('display error message if length of value is more than tree characters', async () => {

      const value = '1223'

      await user.clear(cvcFieldElm)
      await user.click(cvcFieldElm)
      await user.keyboard(value)
      await user.click(submitElm)

      const errorMessages = await screen.queryAllByRole('alert') as HTMLElement[]

      await waitFor(() => {

        expect(cvcFieldElm).toHaveValue('1223')
        expect(errorMessages).toHaveLength(1)
        expect(errorMessages[0]).toHaveTextContent('must be a three digits')
        expect(onSubmitMock).not.toHaveBeenCalled()

      })

    })

    test('should success form', async () => {

      const value = '123'

      await user.clear(cvcFieldElm)
      await user.click(cvcFieldElm)
      await user.keyboard(value)
      await user.click(submitElm)

      const errorMessages = await screen.queryAllByRole('alert') as HTMLElement[]

      await waitFor(() => {

        expect(errorMessages).toHaveLength(0)
        expect(cvcFieldElm).toHaveValue('123')
        expect(onSubmitMock).toHaveBeenCalled()

      })

    })

  })

})