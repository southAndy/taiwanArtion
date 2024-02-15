import React from 'react'
import styled from 'styled-components'
const StyledTitle = styled.h3`
   margin-top: 1.5rem;
   font-weight: 700;
   font-size: 24px;
   margin: ${(props) => props.margin ?? '0'};
`

export const DateMenu = () => {
   return (
      <div>
         <StyledTitle margin={'0 0 16px 0'}>日期</StyledTitle>
         <div>
            <input type='date' />
            <input type='date' />
         </div>
      </div>
   )
}
