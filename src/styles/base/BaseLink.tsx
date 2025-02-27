import { Link } from 'react-router-dom'
import styled from 'styled-components'

interface LinkProps {
   width: string
   height: string
   textColor: string
}

export default styled(Link)<LinkProps>`
   width: ${(props) => props.width};
   height: ${(props) => props.height};
   color: ${(props) => props.textColor};
`
