// src/components/Dropdown/Dropdown.jsx
import React, { useRef, useEffect } from 'react'
import styled from '@emotion/styled'
import { createPortal } from 'react-dom'

const Dropdown = ({
  isOpen,
  onClose,
  trigger,
  children,
  placement = 'bottom-right',
  offset = { x: 0, y: 8 },
}) => {
  const triggerRef = useRef(null)
  const dropdownRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = event => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !triggerRef.current?.contains(event.target)
      ) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onClose])

  const getDropdownPosition = () => {
    if (!triggerRef.current) return {}

    const rect = triggerRef.current.getBoundingClientRect()

    switch (placement) {
      case 'bottom-right':
        return {
          top: rect.bottom + offset.y,
          right: window.innerWidth - rect.right + offset.x,
        }
      case 'bottom-left':
        return {
          top: rect.bottom + offset.y,
          left: rect.left + offset.x,
        }
      case 'bottom-center':
        return {
          top: rect.bottom + offset.y,
          left: rect.left + rect.width / 2,
          transform: 'translateX(-50%)',
        }
      default:
        return {}
    }
  }

  return (
    <>
      {/* Trigger 元素 */}
      <span ref={triggerRef}>{trigger}</span>

      {/* Dropdown 內容 */}
      {isOpen &&
        createPortal(
          <DropdownContainer ref={dropdownRef} style={getDropdownPosition()}>
            {children}
          </DropdownContainer>,
          document.body
        )}
    </>
  )
}

const DropdownContainer = styled.div`
  position: fixed;
  z-index: 1000;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  min-width: 320px;
  max-width: 90vw;
  max-height: 80vh;
`

export default Dropdown
