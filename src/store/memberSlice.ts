import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { MemberState } from '../types/store'
import { db } from '../../firebase.config'
import { doc, getDoc } from 'firebase/firestore'
import { User } from '../types/user'
import { deleteCookie } from '../utils/cookie'

const fetchMemberInfo = createAsyncThunk<User, string, { rejectValue: string }>(
   'member/fetchMemberInfo',
   async (uid, { rejectWithValue }) => {
      try {
         const userDatas = doc(db, 'users', uid)
         const docSnap = await getDoc(userDatas)
         if (docSnap.exists()) {
            return docSnap.data() as User //todo
         } else {
            throw new Error('使用者資料不存在')
         }
      } catch (e) {
         return rejectWithValue(e as string)
      }
   },
)

const initialState: MemberState = {
   memberInfo: {
      name: '',
      uid: '',
      email: '',
      photoIndex: 0, // user avatar index
      favorite: [],
      interests: [],
   },
   isLogin: false,
}

const memberSlice = createSlice({
   name: 'member',
   initialState,
   reducers: {
      setMemberInfo(state, action: PayloadAction<User>) {
         state.memberInfo = action.payload
      },
      setMemberInterests(state, action: PayloadAction<string[]>) {
         state.memberInfo.interests = action.payload
      },

      setIsLogin(state, action: PayloadAction<boolean>) {
         state.isLogin = action.payload
      },
      setLogout(state, action: PayloadAction<boolean>) {
         //isLogin 狀態改為 false
         state.isLogin = action.payload

         //登出後清空使用者資料
         deleteCookie('accessToken')
         state.memberInfo = {
            name: '',
            uid: '',
            email: '',
            photoIndex: 0,
            favorite: [],
            interests: [],
         }
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchMemberInfo.fulfilled, (state, action: PayloadAction<User>) => {
            state.memberInfo = action.payload
            state.isLogin = true
         })
         .addCase(fetchMemberInfo.rejected, (state, action) => {
            console.log('取得使用者資料失敗', action.payload)
         })
   },
})
export const { setMemberInfo, setIsLogin, setMemberInterests, setLogout } = memberSlice.actions
export { fetchMemberInfo }
export default memberSlice.reducer
