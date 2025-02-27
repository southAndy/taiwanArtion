import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { ExhibitionResponse } from '../types/api'
import { CommonState } from '../types/store'

const fetchData = createAsyncThunk<ExhibitionResponse, string>('common/fetchData', async () => {
   try {
      const openResponse = await axios.get(
         'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6',
      )
      return openResponse.data as ExhibitionResponse
   } catch (e) {
      console.log(e)
      throw e
   }
})

const initialState: CommonState = {
   isShowModal: false,
   isLoading: false,
   openData: [] as ExhibitionResponse[],
}

const commonSlice = createSlice({
   name: 'common',
   initialState,
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
         .addCase(fetchData.fulfilled, (state, action: PayloadAction<ExhibitionResponse>) => {
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
