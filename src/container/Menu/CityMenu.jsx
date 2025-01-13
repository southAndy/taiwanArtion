import React from 'react'
import cityList from '../../assets/data/city.json'
import styled from 'styled-components'
import { locateIcon } from '../../assets/images/index'
import { useNavigate } from 'react-router-dom'
import BaseImageBox from '../../styles/base/BaseImageBox'
import { breakpoint } from '../../styles/utils/breakpoint'

export const CityMenu = ({ setModlaShow }) => {
   const areaList = ['北部', '中部', '南部', '東部', '離島']
   const navigate = useNavigate()

   function selectCity(cityEn) {
      setModlaShow((n) => false)
      navigate(`/result?keyword=${cityEn}`)
   }

   return (
      <>
         <div>
            {/* todo 新增定位功能偵測使用者縣市功能 */}
            {/* <StyledLocateBox>
               <BaseImageBox width={'40px'} height={'40px'}>
                  <img src={locateIcon} alt='' />
               </BaseImageBox>
               <p className='text-sm font-medium'>目前所在位置</p>
            </StyledLocateBox> */}
            <StyledSection>
               <div className='flex flex-col gap-3 mt-5 overflow-scroll'>
                  <h3 className='font-medium'>{areaList[0]}</h3>
                  <StyledCityBox>
                     {cityList.north.map((city) => (
                        <StyledCityItem onClick={() => selectCity(city.en)} key={city.chinese}>
                           {city.chinese}
                        </StyledCityItem>
                     ))}
                  </StyledCityBox>
               </div>
               <div>
                  <h3 className='font-medium'>{areaList[1]}</h3>
                  <StyledCityBox>
                     {cityList.central.map((city) => (
                        <StyledCityItem onClick={() => selectCity(city.en)} key={city.chinese}>
                           {city.chinese}
                        </StyledCityItem>
                     ))}
                  </StyledCityBox>
               </div>
               <div>
                  <h3 className='font-medium'>{areaList[2]}</h3>
                  <StyledCityBox>
                     {cityList.south.map((city) => (
                        <StyledCityItem onClick={() => selectCity(city.en)} key={city.chinese}>
                           {city.chinese}
                        </StyledCityItem>
                     ))}
                  </StyledCityBox>
               </div>
               <div>
                  <h3 className='font-medium'>{areaList[3]}</h3>
                  <StyledCityBox>
                     {cityList.east.map((city) => (
                        <StyledCityItem onClick={() => selectCity(city.en)} key={city.chinese}>
                           {city.chinese}
                        </StyledCityItem>
                     ))}
                  </StyledCityBox>
               </div>
               <div>
                  <h3 className='font-medium'>{areaList[4]}</h3>
                  <StyledCityBox>
                     {cityList.islands.map((city) => (
                        <StyledCityItem onClick={() => selectCity(city.en)} key={city.chinese}>
                           {city.chinese}
                        </StyledCityItem>
                     ))}
                  </StyledCityBox>
               </div>
            </StyledSection>
         </div>
      </>
   )
}
const StyledSection = styled.section`
   display: grid;
   grid-template-columns: 1fr;
   gap: 20px;

   @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr); /* 每行兩個 div */
   }
`

const StyledCityBox = styled.div`
   display: grid;
   grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
   gap: 10px;
`
const StyledLocateBox = styled.div`
   display: flex;
   align-items: center;
   gap: 8px;
   margin-top: 24px;
   cursor: pointer;
`

const StyledCityItem = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   padding: 8px 15px;
   border-radius: 12px;

   text-align: center;
   font-size: 14px;
   background: ${(props) => (props.isSelect ? '#BE8152' : '#EEEEEE')};
   color: ${(props) => (props.isSelect ? 'red' : 'black')};
   cursor: pointer;
   &:hover {
      background: #be875c;
      color: #fff;
   }
`
