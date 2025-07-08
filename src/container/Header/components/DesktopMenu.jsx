import React from 'react'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import { breakpoint } from '@styles/utils/breakpoint'

const DesktopNavigation = () => {
  const navigationItems = [
    // TODO: 等功能完成後再開啟
    // { title: '地圖找展覽', link: '/map' },
    // { title: '所有展覽', link: '/all' },
  ]

  return (
    <StyledDesktopMenu>
      {navigationItems.map((item, index) => (
        <Link key={index} to={item.link}>
          {item.title}
        </Link>
      ))}
    </StyledDesktopMenu>
  )
}

const StyledDesktopMenu = styled.div`
  display: none;

  @media (min-width: ${breakpoint.tablet}px) {
    flex: 2;
    display: flex;
    gap: 20px;
    margin-left: 40px;
    font-weight: 700;

    a {
      font-size: 14px;
      color: #535353;

      &:hover {
        color: #be875c;
      }
    }
  }
`

export default DesktopNavigation
