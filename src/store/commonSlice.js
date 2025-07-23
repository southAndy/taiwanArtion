import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const fetchData = createAsyncThunk('common/fetchData', async () => {
  try {
    const openResponse = await axios.get(
      'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6'
    )
    return openResponse.data
  } catch (e) {}
})

const commonSlice = createSlice({
  name: 'common',
  initialState: {
    isShowModal: false,
    isLoading: false,
    openData: [],
    filters: {
      cityName: '',
      exhibitionName: '',
      startDate: '',
      endDate: '',
    },
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
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearFilters(state) {
      state.filters = {
        cityName: '',
        exhibitionName: '',
        startDate: '',
        endDate: '',
      }
    },
    setFilterFromURL(state, action) {
      const { cityQuery, exhibitionName, startDate, endDate } = action.payload
      state.filters = {
        cityName: cityQuery || '',
        exhibitionName: exhibitionName || '',
        startDate: startDate || '',
        endDate: endDate || '',
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchData.pending, state => {
        state.isLoading = true
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.isLoading = false
        state.openData = action.payload
      })
      .addCase(fetchData.rejected, state => {
        state.isLoading = false
      })
  },
})

export const {
  showModal,
  hideModal,
  showLoading,
  hideLoading,
  setFilters,
  clearFilters,
  setFilterFromURL,
} = commonSlice.actions
export { fetchData }
export default commonSlice.reducer
