import axios, { getError } from '@/libs/axios'
import sweetAlert, { AlertProps } from '@/libs/sweet-alert2'
import { Download, Upload } from '@/types/hooks/file'
import { AxiosResponse } from 'axios'

const useFile = () => {

  const upload = async <R>({ url, data, method, onSuccess }: Upload<R>) => {
    try {
      const response = await axios<any, AxiosResponse<R & AlertProps, FormData>, FormData>({
        url,
        method,
        headers: {
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
