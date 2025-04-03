import createStore from 'react-auth-kit/createStore'
import createRefresh from 'react-auth-kit/createRefresh'
import axios from '@/libs/axios'
import { User } from '@/types/models/user'

const refresh = createRefresh<User>({
  interval: 1,
  refreshApiCallback: async (param) => {
    try {
      const response = await axios.post('/refresh', {
        refresh_token: param.refreshToken,
        access_token: param.authToken,
      })
      return {
        isSuccess: true,
        newAuthToken: response.data['access_token'],
        newAuthTokenType: response.data['token_type'],
        newRefreshToken: response.data['refresh_token'],
        newAuthUserState: response.data['user'],
      }
    } catch (error) {
      return {
        isSuccess: false,
        newAuthToken: '',
      }
    }
  },
})

const store = createStore<User>({
  authName: import.meta.env.VITE_APP_NAME + '_auth',
  authType: 'localstorage',
  refresh: refresh,
  // cookieDomain: 'http://localhost:5173',
  // cookieSecure: false,
  debug: import.meta.env.VITE_APP_DEBUG,
})

export default store
