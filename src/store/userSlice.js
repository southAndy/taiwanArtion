import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { auth } from '../../firebase.config'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import {
  userIcon0,
  userIcon1,
  userIcon2,
  userIcon3,
  userIcon4,
  userIcon5,
  userIcon6,
  userIcon7,
  userIcon8,
} from '../assets/images/backstage'

// monitor user state
export const monitorUserState = createAsyncThunk('user/monitorUserState', async () => {
  return new Promise(resolve => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        resolve({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL ? user.photoURL : 0,
          emailVerified: user.emailVerified,
          isAnonymous: user.isAnonymous,
          providerData: user.providerData,
        })
      } else {
        resolve(null) // 沒有用戶時返回 null
      }
    })
    return () => unsubscribe()
  })
})

// login
export const login = createAsyncThunk('user/login', async ({ email, password }) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password)
  console.log('userCredential', userCredential)
  return {
    uid: userCredential.user.uid,
    email: userCredential.user.email,
    displayName: userCredential.user.displayName,
    photoURL: userCredential.user.photoURL,
    emailVerified: userCredential.user.emailVerified,
    isAnonymous: userCredential.user.isAnonymous,
    providerData: userCredential.user.providerData,
  }
})

// logout
export const logout = createAsyncThunk('user/logout', async () => {
  await signOut(auth)
  return null
})

// 頭像相關的 actions
export const updateUserPhoto = createAsyncThunk(
  'user/updateUserPhoto',
  async (photoIndex, { getState }) => {
    const { user } = getState()
    // const userDoc = doc(db, 'users', user.userInfo.uid)
    // await updateDoc(userDoc, { photoURL: photoIndex })
    return photoIndex
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: {},
    loginTime: '',
    isLogin: false, // login state
    isLoading: false,
    // 新增大頭貼相關狀態
    userPhotos: [
      userIcon0,
      userIcon1,
      userIcon2,
      userIcon3,
      userIcon4,
      userIcon5,
      userIcon6,
      userIcon7,
      userIcon8,
    ],
    tempPhotoIndex: 0, // 暫時選擇的照片索引（編輯時用）
    isPhotoModalOpen: false,
  },
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload
    },
    setLoginTime(state, action) {
      state.loginTime = action.payload
    },
    setIsLogin(state, action) {
      state.isLogin = action.payload
    },
    setLogout(state, action) {
      //isLogin 狀態改為 false
      state.isLogin = action.payload
      state.userInfo = {}
    },
    setTempPhotoIndex(state, action) {
      state.tempPhotoIndex = action.payload
    },
    setPhotoModalOpen(state, action) {
      state.isPhotoModalOpen = action.payload
    },
    cancelPhotoSelection(state) {
      state.tempPhotoIndex = state.userInfo.photoURL || 0
      state.isPhotoModalOpen = false
    },
  },
  extraReducers: builder => {
    builder.addCase(monitorUserState.fulfilled, (state, action) => {
      if (action.payload) {
        state.userInfo = action.payload
        state.isLogin = true
      } else {
        state.userInfo = {}
        state.isLogin = false
      }
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLogin = true
      state.userInfo = action.payload
    })
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLogin = false
      state.userInfo = {}
    })
    builder.addCase(updateUserPhoto.fulfilled, (state, action) => {
      state.userInfo.photoURL = action.payload
      state.isPhotoModalOpen = false
    })
  },
})

export const {
  setUserInfo,
  setLoginTime,
  setIsLogin,
  setLogout,
  setTempPhotoIndex,
  setPhotoModalOpen,
  cancelPhotoSelection,
} = userSlice.actions

export default userSlice.reducer
