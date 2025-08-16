import { RoleInput, RoleScheme } from '@/types/models/role'
import { Gender, UserInput, UserSchema } from '@/types/models/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { createFormControl } from 'react-hook-form'

export const RoleDefaultValues: RoleInput = {
  name: '',
  permissions: [],
}
export const RoleFormControl = createFormControl<RoleInput>({
  defaultValues: RoleDefaultValues,
  resolver: zodResolver(RoleScheme),
})

export const UserDefaultValues: UserInput = {
  name: '',
  gender: Gender.MALE,
  email: '',
  username: '',
  address: {
    line_1: '',
    line_2: '',
    line_3: '',
    postcode: '',
    city: '',
    state: '',
    country: '',
  },
  phone_number: {
    number: '+60',
    iso2: 'my',
  },
  roles: [],
}
export const UserFormControl = createFormControl<UserInput>({
  defaultValues: UserDefaultValues,
  resolver: zodResolver(UserSchema),
})
