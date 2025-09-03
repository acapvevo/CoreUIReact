import {
  QueryClient,
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
import axios, { getError } from './axios'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import sweetAlert, { AlertProps } from './sweet-alert2'

export const queryClient = new QueryClient()

interface QueryProps<T, Q> extends UseQueryOptions<T>, AxiosRequestConfig<Q> {
  payload?: Q
}

type AppQuery = <T, Q = { [k: string]: any }>(config: QueryProps<T, Q>) => UseQueryResult<T>
export const useAppQuery: AppQuery = (config) => {
  const { url, method, payload, ...queryOption } = config

  return useQuery({
    ...queryOption,
    retry: false,
    queryFn: async () => {
      try {
        const response = await axios({
          method: method,
          url: url,
          data: payload,
        })

        return response.data
      } catch (error: any) {
        sweetAlert(getError(error))
        throw new Error()
      }
    },
  })
}

type AppSuspenseQuery = <T, Q = { [k: string]: any }>(
  config: QueryProps<T, Q>,
) => UseSuspenseQueryResult<T>
export const useAppSuspenseQuery: AppSuspenseQuery = (config) => {
  const { url, method, payload, ...queryOption } = config

  const query = useSuspenseQuery({
    ...queryOption,
    retry: false,
    queryFn: async () => {
      try {
        const response = await axios({
          method: method,
          url: url,
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

type UseMutationProps<T, R> = {
  success?: (data: R) => void
} & UseMutationOptions<AxiosResponse<R & Pick<AlertProps, 'type' | 'text'>, any>, Error, T> &
  AxiosRequestConfig<T>

type UseMutation = <T, R>(
  props: UseMutationProps<T, R>,
) => UseMutationResult<AxiosResponse<R & Pick<AlertProps, 'type' | 'text'>, T>, Error, T>
export const useAppMutation = function <T, R = {}>(props: UseMutationProps<T, R>) {
  return useGuestMutation(props)
}

export const useGuestMutation = function <T, R = {}>({
  success,
  onSuccess,
  onError,
  ...props
}: UseMutationProps<T, R>) {
  return useMutation<AxiosResponse<R & Pick<AlertProps, 'type' | 'text'>, T>, Error, T>({
    mutationFn: (data) => {
      return axios({
        ...props,
        data,
      })
    },
    ...props,
    onSuccess: (response, variables, context) => {
      const { data } = response
      data.type && data.text && sweetAlert(data)
      !!success && success(data)
      onSuccess && onSuccess(response, variables, context)
    },
    onError: (error, variables, context) => {
      sweetAlert(getError(error))
      onError && onError(error, variables, context)
    },
  })
}
