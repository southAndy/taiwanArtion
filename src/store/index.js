import { configureStore } from '@reduxjs/toolkit'
// 各種 reducer
import commonSlice from './commonSlice'
import memberSlice from './memberSlice'
import dataSlice from './dataSlice'
const store = configureStore({
   reducer: {
      common: commonSlice,
      member: memberSlice,
      data: dataSlice,
   },
})

export default store
