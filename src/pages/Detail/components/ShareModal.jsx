import styled from '@emotion/styled'
import React from 'react'
import { lineIcon, facebookIcon } from '@assets/images'

const ShareModal = ({ isOpen, onClose, exhibitionData }) => {
  const shareToLine = () => {
    const url = window.location.href
    const text = 'Check out this exhibition!'
    window.open(
      `https://lineit.line.me/share/ui?url=${encodeURIComponent(url)}&text=${encodeURIComponent(
        text
      )}`,
      '_blank'
    )
  }

  const shareToFacebook = ({ isOpen, onClose }) => {
    const url = window.location.href
    const text = 'Check out this exhibition!'
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      alert('連結已複製到剪貼簿')
    } catch (err) {
      const textArea = document.createElement('textarea')
      textArea.value = window.location.href
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      alert('連結已複製到剪貼簿')
    }
  }

  // close modal
  const handleClose = () => {
    onClose(true)
  }

  if (!isOpen) return null

  return (
    <ShareBackground onClick={handleClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <p>分享展覽</p>
          <CloseButton onClick={handleClose}>x</CloseButton>
        </ModalHeader>
        <SocialShareList>
          <SocialShareItem onClick={shareToLine}>
            <SocialIcon src={lineIcon} alt="line" />
            <SocialLabel>Line</SocialLabel>
          </SocialShareItem>
          <SocialShareItem onClick={shareToFacebook}>
            <SocialIcon src={facebookIcon} alt="facebook" />
            <SocialLabel>Facebook</SocialLabel>
          </SocialShareItem>
        </SocialShareList>
        <LinkCopySection>
          <LinkInput type="text" value={window.location.href} readOnly />
          <CopyButton onClick={copyToClipboard}>複製連結</CopyButton>
        </LinkCopySection>
      </ModalContent>
    </ShareBackground>
  )
}

export default ShareModal

const ShareBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ModalContent = styled.section`
  position: relative;
  width: 300px;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #666;

  &:hover {
    color: #000;
  }
`

const SocialShareList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
`

const SocialShareItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f5f5;
  }
`

const SocialIcon = styled.img`
  width: 24px;
  height: 24px;
`

const SocialLabel = styled.p`
  margin: 0;
  font-weight: 500;
`

const LinkCopySection = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
`

const LinkInput = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
`

const CopyButton = styled.button`
  white-space: nowrap;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #bd7e4c;
  color: white;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #0056b3;
  }
`
