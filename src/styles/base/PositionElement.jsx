import styled from 'styled-components'

export const PositionElement = styled.div`
   position: ${(props) => props.position};
   top: ${(props) => props.top};
   bottom: ${(props) => props.bottom};
   left: ${(props) => props.left};
   right: ${(props) => props.right};
`
