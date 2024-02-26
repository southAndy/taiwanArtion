import { createSlice } from '@reduxjs/toolkit'

const dataSlice = createSlice({
   name: 'data',
   initialState: {
      filterRule: '', //不同篩選條件
      exhibitionData: [], //展覽資料
   },
   reducers: {},
   //todo 根據不同的action type做不同的處理
   actions: {},
})
export const { showModal, hideModal } = dataSlice.actions
export default dataSlice.reducer
