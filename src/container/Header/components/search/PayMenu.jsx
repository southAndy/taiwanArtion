import React from 'react'
import styled from '@emotion/styled'
const StyledTitle = styled.h3`
  margin-top: 1.5rem;
  font-weight: 700;
  font-size: 18px;
  margin: ${props => props.margin ?? '0'};
`
const StyledCityItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 15px;
  border-radius: 12px;
  font-size: 14px;
  background: ${props => (props.isSelect ? '#BE8152' : '#EEEEEE')};
  color: ${props => (props.isSelect ? 'red' : 'black')};
  cursor: pointer;
  &:hover {
    background: #be875c;
    color: #fff;
  }
`

export const PayMenu = () => {
  const payList = ['付費展', '免費展']
  return (
    <div className="mt-5">
      <StyledTitle margin={'0 0 16px 0'}>票價</StyledTitle>
      <div className="flex flex-wrap gap-3">
        {payList.map((item, index) => {
          return (
            <StyledCityItem key={index}>
              <label htmlFor={item}>{item}</label>
            </StyledCityItem>
          )
        })}
      </div>
    </div>
  )
}
