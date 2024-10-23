import { ReactNode, Suspense, useEffect } from 'react'
import {
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Routes,
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import AuthProvider from 'react-auth-kit'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import './scss/style.scss'

import store from './store/provider'
import { State } from './types/store'
import LoadingContent from './components/App/Loading/Content'
import useTheme from './hooks/theme'
import { AppRoutes, GuestRoutes, TemplateRoutes } from './routes'
import queryString from 'query-string'

const App = () => {
  const { isColorModeSet, setColorMode, colorMode } = useTheme()

  useEffect(() => {
    const theme = queryString.parse(location.search)['theme'] ?? colorMode ?? 'light'

    if (isColorModeSet()) {
      return
    }

    setColorMode(theme as string)
  }, [])

  const routes = (
    <>
      {TemplateRoutes}
      {AppRoutes}
      {GuestRoutes}
    </>
  )
  const client = new QueryClient()
  const Provider = ({ children }: { children: ReactNode }) => {
    return (
      <AuthProvider store={store}>
        <QueryClientProvider client={client}>
          <ReactQueryDevtools />
          {children}
        </QueryClientProvider>
      </AuthProvider>
    )
  }

  const OldApp = () => {
    return (
      <Provider>
        <BrowserRouter>
          <Suspense fallback={<LoadingContent />}>
            <Routes>{routes}</Routes>
          </Suspense>
        </BrowserRouter>
      </Provider>
    )
  }

  const router = createBrowserRouter(createRoutesFromElements(routes))

  const NewApp = () => {
    return (
      <Provider>
        <RouterProvider router={router} fallbackElement={<LoadingContent />} />
      </Provider>
    )
  }

  return <NewApp />
}

export default App
