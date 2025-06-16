import { useGuestMutation } from '@/libs/react-query'
import { User, UserSchema } from '@/types/models/user'
import { useForm } from 'react-hook-form'
import {
  CAlert,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilAt } from '@coreui/icons'
import LoadingButton from '@/components/App/Loading/Button'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router'
import { zodResolver } from '@hookform/resolvers/zod'

const ForgotPassword = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const [showStatus, setShowStatus] = useState(false)
  const { mutate, isPending } = useGuestMutation<Pick<User, 'email'>, { status: string }>({
    url: '/password/forgot',
    method: 'POST',
    onSuccess: () => {
      setShowStatus(true)
    },
  })
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<Pick<User, 'email'>>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(UserSchema.pick({ email: true })),
  })
  const submit = handleSubmit((data) => {
    setShowStatus(false)
    mutate(data)
  })
  useEffect(() => {
    if (location.state) {
      setValue('email', location.state.email)
      submit()
    }
  }, [])

  return (
    <CContainer>
      <CRow className="justify-content-center">
        <CCol md={8}>
          <CCard>
            <CCardBody className="p-4">
              <h1>{t('forgot_password')}</h1>
              <p className="text-body-secondary">{t('forgot_password_description')}</p>
              {showStatus && <CAlert color="success">{t('forgot_password_alert')}</CAlert>}
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilAt} />
                </CInputGroupText>
                <CFormInput
                  floatingLabel={t('email_address')}
                  {...register('email')}
                  invalid={!!errors.email}
                  feedback={errors.email?.message}
                  type="email"
                  autoComplete="email"
                />
              </CInputGroup>
              <CRow>
                <CCol xs={6}>
                  <LoadingButton
                    color="primary"
                    text={t('email_password_reset_link')}
                    loadingText={t('sending_email')}
                    processing={isPending}
                    onClick={submit}
                  />
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default ForgotPassword
