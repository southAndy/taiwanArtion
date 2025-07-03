import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../container/Header/Header'
import Footer from '../container/Footer/Footer'

const Layout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
