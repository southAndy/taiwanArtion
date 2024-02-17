import React from 'react'
import cityList from '../../assets/data/city.json'
import styled from 'styled-components'
import { locateIcon } from '../../assets/images/index'
import { Link } from 'react-router-dom'

const StyledCityBox = styled.div`
   display: flex;
   flex-wrap: wrap;
   gap: 10px;
`

const StyledCityItem = styled(Link)`
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

export const CityMenu = () => {
   const areaList = ['北部', '中部', '南部', '東部', '離島']

   return (
      <>
         <div>
            <div className='flex items-center gap-2 mt-6 cursor-pointer'>
               <div className='w-[40px] h-[40px]'>
                  <img src={locateIcon} alt='' />
               </div>
               <p className='text-sm font-medium'>目前所在位置</p>
            </div>
            <div className='flex flex-col gap-3 mt-5 overflow-scroll'>
               <h3 className='font-medium'>{areaList[0]}</h3>
               <StyledCityBox>
                  {cityList.north.map((city) => (
                     <StyledCityItem to={`/result/${city}`} key={city.name}>
                        {city.name}
                     </StyledCityItem>
                  ))}
               </StyledCityBox>
               <h3 className='font-medium'>{areaList[1]}</h3>
               <StyledCityBox>
                  {cityList.central.map((city) => (
                     <StyledCityItem to={`/result/${city}`} key={city.name}>
                        {city.name}
                     </StyledCityItem>
                  ))}
               </StyledCityBox>
               <h3 className='font-medium'>{areaList[2]}</h3>
               <StyledCityBox>
                  {cityList.south.map((city) => (
                     <StyledCityItem to={`/result/${city}`} key={city.name}>
                        {city.name}
                     </StyledCityItem>
                  ))}
               </StyledCityBox>
               <h3 className='font-medium'>{areaList[3]}</h3>
               <StyledCityBox>
                  {cityList.east.map((city) => (
                     <StyledCityItem to={`/result/${city}`} key={city.name}>
                        {city.name}
                     </StyledCityItem>
                  ))}
               </StyledCityBox>
               <h3 className='font-medium'>{areaList[4]}</h3>
               <StyledCityBox>
                  {cityList.islands.map((city) => (
                     <StyledCityItem to={`/result/${city}`} key={city.name}>
                        {city.name}
                     </StyledCityItem>
                  ))}
               </StyledCityBox>
            </div>
         </div>
      </>
   )
}
