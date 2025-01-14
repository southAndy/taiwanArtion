import { Link } from 'react-router-dom'
import styled from 'styled-components'

export default styled(Link)`
   width: ${(props) => props.width};
   height: ${(props) => props.height};
   color: ${(props) => props.textColor};
`
