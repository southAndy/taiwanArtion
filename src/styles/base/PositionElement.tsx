import styled from 'styled-components'

interface PositionElementProps {
   position: string
   top: string
   bottom: string
   left: string
   right: string
}

export const PositionElement = styled.div<PositionElementProps>`
   position: ${(props) => props.position};
   top: ${(props) => props.top};
   bottom: ${(props) => props.bottom};
   left: ${(props) => props.left};
   right: ${(props) => props.right};
`
