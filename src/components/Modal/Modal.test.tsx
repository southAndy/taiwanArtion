import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Modal from './Modal'

describe('Modal component render', () => {
   it('should render children', () => {
      render(
         <Modal isShow={true} setShow={() => {}}>
            <div>children</div>
         </Modal>,
      )
      expect(screen.getByText('children')).toBeInTheDocument()
   })
})

describe('Modal component props work', () => {
   it('should render modal background', () => {
      render(<Modal isShow={true} setShow={() => {}} />)
      expect(screen.getByTestId('modal-background')).toBeInTheDocument()
   })
   it('should render modal content', () => {
      render(
         <Modal isShow={true} setShow={() => {}}>
            content
         </Modal>,
      )
      expect(screen.getByTestId('modal-content')).toBeInTheDocument()
   })
   it('should render modal content with height', () => {
      render(
         <Modal isShow={true} setShow={() => {}} height='100px'>
            content
         </Modal>,
      )
      expect(screen.getByTestId('modal-content')).toHaveStyle('height: 100px')
   })
   it('should render modal content with width', () => {
      render(
         <Modal isShow={true} setShow={() => {}} width='100px'>
            content
         </Modal>,
      )
      expect(screen.getByTestId('modal-content')).toHaveStyle('width: 100px')
   })
   it('should render modal content with shape', () => {
      render(
         <Modal isShow={true} setShow={() => {}} shape='10px'>
            content
         </Modal>,
      )
      expect(screen.getByTestId('modal-content')).toHaveStyle('border-radius: 10px')
   })
   it('should render modal position', () => {
      render(
         <Modal
            isShow={true}
            setShow={() => {}}
            position={{ t: '10px', b: '10px', l: '10px', r: '10px' }}
         >
            content
         </Modal>,
      )
      expect(screen.getByTestId('modal-content')).toHaveStyle('top: 10px')
      expect(screen.getByTestId('modal-content')).toHaveStyle('bottom: 10px')
      expect(screen.getByTestId('modal-content')).toHaveStyle('left: 10px')
      expect(screen.getByTestId('modal-content')).toHaveStyle('right: 10px')
   })
})

describe('Modal component behavior', () => {
   it('should hide modal when isShow is false', () => {
      render(
         <Modal isShow={false} setShow={() => {}}>
            content
         </Modal>,
      )
      expect(screen.getByTestId('modal-background')).toHaveStyle('display: none')
   })
   it('should display modal when isShow is true', () => {
      render(
         <Modal isShow={true} setShow={() => {}}>
            content
         </Modal>,
      )
      expect(screen.getByTestId('modal-background')).toHaveStyle('display: block')
   })
   // click event test true becomes false
   it('should hide modal when click on background', () => {
      const setShow = jest.fn()
      render(
         <Modal isShow={true} setShow={setShow}>
            content
         </Modal>,
      )
   })
})
