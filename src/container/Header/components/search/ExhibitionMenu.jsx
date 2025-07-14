import { useState } from 'react'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'

const ExhibitionMenu = ({ setModlaShow }) => {
  const [searchText, setSearchText] = useState('')
  const navigate = useNavigate()

  const handleSearch = () => {
    if (searchText.trim()) {
      setModlaShow(false)
      navigate(`/result?exhibition=${encodeURIComponent(searchText.trim())}`)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <SearchContainer>
      <SearchTitle>搜尋展覽</SearchTitle>
      <SearchInputContainer>
        <SearchInput
          type="text"
          placeholder="請輸入展覽名稱..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleKeyPress}
          autoFocus
        />
        <SearchButton onClick={handleSearch} disabled={!searchText.trim()}>
          搜尋
        </SearchButton>
      </SearchInputContainer>
    </SearchContainer>
  )
}

const SearchContainer = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 120px;
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

const SearchButton = styled.button`
  padding: 12px 24px;
  background-color: #be875c;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover:not(:disabled) {
    background-color: #a5723d;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`

export default ExhibitionMenu
