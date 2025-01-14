import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { db } from '../../firebase.config'
import { doc, getDoc } from 'firebase/firestore'
import axios from 'axios'

const fetchMemberInfo = createAsyncThunk(
   'member/fetchMemberInfo',
   async (uid, { rejectWithValue }) => {
      try {
         const userDatas = doc(db, 'users', uid)
         const docSnap = await getDoc(userDatas)
         if (docSnap.exists()) {
            return docSnap.data()
         } else {
            throw new Error('使用者資料不存在')
         }
      } catch (e) {
         rejectWithValue(e)
      }
   },
)

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
   extraReducers: (builder) => {
      builder
         .addCase(fetchMemberInfo.fulfilled, (state, action) => {
            state.memberInfo = action.payload
         })
         .addCase(fetchMemberInfo.rejected, (state, action) => {
            console.log('取得使用者資料失敗', action.payload)
         })
   },
})
export const { setMemberInfo, setLoginTime, setIsLogin, setMemberInterests } = memberSlice.actions
export { fetchMemberInfo }
export default memberSlice.reducer
