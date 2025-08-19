import { useState, useEffect, useRef } from 'react'

/**
 * 滾動性能監控 Hook
 * 專門監控虛擬滾動區域的 FPS 和渲染性能
 */
export const useScrollPerformance = scrollElementRef => {
  const [metrics, setMetrics] = useState({
    fps: 0,
    avgFPS: 0,
    frameDrops: 0,
    scrollEvents: 0,
    isScrolling: false,
  })

  const frameCountRef = useRef(0)
  const lastTimeRef = useRef(0)
  const frameTimesRef = useRef([])
  const frameDropsRef = useRef(0)
  const scrollEventsRef = useRef(0)
  const animationIdRef = useRef(null)
  const isScrollingRef = useRef(false)
  const scrollTimeoutRef = useRef(null)

  // FPS 計算函數
  const measureFPS = () => {
    const currentTime = performance.now()
    frameCountRef.current++

    // 記錄幀時間
    if (lastTimeRef.current > 0) {
      const frameTime = currentTime - lastTimeRef.current
      frameTimesRef.current.push(frameTime)

      // 檢測掉幀（超過 25ms 視為掉幀，更合理的閾值）
      if (frameTime > 25) {
        frameDropsRef.current++
      }

      // 保留最近 60 幀的數據
      if (frameTimesRef.current.length > 60) {
        frameTimesRef.current.shift()
      }
    }

    // 每 1000ms 更新一次 UI
    const timeDiff = currentTime - (lastTimeRef.current || currentTime)
    if (timeDiff >= 1000 || lastTimeRef.current === 0) {
      const fps = timeDiff > 0 ? Math.round((frameCountRef.current * 1000) / timeDiff) : 0

      // 計算平均 FPS - 使用最近幀的平均時間
      const recentFrames = frameTimesRef.current.slice(-30) // 取最近30幀
      const avgFrameTime =
        recentFrames.length > 0
          ? recentFrames.reduce((sum, time) => sum + time, 0) / recentFrames.length
          : 16.67
      const avgFPS = Math.round(1000 / avgFrameTime)

      setMetrics(prev => ({
        ...prev,
        fps: Math.min(fps, 60), // 限制最大60fps
        avgFPS: Math.min(avgFPS, 60),
        frameDrops: frameDropsRef.current,
        scrollEvents: scrollEventsRef.current,
        isScrolling: isScrollingRef.current,
      }))

      frameCountRef.current = 0
      lastTimeRef.current = currentTime
    }

    // 只在滾動時繼續監控
    if (isScrollingRef.current) {
      animationIdRef.current = requestAnimationFrame(measureFPS)
    } else {
      animationIdRef.current = null
    }
  }

  // 滾動開始處理
  const handleScrollStart = () => {
    if (!isScrollingRef.current) {
      isScrollingRef.current = true
      scrollEventsRef.current++

      // 立即更新 UI 狀態
      setMetrics(prev => ({
        ...prev,
        scrollEvents: scrollEventsRef.current,
        isScrolling: true,
      }))

      // 開始 FPS 監控
      if (!animationIdRef.current) {
        lastTimeRef.current = performance.now()
        frameCountRef.current = 0
        animationIdRef.current = requestAnimationFrame(measureFPS)
      }
    } else {
      // 更新滾動事件計數
      scrollEventsRef.current++
      setMetrics(prev => ({
        ...prev,
        scrollEvents: scrollEventsRef.current,
      }))
    }

    // 重置滾動結束計時器
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }

    // 滾動停止後 150ms 停止監控
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false
      setMetrics(prev => ({ ...prev, isScrolling: false }))
    }, 150)
  }

  // 重置統計數據
  const resetMetrics = () => {
    frameCountRef.current = 0
    frameDropsRef.current = 0
    scrollEventsRef.current = 0
    frameTimesRef.current = []
    setMetrics({
      fps: 0,
      avgFPS: 0,
      frameDrops: 0,
      scrollEvents: 0,
      isScrolling: false,
    })
  }

  useEffect(() => {
    const scrollElement = scrollElementRef?.current

    if (!scrollElement) {
      return
    }

    // 監聽滾動事件
    const handleScroll = () => {
      handleScrollStart()
    }

    scrollElement.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      scrollElement.removeEventListener('scroll', handleScroll)

      // 清理計時器和動畫
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [scrollElementRef])

  return { metrics, resetMetrics }
}
