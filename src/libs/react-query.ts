import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueries,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
  useSuspenseQuery,
  UseSuspenseQueryResult,
} from '@tanstack/react-query'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import axios, { getError } from './axios'
import { AxiosResponse, Method } from 'axios'
import sweetAlert, { Alert } from './sweet-alert2'
import { error } from 'console'

interface QueryProps<T, Q> extends UseQueryOptions<T> {
  url: string
  method: Method
  payload?: Q
}

type AppQuery = <T, Q = { [k: string]: any }>(config: QueryProps<T, Q>) => UseQueryResult<T>
export const useAppQuery: AppQuery = (config) => {
  const header = useAuthHeader()
  const { url, method, payload, ...queryOption } = config

  const query = useQuery({
    ...queryOption,
    retry: false,
    queryFn: async () => {
      try {
        const response = await axios({
          method: method,
          url: url,
          headers: {
            Authorization: header,
          },
          data: payload,
        })

        return response.data
      } catch (error: any) {
        sweetAlert(getError(error))
        throw new Error()
      }
    },
  })

  return query
}

type AppSuspenseQuery = <T, Q = { [k: string]: any }>(
  config: QueryProps<T, Q>,
) => UseSuspenseQueryResult<T>
export const useAppSuspenseQuery: AppSuspenseQuery = (config) => {
  const header = useAuthHeader()
  const { url, method, payload, ...queryOption } = config

  const query = useSuspenseQuery({
    ...queryOption,
    retry: false,
    queryFn: async () => {
      try {
        const response = await axios({
          method: method,
          url: url,
          headers: {
            Authorization: header,
          },
          data: payload,
        })

        return response.data
      } catch (error: any) {
        throw new Error()
      }
    },
  })

  return query
}

type AppQueries = <T, Q = { [k: string]: any }>(configs: QueryProps<T, Q>[]) => UseQueryResult<T>[]
export const useAppQueries: AppQueries = (configs) => {
  const header = useAuthHeader()

  const queries = useQueries({
    queries: configs.map((config) => {
      const { url, method, payload, ...query } = config

      return {
        ...query,
        retry: false,
        queryFn: async () => {
          try {
            const response = await axios({
              method: method,
              url: url,
              headers: {
                Authorization: header,
              },
              data: payload,
            })

            return response.data
          } catch (error: any) {
            sweetAlert(getError(error))
            throw new Error()
          }
        },
      }
    }),
  })

  return queries
}

interface MutationProps<T, R> extends UseMutationOptions<AxiosResponse<R & Alert, any>, Error, T> {
  url: string
  method: Method
  success: (data: R) => void
}

type AppMutation = <T, R>(
  props: MutationProps<T, R>,
) => UseMutationResult<AxiosResponse<R & Alert, T>, Error, T>
export const useAppMutation = function <T, R>({ url, method, success }: MutationProps<T, R>) {
  const header = useAuthHeader()

  const mutation = useMutation<AxiosResponse<R & Alert, T>, Error, T>({
    mutationFn: (data) => {
      return axios({
        url,
        method,
        data,
        headers: {
          Authorization: header,
        },
      })
    },
    onSuccess: (response) => {
      sweetAlert(response.data)
      success(response.data)
    },
    onError: (error) => {
      sweetAlert({
        text: error.message,
        type: 'error',
      })
    },
  })

  return mutation
}
