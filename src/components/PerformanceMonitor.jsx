import styled from '@emotion/styled'

/**
 * 性能監控顯示組件
 * 僅在開發環境下顯示
 */
const PerformanceMonitor = ({ metrics }) => {
  // 只在開發環境顯示

  if (import.meta.env.MODE !== 'development') {
    return null
  }
  
  const { fps, avgFPS, frameDrops, scrollEvents, isScrolling } = metrics

  return (
    <MonitorContainer>
      <MonitorTitle>📊 滾動性能監控</MonitorTitle>
      <MetricRow>
        <MetricLabel>即時 FPS:</MetricLabel>
        <MetricValue $isGood={fps >= 55}>{fps}</MetricValue>
      </MetricRow>
      <MetricRow>
        <MetricLabel>平均 FPS:</MetricLabel>
        <MetricValue $isGood={avgFPS >= 55}>{avgFPS}</MetricValue>
      </MetricRow>
      <MetricRow>
        <MetricLabel>掉幀次數:</MetricLabel>
        <MetricValue $isGood={frameDrops <= 5}>{frameDrops}</MetricValue>
      </MetricRow>
      <MetricRow>
        <MetricLabel>滾動次數:</MetricLabel>
        <MetricValue>{scrollEvents}</MetricValue>
      </MetricRow>
      <StatusRow>
        <StatusIndicator $isScrolling={isScrolling}>
          {isScrolling ? '🔄 滾動中' : '⏸️ 靜止'}
        </StatusIndicator>
      </StatusRow>
    </MonitorContainer>
  )
}

const MonitorContainer = styled.div`
  position: fixed;
  top: 16px;
  right: 16px;
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 12px;
  border-radius: 8px;
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 12px;
  z-index: 9999;
  min-width: 200px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
`

const MonitorTitle = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 4px;
`

const MetricRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
  align-items: center;
`

const MetricLabel = styled.span`
  color: #ccc;
`

const MetricValue = styled.span`
  font-weight: bold;
  color: ${props => (props.$isGood ? '#4ade80' : props.$isGood === false ? '#f87171' : '#fbbf24')};
  font-size: 14px;
`

const StatusRow = styled.div`
  text-align: center;
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
`

const StatusIndicator = styled.span`
  color: ${props => (props.$isScrolling ? '#4ade80' : '#64748b')};
  font-weight: bold;
`

export default PerformanceMonitor

