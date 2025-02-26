import { configureStore } from '@reduxjs/toolkit'
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

// 透過 store.getState 回傳值來反推導狀態型別，而不是直接寫死
export type RootState = ReturnType<typeof store.getState>
// 透過 store.dispatch 來推導型別，因為 dispatch 可能有多個參數（根據 執行的是否是 thunk action）
export type AppDispatch = typeof store.dispatch

export default store
