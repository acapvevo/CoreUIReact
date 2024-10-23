import { combineReducers, configureStore } from '@reduxjs/toolkit'
import sidebarSlice from './slices/sidebar'
import loadingSlice from './slices/loading'

const reducers = combineReducers({
  sidebar: sidebarSlice,
  loading: loadingSlice,
})

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store
