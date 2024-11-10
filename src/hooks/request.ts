import axios, { getError } from '@/libs/axios'
import sweetAlert, { Alert } from '@/libs/sweet-alert2'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'

const useRequest = (main_url: string) => {
  const header = useAuthHeader()

  const getAsync = async function <T>() {
    try {
      const response = await axios.get<T>(`${main_url}`, {
        headers: {
          Authorization: header,
        },
      })
      return response.data as T
    } catch (error) {
      sweetAlert(getError(error))
      return undefined
    }
  }

  const deleteAsync = async (sub_url: any) => {
    try {
      await axios.delete(`${main_url}/${sub_url}`, {
        headers: {
          Authorization: header,
        },
      })
      return true
    } catch (error) {
      sweetAlert(getError(error))
      return false
    }
  }

  return {
    deleteAsync,
    getAsync,
  }
}

export default useRequest
