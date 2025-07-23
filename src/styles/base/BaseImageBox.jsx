import styled from '@emotion/styled'
import { breakpoint } from '../utils/breakpoint'

export default styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
  object-fit: ${props => (props.scale ? props.scale : 'contain')};

  @media (min-width: ${breakpoint.tablet}px) {
    width: ${props => props.tabletWidth};
    height: ${props => props.tabletHeight};
  }

  @media (min-width: ${breakpoint.desktop}px) {
    width: ${props => props.desktopWidth};
    height: ${props => props.desktopHeight};
  }
`
