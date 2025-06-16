import { PropsWithChildren, ReactNode, Suspense, useEffect } from 'react'
import {
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from 'react-router'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import './scss/style.scss'
import './bootstrap'

import LoadingContent from './components/App/Loading/Content'
import useTheme from './hooks/theme'
import { AppRoutes, GuestRoutes, TemplateRoutes } from './routes'
import queryString from 'query-string'
import { PermissionProvider, usePermission } from 'react-permission-role'
import { useTranslation } from 'react-i18next'
import ErrorPage from '@/views/Error'
import { AuthProvider } from '@reactit/auth'
import axios from '@/libs/axios'
import { UserToken } from '@/types/models/user'

const client = new QueryClient()

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
    <Route hydrateFallbackElement={<LoadingContent />} errorElement={<ErrorPage />}>
      {TemplateRoutes}
      {AppRoutes}
      {GuestRoutes}
    </Route>
  )

  const Provider = ({ children }: PropsWithChildren<{}>) => {
    return (
      <QueryClientProvider client={client}>
        <ReactQueryDevtools />
        <AuthProvider
          authStorage={'localStorage'}
          authPrefix={`${import.meta.env.VITE_APP_NAME}_`}
          doSignIn={async (_, credentials) => {
            const {
              data: {
                access_token,
                token_expires_in,
                refresh_expired_in,
                refresh_token,
                user,
                permissions,
                roles,
              },
            } = await axios.post<UserToken>('/login', credentials)

            return {
              token: access_token,
              tokenExpiration: token_expires_in,
              renew: refresh_token,
              renewExpiration: refresh_expired_in,
              user: {
                user,
                permissions,
                roles,
              },
            }
          }}
          doRenew={async ({ renew, auth, initialized }) => {
            const {
              data: { access_token, token_expires_in, refresh_expired_in, refresh_token },
            } = await axios.post<UserToken>(
              '/refresh',
              {
                refresh_token: renew?.token,
                access_token: auth?.token,
              },
              {
                headers: {
                  Authorization: '',
                },
              },
            )

            return {
              token: access_token,
              tokenExpiration: token_expires_in,
              renew: refresh_token,
              renewExpiration: refresh_expired_in,
            }
          }}
          onTokenChange={(_, token) => {
            if (token) {
              axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            } else {
              delete axios.defaults.headers.common['Authorization']
            }
          }}
          doSignOut={async () => {
            await axios.post(`/logout`)
          }}
        >
          <PermissionProvider>{children}</PermissionProvider>
        </AuthProvider>
      </QueryClientProvider>
    )
  }

  const App = () => {
    return (
      <Provider>
        <RouterProvider router={createBrowserRouter(createRoutesFromElements(routes))} />
      </Provider>
    )
  }

  return <App />
}

export default App
