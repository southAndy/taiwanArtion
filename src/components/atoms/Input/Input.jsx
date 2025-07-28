import React, { forwardRef } from 'react'
import StyledInput from './Input.styles'

const Input = forwardRef(({ size, shape, formState, ...props }, ref) => {
  return <StyledInput size={size} shape={shape} formState={formState} {...props} ref={ref} />
})

Input.displayName = 'Input'

export default Input
