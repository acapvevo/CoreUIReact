import { Model } from '../model'

export interface Permission extends Model {
  name: string
  guard_name: string
}
