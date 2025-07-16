import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { CityMenu } from './CityMenu'
import DateMenu from './DateMenu'
import ExhibitionMenu from './ExhibitionMenu'
import { breakpoint } from '@styles/utils/breakpoint'

const TABS = [
  { id: 'exhibition', name: '展覽名稱', component: ExhibitionMenu },
  { id: 'city', name: '縣市', component: CityMenu },
  { id: 'date', name: '日期', component: DateMenu },
  // { id: 'price', name: '票價', component: PayMenu }, // 預留票價篩選，未來取消註解即可啟用
]

export default function HeaderSearchMenu({ setModlaShow, activeTabId, selectedCities, onCitySelect, selectedStartDate, selectedEndDate, onDateSelect }) {
  const ActiveComponent = TABS.find(tab => tab.id === activeTabId)?.component

  return (
    <MenuContainer>
      {/* 手機版專用搜尋框 */}
      {/* <StyledMobileSearch>
        <Input placeholder={'輸入展覽名稱'} width={'auto'} />
      </StyledMobileSearch> */}

      {/* 頁籤內容 */}
      {ActiveComponent && (
        <ActiveComponent 
          setModlaShow={setModlaShow}
          selectedCities={activeTabId === 'city' ? selectedCities : undefined}
          onCitySelect={activeTabId === 'city' ? onCitySelect : undefined}
          selectedStartDate={activeTabId === 'date' ? selectedStartDate : undefined}
          selectedEndDate={activeTabId === 'date' ? selectedEndDate : undefined}
          onDateSelect={activeTabId === 'date' ? onDateSelect : undefined}
        />
      )}
    </MenuContainer>
  )
}

const MenuContainer = styled.div`
  width: 100%;
`
