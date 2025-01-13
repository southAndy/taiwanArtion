import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const fetchData = createAsyncThunk('common/fetchData', async () => {
   try {
      const openResponse = await axios.get(
         'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6',
      )
      return openResponse.data
   } catch (e) {
      console.log(e)
   }
})

const commonSlice = createSlice({
   name: 'common',
   initialState: {
      isShowModal: false,
      isLoading: false,
      openData: [],
   },
   reducers: {
      showModal(state) {
         state.isShowModal = true
      },
      hideModal(state) {
         state.isShowModal = false
      },
      showLoading(state) {
         state.isLoading = true
      },
      hideLoading(state) {
         state.isLoading = false
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchData.pending, (state) => {
            state.isLoading = true
         })
         .addCase(fetchData.fulfilled, (state, action) => {
            state.isLoading = false
            state.openData = action.payload
         })
         .addCase(fetchData.rejected, (state) => {
            state.isLoading = false
         })
   },
})

export const { showModal, hideModal, showLoading, hideLoading } = commonSlice.actions
export { fetchData }
export default commonSlice.reducer
