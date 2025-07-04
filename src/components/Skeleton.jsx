import styled from '@emotion/styled'

const SkeletonWrapper = styled.div`
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: ${props => props.radius || '8px'};
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '20px'};
  margin-bottom: ${props => props.mb || '0'};
  margin-top: ${props => props.mt || '0'};
  margin-left: ${props => props.ml || '0'};
  margin-right: ${props => props.mr || '0'};
  display: ${props => (props.inline ? 'inline-block' : 'block')};

  @keyframes skeleton-loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`

// 預設樣式變體
const SkeletonText = styled(SkeletonWrapper)`
  height: 16px;
  margin-bottom: 8px;
`

const SkeletonTitle = styled(SkeletonWrapper)`
  height: 28px;
  margin-bottom: 12px;
`

const SkeletonParagraph = styled.div`
  ${SkeletonText}:nth-of-type(1) {
    width: 100%;
  }
  ${SkeletonText}:nth-of-type(2) {
    width: 90%;
  }
  ${SkeletonText}:nth-of-type(3) {
    width: 95%;
  }
  ${SkeletonText}:nth-of-type(4) {
    width: 80%;
  }
  ${SkeletonText}:last-child {
    margin-bottom: 0;
  }
`

const SkeletonAvatar = styled(SkeletonWrapper)`
  border-radius: 50%;
  width: ${props => props.size || '40px'};
  height: ${props => props.size || '40px'};
`

const SkeletonButton = styled(SkeletonWrapper)`
  height: 40px;
  border-radius: 20px;
`

const SkeletonCard = styled(SkeletonWrapper)`
  height: 200px;
  border-radius: 12px;
`

// 主要組件
const Skeleton = ({
  width,
  height,
  radius,
  mb,
  mt,
  ml,
  mr,
  inline,
  variant = 'default',
  size,
  lines = 4,
  ...props
}) => {
  // 根據 variant 渲染不同樣式
  switch (variant) {
    case 'text':
      return <SkeletonText width={width} mb={mb} mt={mt} ml={ml} mr={mr} {...props} />

    case 'title':
      return <SkeletonTitle width={width} mb={mb} mt={mt} ml={ml} mr={mr} {...props} />

    case 'paragraph':
      return (
        <SkeletonParagraph {...props}>
          {Array.from({ length: lines }, (_, i) => (
            <SkeletonText key={i} />
          ))}
        </SkeletonParagraph>
      )

    case 'avatar':
      return <SkeletonAvatar size={size} mb={mb} mt={mt} ml={ml} mr={mr} {...props} />

    case 'button':
      return <SkeletonButton width={width} mb={mb} mt={mt} ml={ml} mr={mr} {...props} />

    case 'card':
      return (
        <SkeletonCard width={width} height={height} mb={mb} mt={mt} ml={ml} mr={mr} {...props} />
      )

    default:
      return (
        <SkeletonWrapper
          width={width}
          height={height}
          radius={radius}
          mb={mb}
          mt={mt}
          ml={ml}
          mr={mr}
          inline={inline}
          {...props}
        />
      )
  }
}

export default Skeleton
export {
  SkeletonText,
  SkeletonTitle,
  SkeletonParagraph,
  SkeletonAvatar,
  SkeletonButton,
  SkeletonCard,
}
