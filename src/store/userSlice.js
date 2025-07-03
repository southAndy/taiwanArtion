import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { auth } from '../../firebase.config'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'

// monitor user state
export const monitorUserState = createAsyncThunk('user/monitorUserState', async () => {
  return new Promise(resolve => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      resolve(user)
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

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: {},
    loginTime: '',
    isLogin: false, // login state
    isLoading: false,
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
      //清除 accessToken
      function deleteCookie(name) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      }
      deleteCookie('accessToken')
      //isLogin 狀態改為 false
      state.isLogin = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(monitorUserState.fulfilled, (state, action) => {
      state.userInfo = action.payload
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLogin = true
      state.userInfo = action.payload
    })
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLogin = false
      state.userInfo = {}
    })
  },
})
export const { setUserInfo, setLoginTime, setIsLogin, setLogout } = userSlice.actions

export default userSlice.reducer
