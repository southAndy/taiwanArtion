import styled from '@emotion/styled'

const StyledButton = styled('button', {
  shouldForwardProp: (prop) => !['margin'].includes(prop)
})`
   color: ${(props) => (props.disabled ? '#3333' : ' #eeeeee')};
   background-color: ${(props) => (props.disabled ? '#EEEEEE' : ' #be875c')};
   border-radius: 12px;
   width: 100%;
   border: ${(props) => (props.border ? props.border : 'none')};
   padding: 8px 24px;
   margin: ${(props) => props.margin ?? '0'};
   &:disabled {
      background-color: #eeeeee;
      color: #3333;
   }
`

export default StyledButton
