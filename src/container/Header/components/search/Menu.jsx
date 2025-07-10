import { useState } from 'react'
import styled from 'styled-components'
import Input from '../../../../components/Input/Input'
import { CityMenu } from './CityMenu'
// import { ExhibitionMenu } from './ExhibitionMenu'
import { PayMenu } from './PayMenu'
import DateMenu from './DateMenu'
import { breakpoint } from '../../../../styles/utils/breakpoint'

const TABS = [
  { id: 'city', name: '縣市', component: CityMenu },
  { id: 'date', name: '日期', component: DateMenu },
  // { id: 'price', name: '票價', component: PayMenu }, // 預留票價篩選，未來取消註解即可啟用
]

export default function HeaderSearchMenu({ setModlaShow }) {
  const [activeTab, setActiveTab] = useState(TABS[0].id)

  const ActiveComponent = TABS.find(tab => tab.id === activeTab)?.component

  return (
    <MenuContainer>
      {/* 手機版專用搜尋框 */}
      <StyledMobileSearch>
        <Input placeholder={'輸入展覽名稱'} width={'auto'} />
      </StyledMobileSearch>

      {/* 統一的頁籤導航 */}
      <TabNav>
        {TABS.map(tab => {
          return (
            <TabButton
              key={tab.id}
              isActive={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.name}
            </TabButton>
          )
        })}
      </TabNav>

      {/* 頁籤內容 */}
      <TabContent>{ActiveComponent && <ActiveComponent setModlaShow={setModlaShow} />}</TabContent>
    </MenuContainer>
  )
}

const MenuContainer = styled.div`
  width: 100%;
`

const StyledMobileSearch = styled.div`
  display: flex;
  margin-bottom: 16px;

  @media (min-width: ${breakpoint.tablet}px) {
    display: none;
  }
`

const TabNav = styled.div`
  display: flex;
  gap: 24px;
  border-bottom: 1px solid #e0e0e0;
`

const TabButton = styled.button`
  font-size: 16px;
  font-weight: 600;
  color: ${props => (props.isActive ? '#222222' : '#717171')};
  background: none;
  border: none;
  padding: 0 4px 16px 4px;
  cursor: pointer;
  position: relative;
  transition: color 0.2s ease;

  &:hover {
    color: #222222;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: #222222;
    transform: ${props => (props.isActive ? 'scaleX(1)' : 'scaleX(0)')};
    transition: transform 0.3s ease-in-out;
  }
`

const TabContent = styled.div`
  padding-top: 24px;
`
