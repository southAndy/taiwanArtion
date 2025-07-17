import { useState, useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'

const ExhibitionMenu = ({ setModlaShow, selectedExhibitionName, onExhibitionSelect }) => {
  const [searchText, setSearchText] = useState('')
  const [searchHistory, setSearchHistory] = useState([])
  const [filteredExhibitions, setFilteredExhibitions] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)
  const inputRef = useRef(null)
  const { openData } = useSelector(state => state.common)

  const saveSearchHistory = searchTerm => {
    const history = JSON.parse(localStorage.getItem('exhibitionSearchHistory') || '[]')
    const newHistory = [searchTerm, ...history.filter(item => item !== searchTerm)].slice(0, 10)
    localStorage.setItem('exhibitionSearchHistory', JSON.stringify(newHistory))
    setSearchHistory(newHistory)
  }

  const clearSearchHistory = () => {
    localStorage.removeItem('exhibitionSearchHistory')
    setSearchHistory([])
  }

  const handleExhibitionClick = exhibition => {
    saveSearchHistory(exhibition.title)
    onExhibitionSelect(exhibition.title)
    setModlaShow(false)
  }

  const handleKeyPress = e => {
    if (e.key === 'Escape') {
      setShowDropdown(false)
      inputRef.current?.blur()
    }
  }

  const filterExhibitions = searchTerm => {
    if (!searchTerm || searchTerm.length < 2) {
      return []
    }
    return openData.filter(exhibition =>
      exhibition.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  const handleInputChange = e => {
    const value = e.target.value
    setSearchText(value)

    const filtered = filterExhibitions(value)
    setFilteredExhibitions(filtered)
    setShowDropdown(value.length >= 2 && (filtered.length > 0 || searchHistory.length > 0))
  }

  const handleInputFocus = () => {
    if (searchText.length >= 2) {
      setShowDropdown(true)
    } else if (searchHistory.length > 0) {
      setShowDropdown(true)
    }
  }

  const handleHistoryClick = historyItem => {
    onExhibitionSelect(historyItem)
    setModlaShow(false)
  }

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('exhibitionSearchHistory') || '[]')
    setSearchHistory(history)
  }, [])

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <SearchContainer ref={dropdownRef}>
      <SearchTitle>搜尋展覽</SearchTitle>
      <SearchInputContainer>
        <SearchInput
          ref={inputRef}
          type="text"
          placeholder="請輸入展覽名稱..."
          value={searchText}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyPress}
          autoFocus
        />
        {searchHistory.length > 0 && (
          <ClearHistoryButton onClick={clearSearchHistory}>清除歷史</ClearHistoryButton>
        )}
      </SearchInputContainer>

      {showDropdown && (
        <DropdownContainer>
          {searchText.length < 2 && searchHistory.length > 0 && (
            <>
              <SectionTitle>搜尋歷史</SectionTitle>
              {searchHistory.map((historyItem, index) => (
                <HistoryItem key={index} onClick={() => handleHistoryClick(historyItem)}>
                  <HistoryIcon>🕐</HistoryIcon>
                  <HistoryText>{historyItem}</HistoryText>
                </HistoryItem>
              ))}
            </>
          )}

          {searchText.length >= 2 && filteredExhibitions.length > 0 && (
            <>
              {searchHistory.length > 0 && searchText.length < 2 && <Divider />}
              <SectionTitle>搜尋結果</SectionTitle>
              <ExhibitionList>
                {filteredExhibitions.map(exhibition => (
                  <ExhibitionItem
                    key={exhibition.UID}
                    onClick={() => handleExhibitionClick(exhibition)}
                  >
                    <ExhibitionImage src={exhibition.imageUrl} alt={exhibition.title} />
                    <ExhibitionInfo>
                      <ExhibitionTitle>{exhibition.title}</ExhibitionTitle>
                      <ExhibitionDate>
                        {exhibition.startDate} ~ {exhibition.endDate}
                      </ExhibitionDate>
                    </ExhibitionInfo>
                  </ExhibitionItem>
                ))}
              </ExhibitionList>
            </>
          )}

          {searchText.length >= 2 && filteredExhibitions.length === 0 && (
            <NoResultsMessage>找不到相關展覽</NoResultsMessage>
          )}
        </DropdownContainer>
      )}
    </SearchContainer>
  )
}

const SearchContainer = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 120px;
  height: 100%;
  position: relative;
`

const SearchTitle = styled.h3`
  font-size: 18px;
  font-weight: 500;
  margin: 0;
  color: #333;
`

const SearchInputContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  position: relative;
`

const SearchInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #be875c;
  }

  &::placeholder {
    color: #999;
  }
`

const ClearHistoryButton = styled.button`
  padding: 8px 16px;
  background-color: #f5f5f5;
  color: #666;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background-color: #ebebeb;
    color: #333;
  }
`

const DropdownContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-height: 70vh;
  z-index: 1000;
  margin-top: 4px;
`

const SectionTitle = styled.div`
  padding: 12px 16px 8px;
  font-size: 14px;
  font-weight: 500;
  color: #666;
  background: #fafafa;
  border-bottom: 1px solid #f0f0f0;
`

const HistoryItem = styled.div`
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f8f8f8;
  }
`

const HistoryIcon = styled.span`
  font-size: 16px;
  opacity: 0.6;
`

const HistoryText = styled.span`
  flex: 1;
  font-size: 14px;
  color: #333;
`

const ExhibitionList = styled.div`
  max-height: 60vh;
  overflow-y: auto;
`

const ExhibitionItem = styled.div`
  padding: 12px 16px;
  display: flex;
  gap: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-bottom: 1px solid #f5f5f5;

  &:hover {
    background-color: #f8f8f8;
  }

  &:last-child {
    border-bottom: none;
  }
`

const ExhibitionImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
  flex-shrink: 0;
`

const ExhibitionInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
`

const ExhibitionTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const ExhibitionDate = styled.div`
  font-size: 12px;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const NoResultsMessage = styled.div`
  padding: 24px 16px;
  text-align: center;
  color: #999;
  font-size: 14px;
`

const Divider = styled.div`
  height: 1px;
  background-color: #f0f0f0;
  margin: 8px 0;
`

export default ExhibitionMenu
