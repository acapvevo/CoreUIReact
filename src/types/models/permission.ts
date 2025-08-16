import { Model } from '../model'
import { z } from '@/libs/zod'

export type Permission = {
  guard_name: string
} & Model & PermissionInput

export type PermissionInput = z.infer<typeof PermissionScheme>
export const PermissionScheme = z.object({
  name: z.string().min(1),
})
