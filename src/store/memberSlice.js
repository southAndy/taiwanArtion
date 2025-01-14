import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const memberSlice = createSlice({
   name: 'member',
   initialState: {
      memberInfo: {},
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
      setLogout(state, action) {
         //清除 accessToken
         function deleteCookie(name) {
            document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
         }
         deleteCookie('accessToken')
         //isLogin 狀態改為 false
         state.isLogin = action.payload
      },
   },
})
export const { setMemberInfo, setLoginTime, setIsLogin, setMemberInterests } = memberSlice.actions

export default memberSlice.reducer
