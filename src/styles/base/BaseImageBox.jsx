import styled from 'styled-components'

export default styled.div`
   width: ${(props) => props.width};
   height: ${(props) => props.height};
   object-fit: ${(props) => (props.height ? props.types : 'contain')};
`
