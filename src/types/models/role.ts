import { z } from '@/libs/zod'
import { Model } from '../model'
import { Permission, PermissionScheme } from '@/types/models/permission'

export type Role = {
  guard_name: string
  in_used: boolean
  permissions: Permission[]
} & Model &
  RoleInput

export type RoleInput = z.infer<typeof RoleScheme>
export const RoleScheme = z
  .object({
    name: z.string().min(1),
    permissions: z.array(PermissionScheme).min(1),
  })
  .required()
