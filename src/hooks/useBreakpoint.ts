import { useState, useEffect } from 'react'

export interface Breakpoint {
  mobile: number
  tablet: number
  desktop: number
}

const breakpoint: Breakpoint = {
  mobile: 375,
  tablet: 768,
  desktop: 1440,
}

export const useBreakpoint = () => {
  const [screenSize, setScreenSize] = useState(window.innerWidth)
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint.tablet)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setScreenSize(width)
      setIsMobile(width < breakpoint.tablet)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return {
    screenSize,
    isMobile,
    isTablet: screenSize >= breakpoint.tablet && screenSize < breakpoint.desktop,
    isDesktop: screenSize >= breakpoint.desktop,
  }
}
