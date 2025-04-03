import { z } from '@/libs/zod'
import { Model } from '../model'
import { User } from './user'

export interface Role extends Model, RoleInput {
  guard_name: string
  in_used: boolean
}

export type RoleInput = z.infer<typeof RoleScheme>
export const RoleScheme = z
  .object({
    name: z.string().min(1),
    permissions: z.array(z.string()).min(1),
  })
  .required()
