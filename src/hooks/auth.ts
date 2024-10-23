import axios, { getError } from '@/libs/axios'
import useSignIn from 'react-auth-kit/hooks/useSignIn'
import useSignOut from 'react-auth-kit/hooks/useSignOut'
import { useNavigate } from 'react-router-dom'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import { useEffect, useState } from 'react'
import sweetAlert from '@/libs/sweet-alert2'


const useAuth = (redirectIfAuthenticated?: string) => {
  const signIn = useSignIn()
  const signOut = useSignOut()
  const authHeader = useAuthHeader()
  const navigate = useNavigate()

  const login = async ({ ...props }: { [k: string]: any }) => {
    try {
      const response = await axios.post('/login', props)
      
      const isSign = signIn({
        auth: {
          token: response.data['access_token'],
          type: response.data['token_type'],
        },
        refresh: response.data['refresh_token'],
        userState: response.data['user'],
      })

      if (isSign) {
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
    login,
    logout,
  }
}

export default useAuth
