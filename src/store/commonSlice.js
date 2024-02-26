import { createSlice } from '@reduxjs/toolkit'

const commonSlice = createSlice({
   name: 'common',
   initialState: {
      isShowModal: false,
      isLoading: false,
   },
   reducers: {
      showModal(state) {
         state.isShowModal = true
      },
      hideModal(state) {
         state.isShowModal = false
      },
      showLoading(state) {
         state.isLoading = true
      },
      hideLoading(state) {
         state.isLoading = false
      },
   },
   // extraReducers: {
   //    //todo 根據不同的action type做不同的處理
   // },
})
export const { showModal, hideModal } = commonSlice.actions
export default commonSlice.reducer
