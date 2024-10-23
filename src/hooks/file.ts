import axios, { getError } from '@/libs/axios'
import sweetAlert, { Alert } from '@/libs/sweet-alert2'
import { Download, Upload } from '@/types/hooks/file'
import { AxiosResponse, Method } from 'axios'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'

const useFile = () => {
  const header = useAuthHeader()

  const upload = async <R>({ url, data, method, onSuccess }: Upload<R>) => {
    try {
      const response = await axios<any, AxiosResponse<R & Alert, FormData>, FormData>({
        url,
        method,
        headers: {
          Authorization: header,
          'Content-Type': 'multipart/form-data',
        },
        data,
      })

      sweetAlert(response.data)
      if(onSuccess) onSuccess(response.data)

      return true
    } catch (e) {
      sweetAlert(getError(e))
      return false
    }
  }

  const download = async <D>({url, method, data}: Download<D>) => {
    try {
      const response = await axios({
        url,
        method,
        headers: {
          Authorization: header,
        },
        data,
      })

      return true
    } catch (e) {
      sweetAlert(getError(e))
      return false
    }
  }

  return {
    download,
    upload
  }
}

export default useFile
