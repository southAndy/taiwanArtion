import { createSlice } from '@reduxjs/toolkit'

const commonSlice = createSlice({
   name: 'member',
   initialState: {
      isShowModal: false,
   },
   reducers: {
      showModal(state) {
         state.isShowModal = true
      },
      hideModal(state) {
         state.isShowModal = false
      },
   },
})
export const { showModal, hideModal } = commonSlice.actions
export default commonSlice.reducer
