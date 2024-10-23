import { createSlice } from '@reduxjs/toolkit'

const initSlice = {
  sidebarShow: true,
  sidebarUnfoldable: false,
}

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: initSlice,
  reducers: {
    sidebarShowToggle(state, action) {
      const { visible } = action.payload
      state.sidebarShow = visible
    },
    sidebarUnfoldableToggle(state) {
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
  },
})

export const sidebarAction = sidebarSlice.actions

export default sidebarSlice.reducer
