import React from 'react'
import styled from 'styled-components'

const StyledCityItem = styled.div`
   display: flex;
   align-items: center;
   padding: 8px 15px;
   border-radius: 12px;
   font-size: 14px;
   background: ${(props) => (props.isSelect ? '#BE8152' : '#EEEEEE')};
   color: ${(props) => (props.isSelect ? 'red' : 'black')};
   cursor: pointer;
   &:hover {
      background: #be875c;
      color: #fff;
   }
`
const StyledTitle = styled.h3`
   margin-top: 1.5rem;
   font-weight: 700;
   font-size: 18px;
   margin: ${(props) => props.margin ?? '0'};
`

export const ExhibitionMenu = () => {
   const typeList = ['博物館', '文創園區', '藝文中心', '美術館', '其他展覽']
   return (
      <section className='mt-5'>
         <StyledTitle margin={'0 0 16px 0'}>展覽館</StyledTitle>
         <div className='flex flex-wrap gap-3'>
            {typeList.map((type) => (
               <StyledCityItem key={type}>{type}</StyledCityItem>
            ))}
         </div>
      </section>
   )
}
