import { configureStore } from '@reduxjs/toolkit'
// 各種 reducer
import commonSlice from './commonSlice'
import userSlice from './userSlice'
import dataSlice from './dataSlice'
const store = configureStore({
  reducer: {
    common: commonSlice,
    user: userSlice,
    data: dataSlice,
  },
})

export default store
