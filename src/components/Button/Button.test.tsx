import React from 'react'
import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Button from './Button'

describe('Button component render', () => {
   test('renders Button component', () => {
      render(<Button />)
      expect(screen.getByRole('button')).toBeInTheDocument()
   })
})

describe('Button component props work', () => {
   test('children props work', () => {
      const { getByText } = render(<Button>Click me</Button>)
      expect(getByText('Click me')).toBeInTheDocument()
   })
   test('background props working', () => {
      const { getByText } = render(<Button background={'red'}>Click me</Button>)
      const button = getByText('Click me')
      expect(button).toHaveStyle('background-color: red')
   })
   //disabled props test
   test('disabled props working', () => {
      const { getByText } = render(<Button disabled>Click me</Button>)
      const button = getByText('Click me')
      expect(button).toBeDisabled()
   }),
      // text color props test
      test('text color props working', () => {
         const { getByText } = render(<Button textColor={'blue'}>Click me</Button>)
         const button = getByText('Click me')
         expect(button).toHaveStyle('color: blue')
      })

   test('margin props working', () => {
      const { getByText } = render(<Button margin={'10px'}>Click me</Button>)
      const button = getByText('Click me')
      expect(button).toHaveStyle('margin: 10px')
   })

   test('button type props working', () => {
      const { getByText } = render(<Button buttonType={'submit'}>Click me</Button>)
      const button = getByText('Click me')
      expect(button).toHaveAttribute('type', 'submit')
   })
})

describe('Button component behavior', () => {
   test('onClick action work', () => {
      const mockAction = jest.fn()
      render(<Button actions={mockAction}>Click me</Button>)
      const button = screen.getByText('Click me')
      button.click()
      expect(mockAction).toHaveBeenCalledTimes(1)
   })
   test('disabled onClick action', () => {
      const mockAction = jest.fn()
      render(
         <Button disabled actions={mockAction}>
            Click me
         </Button>,
      )
      const button = screen.getByText('Click me')
      button.click()
      expect(mockAction).toHaveBeenCalledTimes(0)
   })
   test('buttonType submit', () => {
      render(<Button buttonType={'submit'}>Click me</Button>)
      const button = screen.getByText('Click me')
      expect(button).toHaveAttribute('type', 'submit')
   })
   // todo: when state changed, props changed, etc.
})
