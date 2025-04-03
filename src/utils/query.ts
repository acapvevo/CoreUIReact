//#region Auth
import { User } from '@/types/models/user'
import { useAppQuery } from '@/libs/react-query'
import { VerifyEmailStatus } from '@/types/forms/verifyEmail'

export const checkUserVerified = () => {
  return useAppQuery<{ status: VerifyEmailStatus }>({
    url: '/verification/email/notification',
    method: 'POST',
    queryKey: ['auth', 'verify_email', 'notification'],
    enabled: false,
  })
}
//#endregion
