import { getError } from '@/libs/axios'
import { useNavigate } from 'react-router'
import sweetAlert from '@/libs/sweet-alert2'
import { LoginWithEmailInput, LoginWithUsernameInput, UserSession } from '@/types/models/user'
import { usePermission } from 'react-permission-role'
import { useAuth } from '@reactit/auth'

const useAppAuth = (redirectIfAuthenticated?: string) => {
  const {
    user: session,
    initialized,
    isAuthenticated,
    signInAsync,
    signOutAsync,
  } = useAuth<UserSession>()
  const navigate = useNavigate()
  const { setUser } = usePermission()

  const login = async (data: LoginWithUsernameInput | LoginWithEmailInput) => {
    try {
      const response = await signInAsync(data)

      setUser({
        id: response.user?.user.id,
        permissions: response.user?.permissions,
        roles: response.user?.roles,
      })

      navigate(redirectIfAuthenticated ?? '/', { replace: true })
    } catch (error: any) {
      sweetAlert(getError(error))
    }
  }

  const logout = async () => {
    try {
      await signOutAsync()
      navigate('/Login', { replace: true })
    } catch (error: any) {
      sweetAlert(getError(error))
    }
  }

  return {
    session,
    logout,
    login,
    initialized,
    isAuthenticated,
  }
}

export default useAppAuth
