import React from 'react'
import cityList from '../../assets/data/city.json'
import styled from 'styled-components'
import { locateIcon } from '../../assets/images/index'
import { Link } from 'react-router-dom'
import BaseImageBox from '../../styles/base/BaseImageBox'

export const CityMenu = () => {
   const areaList = ['北部', '中部', '南部', '東部', '離島']

   return (
      <>
         <div>
            <StyledLocateBox>
               <BaseImageBox width={'40px'} height={'40px'}>
                  <img src={locateIcon} alt='' />
               </BaseImageBox>
               <p className='text-sm font-medium'>目前所在位置</p>
            </StyledLocateBox>
            <div className='flex flex-col gap-3 mt-5 overflow-scroll'>
               <h3 className='font-medium'>{areaList[0]}</h3>
               <StyledCityBox>
                  {cityList.north.map((city) => (
                     <StyledCityItem to={`/result?keyword=${city.en}`} key={city.chinese}>
                        {city.chinese}
                     </StyledCityItem>
                  ))}
               </StyledCityBox>
               <h3 className='font-medium'>{areaList[1]}</h3>
               <StyledCityBox>
                  {cityList.central.map((city) => (
                     <StyledCityItem to={`/result?keyword=${city.en}`} key={city.chinese}>
                        {city.chinese}
                     </StyledCityItem>
                  ))}
               </StyledCityBox>
               <h3 className='font-medium'>{areaList[2]}</h3>
               <StyledCityBox>
                  {cityList.south.map((city) => (
                     <StyledCityItem to={`/result?keyword=${city.en}`} key={city.chinese}>
                        {city.chinese}
                     </StyledCityItem>
                  ))}
               </StyledCityBox>
               <h3 className='font-medium'>{areaList[3]}</h3>
               <StyledCityBox>
                  {cityList.east.map((city) => (
                     <StyledCityItem to={`/result?keyword=${city.en}`} key={city.chinese}>
                        {city.chinese}
                     </StyledCityItem>
                  ))}
               </StyledCityBox>
               <h3 className='font-medium'>{areaList[4]}</h3>
               <StyledCityBox>
                  {cityList.islands.map((city) => (
                     <StyledCityItem to={`/result?keyword=${city.en}`} key={city.chinese}>
                        {city.chinese}
                     </StyledCityItem>
                  ))}
               </StyledCityBox>
            </div>
         </div>
      </>
   )
}

const StyledCityBox = styled.div`
   display: flex;
   flex-wrap: wrap;
   gap: 10px;
`
const StyledLocateBox = styled.div`
   display: flex;
   align-items: center;
   gap: 8px;
   margin-top: 24px;
   cursor: pointer;
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
