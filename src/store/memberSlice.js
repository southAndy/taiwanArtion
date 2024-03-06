import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
export const normalLogin = createAsyncThunk('member/loginLine', async (arg, ThunkAPI) => {
   const { username, password } = arg
   const res = await axios.post(
      'https://zhao-zhao-zhan-lan-hou-duan-ce-shi-fu-wu.onrender.com/login',
      {
         username: username,
         password: password,
      },
   )
   return res.data
})
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
   extraReducers: {
      [normalLogin.fulfilled]: (state, action) => {
         if (action.payload.status === 200) {
            state.memberInfo = action.payload.accountInfo
            state.isLogin = true
         } else {
            alert('登入失敗!請檢查帳號密碼是否正確')
         }
      },
      [normalLogin.rejected]: (state, action) => {
         console.log(action)
      },
   },
})
export const { setMemberInfo, setLoginTime, setIsLogin, setMemberInterests } = memberSlice.actions
export default memberSlice.reducer
