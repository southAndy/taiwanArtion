export interface Breakpoint {
  mobile: number
  tablet: number
  desktop: number
}

export const breakpoint: Breakpoint = {
  mobile: 375,
  tablet: 768,
  desktop: 1440,
}

export type ScreenSize = 'mobile' | 'tablet' | 'desktop'

export const getScreenSize = (width: number): ScreenSize => {
  if (width < breakpoint.tablet) return 'mobile'
  if (width < breakpoint.desktop) return 'tablet'
  return 'desktop'
}
