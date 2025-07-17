import React from 'react'
import { logoIcon } from '@assets/images/index'
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <Link to="/" className="w-[120px] h-[40px]">
      <img src={logoIcon} alt="logo" className="w-full h-full" />
    </Link>
  )
}

export default Logo
