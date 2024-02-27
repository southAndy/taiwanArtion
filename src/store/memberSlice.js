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
      isLogin: false,
   },
   reducers: {
      setMemberInfo(state, action) {
         state.memberInfo = action.payload
      },
      setLoginTime(state, action) {
         state.loginTime = action.payload
      },
      setIsLogin(state, action) {
         state.isLogin = action.payload
      },
   },
})
export const { setMemberInfo, setLoginTime, setIsLogin } = memberSlice.actions
export default memberSlice.reducer
