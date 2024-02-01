//本身設定
import './Header.scss'
import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

import Dropdown from '../../component/Dropdown'
import Input from '../../component/Input'

//images
import { searchIcon, dropdownIcon, fakeUserIcon, notifyIcon } from '../../assets/images/index'

import styled from '@emotion/styled'
const StyledHeader = styled.header`
   display: flex;
   justify-content: space-around;
   align-items: center;
   height: 80px;
   width: 100%;
   box-sizing: border-box;
   //為了IOS 14.5以下裝置所設計
   margin-right: 16px;
   padding: 20px 40px;
   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
   position: relative;
`

const ResultBox = styled.section`
   display: ${(props) => (props.userInput ? 'block' : 'none')};
   position: absolute;
   top: 81%;
   left: 20%;
   z-index: 2;
   width: 466px;
   max-height: 376px;
   overflow: scroll;
   border-radius: 20px;
   padding: 20px;
   background: #ffffff;
   box-shadow: 2px -1px 4px rgba(0, 0, 0, 0.1);
   border-radius: 10px;
`
const ResultImageBox = styled.div`
   display: block;
   width: 40px;
   height: 40px;
`
const StyledImage = styled.img`
   width: 100%;
   height: 100%;
`

const ResultDropdown = ({ userInput, exhibitionList }) => {
   return (
      <>
         <ResultBox userInput={userInput}>
            {exhibitionList?.map((matched, index) => {
               return (
                  <Link to={`/detail/${matched.UID}`} key={index} className='result-drop'>
                     <ResultImageBox>
                        <StyledImage src={matched.imageUrl} alt='' />
                     </ResultImageBox>
                     <div>
                        <p>{matched.title}</p>
                        <p>{'台南'}</p>
                     </div>
                  </Link>
               )
            })}
         </ResultBox>
      </>
   )
}

const Header = ({ setClick, exhibitionList }) => {
   let navigate = useNavigate()

   // 搜尋欄位狀態
   const [keyword, setKeyword] = useState('')
   const [city, setCurrentCity] = useState('')
   const [exhibitionType, setExhibitionType] = useState('')
   const [startDate, setStartDate] = useState('')
   const [endDate, setEndDate] = useState('')

   const museumTypeList = ['博物館', '文創園區', '美術館']
   const cityList = ['台北', '新北', '台中', '台南', '高雄']

   // 進行展覽搜尋
   let matchedExhibitionList = useMemo(() => {
      let matchedResult
      matchedResult = exhibitionList?.filter((exhibition, index) => {
         return exhibition.title.startsWith(keyword)
      })
      if (matchedResult.length === 0) {
         return []
      } else {
         return matchedResult
      }
   }, [keyword])

   return (
      <>
         <header className='header-container'>
            <Link to={'/'} className='logo'>
               <img src='/src/assets/images/logo-05 3.png' alt='網站logo' />
            </Link>
            <div className='filter filter-box'>
               <Input keyword={keyword} setKeyword={setKeyword} />
               <ResultDropdown userInput={keyword} exhibitionList={matchedExhibitionList} />
               <Dropdown title={city} menu={cityList} setOption={setCurrentCity} />
               <Dropdown
                  title={exhibitionType}
                  menu={museumTypeList}
                  setOption={setExhibitionType}
               />
               <Dropdown title={startDate} setOption={setStartDate} menu={['開始日期']} />
               <Dropdown title={endDate} setOption={setEndDate} menu={['結束日期']} />
               <div onClick={() => navigate(`/result/${keyword}`)} className='filter-item_button'>
                  <img src={searchIcon} alt='搜尋樣式' />
               </div>
            </div>
            <Link to={`/detail`}>所有展覽</Link>
            <Link to={`/nearby`}>附近展覽</Link>
            <div className='login' onClick={() => setClick((val) => (val = !val))}>
               註冊 / 登入
            </div>
         </header>
      </>
   )
}

export default Header
