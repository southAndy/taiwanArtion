import React from 'react'
import cityList from '@assets/data/city.json'
import styled from '@emotion/styled'
import { locateIcon } from '@assets/images/index'
import { useNavigate } from 'react-router-dom'
import BaseImageBox from '../../../../styles/base/BaseImageBox'
import { breakpoint } from '../../../../styles/utils/breakpoint'

export const CityMenu = ({ setModlaShow }) => {
  const areaList = ['北部', '中部', '南部', '東部', '離島']
  const navigate = useNavigate()

  function selectCity(cityEn) {
    setModlaShow(n => false)
    navigate(`/result?keyword=${cityEn}`)
  }

  return (
    <>
      {/* todo 新增定位功能偵測使用者縣市功能 */}
      {/* <StyledLocateBox>
               <BaseImageBox width={'40px'} height={'40px'}>
                  <img src={locateIcon} alt='' />
               </BaseImageBox>
               <p className='text-sm font-medium'>目前所在位置</p>
            </StyledLocateBox> */}
      <StyledSection>
        <div className="flex flex-col gap-3 mt-5 overflow-scroll">
          <h3 className="font-medium">{areaList[0]}</h3>
          <StyledCityBox>
            {cityList.north.map(city => (
              <StyledCityItem onClick={() => selectCity(city.en)} key={city.chinese}>
                {city.chinese}
              </StyledCityItem>
            ))}
          </StyledCityBox>
        </div>
        <div>
          <h3 className="font-medium">{areaList[1]}</h3>
          <StyledCityBox>
            {cityList.central.map(city => (
              <StyledCityItem onClick={() => selectCity(city.en)} key={city.chinese}>
                {city.chinese}
              </StyledCityItem>
            ))}
          </StyledCityBox>
        </div>
        <div>
          <h3 className="font-medium">{areaList[2]}</h3>
          <StyledCityBox>
            {cityList.south.map(city => (
              <StyledCityItem onClick={() => selectCity(city.en)} key={city.chinese}>
                {city.chinese}
              </StyledCityItem>
            ))}
          </StyledCityBox>
        </div>
        <div>
          <h3 className="font-medium">{areaList[3]}</h3>
          <StyledCityBox>
            {cityList.east.map(city => (
              <StyledCityItem onClick={() => selectCity(city.en)} key={city.chinese}>
                {city.chinese}
              </StyledCityItem>
            ))}
          </StyledCityBox>
        </div>
        <div>
          <h3 className="font-medium">{areaList[4]}</h3>
          <StyledCityBox>
            {cityList.islands.map(city => (
              <StyledCityItem onClick={() => selectCity(city.en)} key={city.chinese}>
                {city.chinese}
              </StyledCityItem>
            ))}
          </StyledCityBox>
        </div>
      </StyledSection>
    </>
  )
}
const StyledSection = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  padding: 20px;
  max-width: 800px;
  width: 100%;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* 每行兩個 div */
    max-width: 1000px;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr); /* 桌面版三列 */
    max-width: 1200px;
  }
`

const StyledCityBox = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 8px;
  margin-top: 12px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
    gap: 10px;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 12px;
  }
`

const StyledCityItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 12px;
  border-radius: 8px;
  text-align: center;
  font-size: 13px;
  font-weight: 500;
  background: ${props => (props.isSelect ? '#BE8152' : '#F5F5F5')};
  color: ${props => (props.isSelect ? 'white' : '#333')};
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  min-height: 36px;

  &:hover {
    background: #be875c;
    color: #fff;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  @media (min-width: 768px) {
    padding: 12px 16px;
    font-size: 14px;
    min-height: 40px;
    border-radius: 10px;
  }

  @media (min-width: 1024px) {
    padding: 14px 18px;
    font-size: 15px;
    min-height: 44px;
    border-radius: 12px;
  }
`
