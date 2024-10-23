import { createSlice } from '@reduxjs/toolkit'

const initSlice = {
  loading: false,
}

const loadingSlice = createSlice({
  name: 'loading',
  initialState: initSlice,
  reducers: {
    loadingToggle(state, action) {
      const { loading } = action.payload
      state.loading = loading
    },
  },
})

export const loadingAction = loadingSlice.actions

export default loadingSlice.reducer
