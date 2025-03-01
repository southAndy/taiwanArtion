import styled from 'styled-components'
import React, { InputHTMLAttributes } from 'react'

interface InputProps {
   width?: string
   placeholder: string
   value: string
   inputSize: string
   shape?: string
   setValue: (value: string) => void
   isError?: boolean
   types: string
   formState?: 'error' | 'success' | 'default' | 'loading' | 'disabled'
}

const Input: React.FC<InputProps> = ({
   width,
   placeholder,
   value,
   inputSize,
   shape,
   setValue,
   isError,
   types,
   formState,
}) => {
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value)
   }
   return (
      <StyledInput
         onChange={handleChange}
         width={width}
         inputSize={inputSize}
         shape={shape}
         type={types}
         isError={isError}
         placeholder={placeholder}
         formState={formState}
         value={value}
         disabled={formState === 'loading' || formState === 'disabled'}
      />
   )
}

interface StyledInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
   shape?: string
   inputSize: string
   formState?: 'error' | 'success' | 'default' | 'loading' | 'disabled'
   placeholder: string
   type: string
   width?: string
   isError?: boolean
   value: string
   disabled: boolean
}

const StyledInput = styled.input.attrs((props: StyledInputProps) => ({
   placeholder: props.placeholder,
   type: props.type,
}))<StyledInputProps>`
   width: 100%;
   border-radius: ${(props) => props.shape ?? '16px'};
   border: ${(props) => (props.formState === 'error' ? '1px solid #D31C1C' : '1px solid #e0e0e0')};
   padding: ${(props) => props.inputSize ?? '16px'};
   font-size: 16px;

   &:focus-visible {
      border: none;
   }
   &:focus {
      outline: none;
      border: 1px solid #be875c;
   }
   &:disabled {
      background-color: #f5f5f5;
      cursor: not-allowed;
   }
   &:hover {
      border: ${(props) => (props.disabled ? '1px solid #e0e0e0' : '#be875c')};
   }
`

export default Input
