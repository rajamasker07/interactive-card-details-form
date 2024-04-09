import { render, screen } from "@testing-library/react"
import BackCard from "./back-card"

describe('Back Card', () => {

  test('should rendered component with props', () => {

    const comp = render(<BackCard cvc="123" />)

    const {container, getByRole} = comp

    const card = container.querySelector('#backCard')
    const image = getByRole('img', { name: /bg card back/i })
    const heading = getByRole('heading', { level: 4, name: /123/i })

    expect(card).toBeInTheDocument()
    expect(image).toBeInTheDocument()
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('123')

  })

})