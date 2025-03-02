import Input from './Input'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Input component render', () => {
   it('should render input component', () => {
      render(
         <Input
            inputSize={'small'}
            placeholder={''}
            type={'text'}
            value={''}
            setValue={() => {}}
         />,
      )
      expect(screen.getByTestId('input')).toBeInTheDocument()
   })
})

describe('Input component props work', () => {
   it('should render input component with placeholder', () => {
      render(
         <Input
            inputSize={'small'}
            placeholder={'placeholder'}
            type={'text'}
            value={''}
            setValue={() => {}}
         />,
      )
      expect(screen.getByPlaceholderText('placeholder')).toBeInTheDocument()
   })
   it('should render input component with value', () => {
      render(
         <Input
            inputSize={'small'}
            placeholder={''}
            type={'text'}
            value={'value'}
            setValue={() => {}}
         />,
      )
      expect(screen.getByDisplayValue('value')).toBeInTheDocument()
   })
   it('should render input component with type', () => {
      render(
         <Input
            inputSize={'small'}
            placeholder={''}
            type={'text'}
            value={''}
            setValue={() => {}}
         />,
      )
      expect(screen.getByTestId('input')).toHaveAttribute('type', 'text')
   })
   it('should render input component with shape', () => {
      render(
         <Input
            inputSize={'small'}
            placeholder={''}
            type={'text'}
            value={''}
            setValue={() => {}}
            shape={'10px'}
         />,
      )
      expect(screen.getByTestId('input')).toHaveStyle('border-radius: 10px')
   })
   it('should render input component with disabled', () => {
      render(
         <Input
            inputSize={'small'}
            placeholder={''}
            type={'text'}
            value={''}
            setValue={() => {}}
            formState={'loading'}
         />,
      )
      expect(screen.getByTestId('input')).toHaveAttribute('disabled')
   })
   it('should render input component with inputSize', () => {
      render(
         <Input
            placeholder={''}
            type={'text'}
            value={''}
            setValue={() => {}}
            inputSize={'small'}
         />,
      )
      expect(screen.getByTestId('input')).toHaveStyle('font-size: 12px')
   })
})
