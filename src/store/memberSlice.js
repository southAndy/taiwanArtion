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
         interests: [],
         comments: [],
      },
      loginTime: '',
      isLogin: false,
   },
   reducers: {
      setMemberInfo(state, action) {
         state.memberInfo = action.payload
      },
      setMemberInterests(state, action) {
         state.memberInfo.interests = action.payload
      },
      setLoginTime(state, action) {
         state.loginTime = action.payload
      },
      setIsLogin(state, action) {
         state.isLogin = action.payload
      },
   },
})
export const { setMemberInfo, setLoginTime, setIsLogin, setMemberInterests } = memberSlice.actions
export default memberSlice.reducer
