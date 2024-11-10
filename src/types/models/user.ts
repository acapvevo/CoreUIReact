import { Model } from '../model'
import { z } from 'zod'
import { PhoneNumberUtil } from 'google-libphonenumber'

export enum Gender {
  MALE = 'M',
  FEMALE = 'F',
}

export interface User extends Model, UserInput {
  profile_picture: string
  timezone: string
  last_login: string
  email_verified_at: string | null
  address: Address
}

export type LoginInput = z.infer<typeof LoginScheme>
export const LoginScheme = z
  .object({
    username: z.string().min(1),
    password: z.string().min(1),
    remember_me: z.boolean(),
    timezone: z.string().min(1),
  })
  .required()

export type RegistrationInput = z.infer<typeof RegistrationScheme>
export const RegistrationScheme = z
  .object({
    username: z.string().min(1),
    name: z.string().min(1),
    email: z.string().min(1).email(),
    gender: z.nativeEnum(Gender),
  })
  .required()

export interface Address extends Model, AddressInput {
  user_id: number
}

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

export type PhoneNumberInput = z.infer<typeof PhoneNumberSchema>
export const PhoneNumberSchema = z
  .object({
    iso2: z.string().nullable(),
    number: z
      .string()
      .nullable()
      .refine((val) => {
        const phoneUtil = PhoneNumberUtil.getInstance()
        try {
          return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(val ?? ''))
        } catch (error) {
          return false
        }
      }),
  })
  .required()

export type UserInput = z.infer<typeof UserSchema>
export const UserSchema = z
  .object({
    phone_number: PhoneNumberSchema,
    address: AddressScheme,
  })
  .merge(RegistrationScheme)

export type PasswordInput = z.infer<typeof PasswordScheme>
export const PasswordScheme = z
  .object({
    password: z.string().min(8).regex(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'), {
      message:
        'Password must be at least 8 characters and contain an uppercase letter, lowercase letter, and number',
    }),
    password_confirmation: z.string(),
  })
  .required()
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Passwords do not match',
    path: ['password_confirmation'],
  })

export interface UserToken {
  access_token: string
  refresh_token: string
  token_type: 'Bearer'
  expires_in: number
  user: User
  permissions: string[]
  roles: string[]
}

export type RolesInput = z.infer<typeof RolesScheme>
export const RolesScheme = z.object({
  roles: z.array(z.string()).min(1),
})
