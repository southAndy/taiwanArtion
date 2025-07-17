import React from 'react'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { searchIcon } from '@assets/images'

const SearchBar = ({ onSearch, selectedCities = [], selectedStartDate = null, selectedEndDate = null, selectedExhibitionName = '' }) => {
  const navigate = useNavigate()
  const getCityDisplayText = () => {
    if (selectedCities.length === 0) {
      return '選擇縣市'
    }
    if (selectedCities.length === 1) {
      return selectedCities[0].chinese
    }
    return `${selectedCities[0].chinese} 等 ${selectedCities.length} 個城市`
  }

  const getStartDateDisplayText = () => {
    if (!selectedStartDate) {
      return '開始日期'
    }
    const date = new Date(selectedStartDate)
    return `${date.getMonth() + 1}/${date.getDate()}`
  }

  const getEndDateDisplayText = () => {
    if (!selectedEndDate) {
      return '結束日期'
    }
    const date = new Date(selectedEndDate)
    return `${date.getMonth() + 1}/${date.getDate()}`
  }

  const handleSearch = () => {
    // 構建搜尋參數
    const searchParams = new URLSearchParams()
    
    if (selectedExhibitionName) {
      searchParams.set('exhibition', selectedExhibitionName)
    }
    
    if (selectedCities.length > 0) {
      searchParams.set('keyword', selectedCities.map(city => city.chinese).join(','))
    }
    
    if (selectedStartDate) {
      searchParams.set('startDate', selectedStartDate)
    }
    
    if (selectedEndDate) {
      searchParams.set('endDate', selectedEndDate)
    }
    
    // 導航到結果頁面
    navigate(`/result?${searchParams.toString()}`)
  }

  return (
    <StyledSearchBar>
      <SearchContent>
        <SearchText onClick={() => onSearch('exhibition')} hasValue={selectedExhibitionName}>
          {selectedExhibitionName || '輸入展覽名稱'}
        </SearchText>
        <SearchText onClick={() => onSearch('city')} hasValue={selectedCities.length > 0}>
          {getCityDisplayText()}
        </SearchText>
        <SearchText onClick={() => onSearch('date')} hasValue={selectedStartDate}>
          {getStartDateDisplayText()}
        </SearchText>
        <SearchText onClick={() => onSearch('end-date')} hasValue={selectedEndDate}>
          {getEndDateDisplayText()}
        </SearchText>
      </SearchContent>
      <SearchIconWrapper onClick={handleSearch}>
        <img src={searchIcon} alt="search" />
      </SearchIconWrapper>
    </StyledSearchBar>
  )
}

const StyledSearchBar = styled.div`
  display: none; // 手機版預設隱藏

  @media (min-width: 992px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-grow: 1;
    width: auto;
    max-width: 630px; //參考設計稿
    width: auto;
    margin: 0 24px;
    border: 1px solid #e0e0e0;
    border-radius: 40px;
    height: 48px;
    padding: 0 8px 0 24px;
    cursor: pointer;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.05);
    transition: box-shadow 0.2s ease;

    &:hover {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }
  }
`

const SearchContent = styled.div`
  display: none;

  // 992px below hidde
  @media (min-width: 992px) {
    display: flex;
    align-items: stretch;
    flex-grow: 1;
  }
`

const SearchText = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${props => props.hasValue ? '#333' : '#5f5f5f'};
  font-weight: ${props => props.hasValue ? '500' : '400'};
  font-size: 14px;
  width: 124px;
  white-space: nowrap;
  border-right: 1px solid #e0e0e0;
  flex-grow: 1;
  flex-basis: 0;
  min-width: 0; // 允許元件在空間不足時縮小

  &:last-of-type {
    border-right: none;
  }
  &:hover {
    cursor: pointer;
    background-color: #be875c;
    color: white;
  }
`

const SearchIconWrapper = styled.div`
  background-color: #be875c;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #a67c52;
  }

  img {
    width: 16px;
    height: 16px;
    filter: brightness(0) invert(1); // 讓 icon 變白色
  }
`

export default SearchBar
