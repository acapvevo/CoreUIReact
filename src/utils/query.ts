import { User } from '@/types/models/user'
import { queryClient, useAppQuery } from '@/libs/react-query'
import { VerifyEmailStatus } from '@/types/forms/verifyEmail'
import { Paginate } from '@/types/components/table'
import { Role } from '@/types/models/role'
import { Permission } from '@/types/models/permission'
import { Health } from '@/types/health'

//#region Auth
export const checkUserVerified = () => {
  return useAppQuery<{ status: VerifyEmailStatus }>({
    url: '/verification/email/notification',
    method: 'POST',
    queryKey: ['auth', 'verify_email', 'notification'],
    enabled: false,
  })
}
//#endregion

//#region User
export const getUserListing = (params: URLSearchParams) => {
  return useAppQuery<Paginate<User>>({
    url: `/setting/user?${params.toString()}`,
    method: 'GET',
    queryKey: ['setting', 'role', 'list', params],
  })
}

export const invalidateGetUserListing = () =>
  queryClient.invalidateQueries({
    queryKey: ['setting', 'user', 'list'],
  })

export const getUsers = (enabled?: boolean) => {
  return useAppQuery<User[]>({
    url: `/setting/user`,
    method: 'GET',
    queryKey: ['setting', 'user'],
  })
}

export const getUser = (id?: number, enabled?: boolean) => {
  return useAppQuery<User>({
    queryKey: ['user', 'setting', id],
    url: `/setting/user/${id}`,
    method: 'GET',
    enabled: !!id && enabled,
  })
}
//#endregion

//#region Role
export const getRoleListing = (params: URLSearchParams) => {
  return useAppQuery<Paginate<Role>>({
    url: `/setting/role?${params.toString()}`,
    method: 'GET',
    queryKey: ['setting', 'role', 'list', params],
  })
}

export const invalidateRole = () =>
  queryClient.invalidateQueries({
    queryKey: ['setting', 'role'],
  })

export const getRoles = (enabled?: boolean) => {
  return useAppQuery<Role[]>({
    url: `/setting/role`,
    method: 'GET',
    queryKey: ['setting', 'roles'],
    enabled: enabled,
  })
}

export const getRole = (id?: number, enabled?: boolean) => {
  return useAppQuery<Role>({
    queryKey: ['setting', 'role', id],
    url: `/setting/role/${id}`,
    method: 'GET',
    enabled: !!id && enabled,
  })
}
//#endregion

//#region Permission
export const getPermissions = (enabled?: boolean) => {
  return useAppQuery<Permission[]>({
    queryKey: ['permissions', 'setting'],
    url: '/setting/permission',
    method: 'GET',
  })
}
//#endregion

//#region Health
export const getHealth = () => {
  return useAppQuery<Health>({
    queryKey: ['health'],
    url: '/setting/health',
    method: 'GET',
  })
}
//#endregion
