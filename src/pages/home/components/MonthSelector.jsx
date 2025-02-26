import { memo } from 'react'
import styled from 'styled-components'
import { breakpoint } from '../../../styles/utils/breakpoint'

const MonthSelector = ({ month, setMonth, currentMonth }) => {
   return (
      <StyledMonthWrapper>
         <h3 className='pb-2'>{new Date().getFullYear()}年</h3>
         <StyledMonthBox>
            {month.map((data, index) => {
               return (
                  <div key={index}>
                     <StyledMonthText
                        onClick={() => setMonth(data.number)}
                        isActive={currentMonth === data.value}
                     >
                        {data.number}月<br />
                        {data.en}
                     </StyledMonthText>
                  </div>
               )
            })}
         </StyledMonthBox>
      </StyledMonthWrapper>
   )
}

export default memo(MonthSelector)

const StyledMonthWrapper = styled.section`
   display: flex;
   flex-direction: column;
   padding: 0 24px;

   @media (min-width: ${breakpoint.tablet}px) {
      padding: 0 40px;
   }
`

const StyledMonthBox = styled.div`
   display: flex;
   align-items: center;
   text-align: center;
   font-size: 12px;
   gap: 1px;
   overflow: scroll;
   scrollbar-width: none;

   @media (min-width: ${breakpoint.tablet}px) {
      font-size: 14px;
      justify-content: space-between;
   }
`
const StyledMonthText = styled.p`
   cursor: pointer;
   box-sizing: border-box;
   white-space: nowrap;
   width: 100%;
   padding: 10px;
   &:hover {
      background: #be875c;
      color: #fff;
   }
`
