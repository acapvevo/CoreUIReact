import { VerifyEmailFormProps, VerifyEmailStatus } from '@/types/forms/verifyEmail'
import { useEffect, useState } from 'react'
import useAsyncEffect from 'use-async-effect'
import { User } from '@/types/models/user'
import { checkUserVerified } from '@/utils/query'
import useAppAuth from '@/hooks/auth'

const VerifyEmailForm = ({ onClose }: VerifyEmailFormProps) => {
  const [isLinkSent, setIsLinkSent] = useState(false)
  const { session } = useAppAuth()
  const { refetch, isFetching, data } = checkUserVerified()

  useAsyncEffect(async () => {
    window.Echo.private(`user.${session?.user.id}`).listen('Verified', () => {
      console.log('Verified')
    })

    await refetch()

    return () => {
      window.Echo.leave(`user.${session?.user.id}`)
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
