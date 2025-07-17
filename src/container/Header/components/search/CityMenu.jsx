import React, { useState, useEffect } from 'react'
import cityList from '@assets/data/city.json'
import styled from '@emotion/styled'
import { locateIcon } from '@assets/images/index'
import { useNavigate } from 'react-router-dom'
import BaseImageBox from '../../../../styles/base/BaseImageBox'
import { breakpoint } from '../../../../styles/utils/breakpoint'

export const CityMenu = ({ setModlaShow, onCitySelect }) => {
  const areaList = [
    { key: 'north', name: '北部' },
    { key: 'central', name: '中部' },
    { key: 'south', name: '南部' },
    { key: 'east', name: '東部' },
    { key: 'islands', name: '離島' }
  ]
  const navigate = useNavigate()
  const [selectedCities, setSelectedCities] = useState([])
  const [currentLocation, setCurrentLocation] = useState(null)

  // 回傳選中的城市給父元件
  useEffect(() => {
    if (onCitySelect) {
      onCitySelect(selectedCities)
    }
  }, [selectedCities, onCitySelect])

  // 選擇單一城市
  function selectCity(city, areaKey) {
    const cityWithArea = { ...city, area: areaKey }
    const isSelected = selectedCities.find(c => c.id === city.id)
    
    if (isSelected) {
      setSelectedCities(prev => prev.filter(c => c.id !== city.id))
    } else {
      setSelectedCities(prev => [...prev, cityWithArea])
    }
  }

  // 全選某地區
  function selectAllInArea(areaKey) {
    const areaCities = cityList[areaKey].map(city => ({ ...city, area: areaKey }))
    setSelectedCities(areaCities)
  }

  // 清除所有選擇
  function clearSelection() {
    setSelectedCities([])
    setCurrentLocation(null)
  }

  // 定位功能
  function getCurrentLocation() {
    if (!navigator.geolocation) {
      alert('您的瀏覽器不支援定位功能')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // 這裡應該要有座標轉城市的邏輯，暫時先設定為台北
        const location = { latitude: position.coords.latitude, longitude: position.coords.longitude }
        setCurrentLocation(location)
        // 假設定位到台北
        const taipei = cityList.north.find(city => city.chinese === '台北市')
        if (taipei) {
          selectCity(taipei, 'north')
        }
      },
      (error) => {
        alert('定位失敗，請手動選擇城市')
        console.error('定位錯誤:', error)
      }
    )
  }

  // 檢查城市是否被選中
  function isCitySelected(cityId) {
    return selectedCities.some(c => c.id === cityId)
  }

  return (
    <>
      {/* 定位和清除選擇區域 */}
      <StyledTopSection>
        <StyledLocateBox onClick={getCurrentLocation}>
          <BaseImageBox width={'40px'} height={'40px'}>
            <img src={locateIcon} alt='定位圖示' />
          </BaseImageBox>
          <p>目前所在位置</p>
        </StyledLocateBox>
        <StyledClearButton onClick={clearSelection}>
          清除選擇
        </StyledClearButton>
      </StyledTopSection>

      {/* 城市選擇區域 */}
      <StyledSection>
        {areaList.map((area) => (
          <StyledAreaContainer key={area.key}>
            <StyledAreaHeader>
              <h3>{area.name}</h3>
              <StyledSelectAllButton onClick={() => selectAllInArea(area.key)}>
                全選
              </StyledSelectAllButton>
            </StyledAreaHeader>
            <StyledCityBox>
              {cityList[area.key].map(city => (
                <StyledCityItem 
                  key={city.id}
                  isSelected={isCitySelected(city.id)}
                  onClick={() => selectCity(city, area.key)}
                >
                  {city.chinese}
                </StyledCityItem>
              ))}
            </StyledCityBox>
          </StyledAreaContainer>
        ))}
      </StyledSection>
    </>
  )
}
const StyledTopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;
`

const StyledLocateBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.8;
  }
  
  p {
    font-size: 14px;
    font-weight: 500;
    color: #333;
  }
`

const StyledClearButton = styled.button`
  background: none;
  border: 1px solid #ddd;
  color: #666;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f5f5f5;
    color: #333;
  }
`

const StyledSection = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  padding: 20px;
  max-width: 800px;
  width: 100%;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    max-width: 1000px;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    max-width: 1200px;
  }
`

const StyledAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const StyledAreaHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  h3 {
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin: 0;
  }
`

const StyledSelectAllButton = styled.button`
  background: none;
  border: 1px solid #BE8152;
  color: #BE8152;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #BE8152;
    color: white;
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
  background: ${props => (props.isSelected ? '#BE8152' : '#F5F5F5')};
  color: ${props => (props.isSelected ? 'white' : '#333')};
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
