import styled, { keyframes } from 'styled-components'

const skeletonShine = keyframes`
  0% { background-position: -250px 0; }
  50% { background-position: 0px 0; }
`

const Skeleton = styled.div<{ width?: string; height?: string }>`
   display: flex;
   align-items: center;
   width: ${(props) => props.width || '100%'};
   height: ${(props) => props.height || '100%'};
   border-radius: 10px;
   background: #c4c5cc;
   background-image: linear-gradient(90deg, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
   background-repeat: no-repeat;
   background-size: 1000px 100%;
   animation: ${skeletonShine} 1s linear infinite;
`

export default Skeleton
