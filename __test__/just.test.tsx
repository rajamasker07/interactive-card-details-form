import '@testing-library/jest-dom'
import {render} from '@testing-library/react'
import Home from "@/app/page"

describe('jest test', () => { 
  test('should 2 + 2 is equals 4', () => {
    expect(2 + 2).toEqual(4);
  })
})

describe('Home', () => { 
  test('should rendered home page', () => {
    const page = render(<Home />);
    expect(page).toMatchSnapshot();
  })
 })