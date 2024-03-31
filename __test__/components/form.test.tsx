import Form from "@/app/components/form"
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react"
import '@testing-library/jest-dom'
import { CardFormInterface } from "@/app/utils/interfaces"
import userEvent, { UserEvent } from "@testing-library/user-event"

describe('Form', () => { 

  let name: HTMLElement
  let cardNumber: HTMLElement
  let mounth: HTMLElement
  let year: HTMLElement
  let cvc: HTMLElement
  let submit: HTMLElement
  let user: UserEvent

  const mockOnChange = jest.fn((data: CardFormInterface) => {
    return Promise.resolve(data)
  })

  beforeEach(() => {

    user = userEvent.setup()

    render(<Form dataOnChange={mockOnChange} />)

    name = screen.getByRole('textbox', { name: /name/i })
    cardNumber = screen.getByRole('textbox', { name: /cardNumber/i })
    mounth = screen.getByRole('textbox', { name: /expDate.mounth/i })
    year = screen.getByRole('textbox', { name: /expDate.year/i })
    cvc = screen.getByRole('textbox', { name: /cvc/i })
    submit = screen.getByRole('button', { name: /submit/i })

  })

  test('should rendered form', () => {

    const form = screen.getByRole('form') as HTMLFormElement

    expect(form).toBeInTheDocument()
    expect(form.id).toEqual('form')

  })

  test('should display error message if value is empty', async () => {

    await user.click(submit)

    const errorMessages = await screen.queryAllByRole('alert') as HTMLElement[]

    await waitFor(() => {

      const currentYear = new Date().getFullYear().toString()

      expect(errorMessages).toHaveLength(4)
      expect(name).toHaveValue('')
      expect(cardNumber).toHaveValue('')
      expect(mounth).toHaveValue('')
      expect(year).toHaveValue(currentYear)
      expect(cvc).toHaveValue('')
      expect(mockOnChange).not.toHaveBeenCalled()

    })
    
  })

  test('should display error messages if value is invalid', async () => {

    await user.click(name)
    await user.keyboard('john123')

    await user.click(cardNumber)
    await user.keyboard('12341234')

    await user.click(mounth)
    await user.keyboard('00')

    await user.clear(year)
    await user.click(year)
    await user.keyboard('2010')

    await user.click(cvc)
    await user.keyboard('A12')

    await user.click(submit)

    const errorMessages = await screen.queryAllByRole('alert') as HTMLElement[]

    await waitFor(() => {

      expect(errorMessages).toHaveLength(5)
      expect(cardNumber).toHaveValue('1234 1234')
      expect(mockOnChange).not.toHaveBeenCalled()

    })

  })

  test('should form success', async () => {

    const currentYear = new Date().getFullYear().toString()

    await user.click(name)
    await user.keyboard('john dhoe')

    await user.click(cardNumber)
    await user.keyboard('1234123412341234')

    await user.click(mounth)
    await user.keyboard('03')

    await user.clear(year)
    await user.click(year)
    await user.keyboard(currentYear)

    await user.click(cvc)
    await user.keyboard('333')

    await user.click(submit)

    const errorMessages = await screen.queryAllByRole('alert') as HTMLElement[]

    await waitFor(() => {

      expect(errorMessages).toHaveLength(0)
      expect(cardNumber).toHaveValue('1234 1234 1234 1234')
      expect(mockOnChange).toHaveBeenCalledWith({
        name: 'john dhoe',
        cardNumber: '1234 1234 1234 1234',
        expDate: {
          mounth: '03',
          year: currentYear,
        },
        cvc: '333'
      })

    })

  })

  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

})