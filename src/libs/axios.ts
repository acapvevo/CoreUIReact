import Axios, { Method } from 'axios'
import sweetAlert, { AlertProps } from './sweet-alert2'

const axios = Axios.create({
  baseURL: import.meta.env.VITE_API_LARAVEL_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
  withXSRFToken: true,
})

type GetError = (error: any) => AlertProps
export const getError: GetError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    if (error.response.status == 400) {
      return {
        type: error.response.data.type,
        text: error.response.data.text,
      }
    }

    return {
      type: 'error',
      text: error.response.data.message,
    }
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    return {
      type: 'error',
      text: error.request.responseText,
    }
  } else {
    // Something happened in setting up the request that triggered an Error
    return {
      type: 'error',
      text: error.message,
    }
  }
}

export default axios
