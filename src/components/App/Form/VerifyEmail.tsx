import { VerifyEmailFormProps, VerifyEmailStatus } from '@/types/forms/verifyEmail'
import { useAppMutation } from '@/libs/react-query'
import { useEffect, useState } from 'react'
import useAsyncEffect from 'use-async-effect'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import { User } from '@/types/models/user'
import { checkUserVerified } from '@/utils/query'

const VerifyEmailForm = ({ onClose }: VerifyEmailFormProps) => {
  const [isLinkSent, setIsLinkSent] = useState(false)
  const user = useAuthUser<User>()
  const { refetch, isFetching, data } = checkUserVerified()

  useAsyncEffect(async () => {
    window.Echo.private(`user.${user?.id}`)
      .listen('Verified',() => {
        console.log('Verified')
      })

    await refetch()

    return () => {
      window.Echo.leave(`user.${user?.id}`);
    }
  }, [])
  useEffect(() => {
    switch (data?.status) {
      case VerifyEmailStatus.VERIFIED:
        onClose && onClose()
        break
      case VerifyEmailStatus.VERIFICATION_LINK_SENT:
        setIsLinkSent(true)
        break
    }
  }, [data?.status, isFetching])

  return <></>
}

export default VerifyEmailForm
