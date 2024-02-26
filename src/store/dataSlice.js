import { createSlice } from '@reduxjs/toolkit'

const dataSlice = createSlice({
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
export const { showModal, hideModal } = dataSlice.actions
export default dataSlice.reducer
