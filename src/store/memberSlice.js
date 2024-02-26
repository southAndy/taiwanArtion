import { createSlice } from '@reduxjs/toolkit'

const memberSlice = createSlice({
   name: 'member',
   initialState: {
      memberInfo: {
         id: '',
         name: '',
         email: '',
         password: '',
         phone: '',
         address: '',
         birthday: '',
      },
      loginTime: '',
   },
   reducers: {},
})

export default memberSlice.reducer
