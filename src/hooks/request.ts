import axios, { getError } from '@/libs/axios'
import sweetAlert, { Alert } from '@/libs/sweet-alert2'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import { useState } from 'react'

const useRequest = (main_url: string) => {
  const header = useAuthHeader()
  const [isLoading, setIsLoading] = useState(false)

  const getAsync = async function(sub_url?: string | number) {
    setIsLoading(true)
    try {
      const response = await axios.get<Alert>(`${main_url}${sub_url && `/${sub_url}`}`, {
        headers: {
          Authorization: header,
        },
      })
      sweetAlert(response.data)
      return true
    } catch (error) {
      sweetAlert(getError(error))
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const deleteAsync = async (sub_url: string | number) => {
    setIsLoading(true)
    try {
      const response = await axios.delete(`${main_url}/${sub_url}`, {
        headers: {
          Authorization: header,
        },
      })
      return true
    } catch (error) {
      sweetAlert(getError(error))
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return {
    deleteAsync,
    getAsync,
    isLoading
  }
}

export default useRequest
