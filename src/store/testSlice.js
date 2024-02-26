import { createSlice } from '@reduxjs/toolkit'

const testSlice = createSlice({
   name: 'test',
   initialState: {
      value: 0,
   },
   reducers: {
      increment: (state) => {
         console.log(state)
         state.value += 1
         console.log(state)
      },
   },
})

export const { increment } = testSlice.actions
export default testSlice.reducer
