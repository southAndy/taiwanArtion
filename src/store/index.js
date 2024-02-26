import { configureStore } from '@reduxjs/toolkit'
// 各種 reducer
import testSlice from './testSlice'
const store = configureStore({
   reducer: {
      test: testSlice,
   },
})

export default store
