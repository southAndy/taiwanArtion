import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

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
      // fetchNormalLogin: create.createAsyncThunk(
      //    async (arg, ThunkAPI) => {
      //       const { username, password } = arg
      //       const res = await axios.post(
      //          'https://zhao-zhao-zhan-lan-hou-duan-ce-shi-fu-wu.onrender.com/login',
      //          {
      //             username: username,
      //             password: password,
      //          },
      //       )
      //       return res.data
      //    },
      //    {
      //       pending: (state, action) => {
      //          state.status = 'loading'
      //       },
      //       fulfilled: (state, action) => {
      //          state.status = 'success'
      //          state.memberInfo = action.payload
      //       },
      //       rejected: (state, action) => {
      //          state.status = 'failed'
      //       },
      //    },
      // ),
   },
})
export const { setMemberInfo, setLoginTime, setIsLogin, setMemberInterests } = memberSlice.actions

export default memberSlice.reducer
