import axios, { getError } from '@/libs/axios'
import useSignIn from 'react-auth-kit/hooks/useSignIn'
import useSignOut from 'react-auth-kit/hooks/useSignOut'
import { useNavigate } from 'react-router-dom'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import sweetAlert from '@/libs/sweet-alert2'
import { LoginInput, UserToken } from '@/types/models/user'
import { usePermission } from 'react-permission-role'

const useAuth = (redirectIfAuthenticated?: string) => {
  const signIn = useSignIn()
  const signOut = useSignOut()
  const authHeader = useAuthHeader()
  const navigate = useNavigate()
  const { setUser } = usePermission()

  const loginWithPost = async (payload: LoginInput) => {
    try {
      const { data } = await axios.post<UserToken>('/login', payload)

      const isSign = signIn({
        auth: {
          token: data['access_token'],
          type: data['token_type'],
        },
        refresh: data['refresh_token'],
        userState: data['user'],
      })

      if (isSign) {
        setUser({
          id: data.user.id,
          roles: data.roles,
          permissions: data.permissions,
        })
        navigate(redirectIfAuthenticated ?? '/', { replace: true })
      } else {
        sweetAlert({
          type: 'error',
          text: 'Something went wrong, Please try again',
        })
      }
    } catch (error: any) {
      sweetAlert(getError(error))
    }
  }

  const login = (data: UserToken) => {
    const isSign = signIn({
      auth: {
        token: data['access_token'],
        type: data['token_type'],
      },
      refresh: data['refresh_token'],
      userState: data['user'],
    })

    if (isSign) {
      navigate(redirectIfAuthenticated ?? '/', { replace: true })
    } else {
      sweetAlert({
        type: 'error',
        text: 'Something went wrong, Please try again',
      })
    }
  }

  const logout = async () => {
    try {
      await axios.get('/logout', {
        headers: {
          Authorization: authHeader,
        },
      })
      signOut()

      navigate('/Auth/Login', { replace: true })
    } catch (error: any) {
      sweetAlert(getError(error))
    }
  }

  return {
    loginWithPost,
    logout,
    login,
  }
}

export default useAuth
