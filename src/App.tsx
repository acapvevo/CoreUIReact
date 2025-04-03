import { ReactNode, Suspense, useEffect } from 'react'
import {
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements, Route,
  RouterProvider,
  Routes,
} from 'react-router-dom'
import AuthProvider from 'react-auth-kit'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import './scss/style.scss'
import './bootstrap'

import store from './store/provider'
import LoadingContent from './components/App/Loading/Content'
import useTheme from './hooks/theme'
import { AppRoutes, GuestRoutes, TemplateRoutes } from './routes'
import queryString from 'query-string'
import { PermissionProvider } from 'react-permission-role'
import { useTranslation } from 'react-i18next'
import ErrorPage from '@/views/Error'

const App = () => {
  const { isColorModeSet, setColorMode, colorMode } = useTheme()
  const { i18n } = useTranslation()

  useEffect(() => {
    const theme = queryString.parse(location.search)['theme'] ?? colorMode ?? 'light'
    const lang = queryString.parse(location.search)['lang'] ?? 'en'

    i18n.changeLanguage(lang as string)
    if (isColorModeSet()) {
      return
    }

    setColorMode(theme as string)
  }, [])

  const routes = (
    <Route errorElement={<ErrorPage/>}>
      {TemplateRoutes}
      {AppRoutes}
      {GuestRoutes}
    </Route>
  )
  const client = new QueryClient()
  const Provider = ({ children }: { children: ReactNode }) => {
    return (
      <QueryClientProvider client={client}>
        <ReactQueryDevtools />
        <AuthProvider store={store}>
          <PermissionProvider>{children}</PermissionProvider>
        </AuthProvider>
      </QueryClientProvider>
    )
  }

  const OldApp = () => {
    return (
      <Provider>
        <BrowserRouter>
          <Routes>{routes}</Routes>
        </BrowserRouter>
      </Provider>
    )
  }

  const App = () => {
    return (
      <Provider>
        <RouterProvider router={createBrowserRouter(createRoutesFromElements(routes))} fallbackElement={<LoadingContent />} />
      </Provider>
    )
  }

  return <App />
}

export default App
