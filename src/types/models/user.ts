import { z } from '@/libs/zod'
import { Model } from '../model'
import { PhoneNumberUtil } from 'google-libphonenumber'
import { CountryIso2 } from 'react-international-phone'
import { Role, RoleScheme } from '@/types/models/role'

export enum Gender {
  MALE = 'M',
  FEMALE = 'F',
}

export type User = {
  profile_picture: string
  timezone: string
  last_login: string
  email_verified_at: string | null
  address: Address
  phone_number: PhoneNumber
  roles: Role[]
} & Model &
  RegistrationInput

const LoginScheme = z.object({
  password: z.string().min(1),
  remember_me: z.boolean(),
})

export type LoginWithUsernameInput = z.infer<typeof LoginWithUsernameScheme>
export const LoginWithUsernameScheme = LoginScheme.extend({
  username: z.string().min(1),
}).required()

export type LoginWithEmailInput = z.infer<typeof LoginWithEmailScheme>
export const LoginWithEmailScheme = LoginScheme.extend({
  email: z.string().min(1).email(),
}).required()

export type RegistrationInput = z.infer<typeof RegistrationScheme>
export const RegistrationScheme = z
  .object({
    username: z.string().min(1),
    name: z.string().min(1),
    email: z.string().min(1).email(),
    gender: z.nativeEnum(Gender),
  })
  .required()

export type Address = {
  user_id: number
} & Model &
  AddressInput

export type AddressInput = z.infer<typeof AddressScheme>
export const AddressScheme = z
  .object({
    line_1: z.string().nullable(),
    line_2: z.string().nullable(),
    line_3: z.string().nullable(),
    postcode: z.string().nullable(),
    city: z.string().nullable(),
    state: z.string().nullable(),
    country: z.string().nullable(),
  })
  .required()

export type PhoneNumber = Model & PhoneNumberInput

export type PhoneNumberInput = z.infer<typeof PhoneNumberSchema>
export const PhoneNumberSchema = z
  .object({
    iso2: z.custom<CountryIso2>().nullable(),
    number: z
      .string()
      .nullable()
      .refine(
        (val) => {
          const phoneUtil = PhoneNumberUtil.getInstance()
          try {
            return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(val ?? ''))
          } catch (error) {
            return false
          }
        },
        { params: { i18n: 'invalid_phone_number' } },
      ),
  })
  .required()

export type UserInput = z.infer<typeof UserSchema>
export const UserSchema = z
  .object({
    phone_number: PhoneNumberSchema,
    address: AddressScheme,
    roles: z.array(RoleScheme.pick({ name: true })),
  })
  .merge(RegistrationScheme)

export type PasswordInput = z.infer<typeof PasswordScheme>
export const PasswordScheme = z
  .object({
    password: z.string().min(8).regex(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')),
    password_confirmation: z.string(),
  })
  .required()
  .refine((data) => data.password === data.password_confirmation, {
    params: { i18n: 'password_not_match' },
    path: ['password_confirmation'],
  })

export type UserSession = Pick<UserToken, 'user' | 'permissions' | 'roles'>
export interface UserToken {
  access_token: string
  refresh_token: string
  token_type: 'Bearer'
  token_expires_in: number
  refresh_expired_in: number
  user: User
  permissions: string[]
  roles: string[]
}

export type ResetPasswordInput = z.infer<typeof ResetPasswordScheme>
export const ResetPasswordScheme = PasswordScheme.and(
  z.object({
    token: z.string().min(1),
  }),
).and(UserSchema.pick({ email: true }))
