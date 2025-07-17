import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../container/Header/Header'
import Footer from '../container/Footer/Footer'

const Layout = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout
