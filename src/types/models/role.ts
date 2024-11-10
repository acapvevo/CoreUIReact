import { z } from 'zod'
import { Model } from '../model'
import { User } from './user'

export interface Role extends Model, RoleInput {
  guard_name: string
  created_by: number
  user: User
}

export type RoleInput = z.infer<typeof RoleScheme>
export const RoleScheme = z
  .object({
    name: z.string().min(1),
    permissions: z.array(z.string()).min(1),
  })
  .required()
