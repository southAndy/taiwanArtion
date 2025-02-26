import { createSlice } from '@reduxjs/toolkit'

const dataSlice = createSlice({
   name: 'data',
   initialState: {
      filterRule: '', //不同篩選條件
      exhibitionData: [], //展覽資料
   },
   reducers: {},
})

export default dataSlice.reducer
