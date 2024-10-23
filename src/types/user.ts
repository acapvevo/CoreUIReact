import { Model } from './model'
import { z } from 'zod'
import { PhoneNumberUtil } from 'google-libphonenumber'

export enum Gender {
  MALE = 'M',
  FEMALE = 'F',
}

export interface User extends Model, UserInput {
  id: number
  username: string
  profile_picture: string
  timezone: string
  last_login: string
  email_verified_at: string | null
  address: Address
}

export interface Address extends Model, AddressInput {
  id: number
  user_id: number
}

type AddressInput = z.infer<typeof AddressScheme>
const AddressScheme = z
  .object({
    line_1: z.string().min(1),
    line_2: z.string().min(1),
    line_3: z.string(),
    postcode: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    country: z.object({
      iso2: z.string().min(1),
      name: z.string().min(1),
    }),
  })
  .required()

export type UserInput = z.infer<typeof UserSchema>
export const UserSchema = z.object({
  name: z.string().min(1),
  gender: z.nativeEnum(Gender),
  email_address: z.string().min(1).email(),
  phone_number: z
    .string()
    .min(1, 'Phone Number is required')
    .refine((val) => {
      const phoneUtil = PhoneNumberUtil.getInstance()
      try {
        return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(val))
      } catch (error) {
        return false
      }
    }),
  address: AddressScheme,
})

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
    message: "Passwords do not match",
    path: ['password_confirmation'],
  })
