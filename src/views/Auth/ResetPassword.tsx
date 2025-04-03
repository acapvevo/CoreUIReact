import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
  LoginInput,
  PasswordInput,
  PasswordScheme,
  ResetPasswordInput,
  ResetPasswordScheme,
  User,
  UserToken,
} from '@/types/models/user'
import queryString from 'query-string'
import { useGuestMutation } from '@/libs/react-query'
import useAuth from '@/hooks/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CFormCheck,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import LoadingButton from '@/components/App/Loading/Button'
import { useTranslation } from 'react-i18next'

const ResetPassword = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const { login } = useAuth()
  const {
    reset,
    getValues,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<ResetPasswordInput>({
    defaultValues: {
      email: '',
      password: '',
      password_confirmation: '',
      token: '',
    },
    resolver: zodResolver(ResetPasswordScheme),
  })
  const { mutate: mutateReset, isPending: isResetPending } = useGuestMutation<
    ResetPasswordInput,
    {}
  >({
    url: '/password/reset',
    method: 'POST',
    onSuccess: () => {
      mutateLogin({
        email: getValues('email'),
        password: getValues('password'),
        remember_me: false,
      })
    },
  })
  const { mutate: mutateLogin, isPending: isLoginPending } = useGuestMutation<
    Pick<User, 'email'> & Omit<LoginInput, 'username'>,
    UserToken
  >({
    url: '/login',
    method: 'POST',
    onSuccess: ({ data }) => {
      login(data)
    },
  })

  useEffect(() => {
    const query = queryString.parse(location.search)

    if (typeof query['email'] == 'string' && typeof query['token'] == 'string') {
      reset({
        token: query['token'],
        email: query['email'],
        password: '',
        password_confirmation: '',
      })
    }
  }, [])

  const onSubmit = handleSubmit((data) => {
    mutateReset(data)
  })

  return (
    <CContainer>
      <CRow className="justify-content-center">
        <CCol md={8}>
          <CCard>
            <CCardBody className="p-4">
              <CForm onSubmit={onSubmit}>
                <h1>{t('reset_password')}</h1>
                <p className="text-body-secondary">{t('insert_your_new_password')}</p>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilUser} />
                  </CInputGroupText>
                  <CFormInput
                    floatingLabel={t('email_address')}
                    {...register('email')}
                    invalid={!!errors.email}
                    feedback={errors.email?.message}
                    type="string"
                    disabled
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilLockLocked} />
                  </CInputGroupText>
                  <CFormInput
                    {...register('password')}
                    invalid={!!errors.password}
                    feedback={errors.password?.message}
                    type="password"
                    floatingLabel={t('new_password')}
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilLockLocked} />
                  </CInputGroupText>
                  <CFormInput
                    {...register('password_confirmation')}
                    invalid={!!errors.password_confirmation}
                    feedback={errors.password_confirmation?.message}
                    type="password"
                    floatingLabel={t('new_password_confirmation')}
                  />
                </CInputGroup>
                <div className="d-grid gap-2 d-md-flex justify-content-md-between">
                  <LoadingButton
                    color="primary"
                    className="px-4"
                    type="submit"
                    text={t('reset_password')}
                    loadingText={isLoginPending ? t('logging_in') : t('resetting_password')}
                    processing={isLoginPending || isResetPending}
                  />
                  <CButton
                    color="link"
                    className="px-0"
                    onClick={() =>
                      navigate('/ForgotPassword', { state: { email: getValues('email') } })
                    }
                  >
                    {t('forgot_your_password?')}
                  </CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default ResetPassword
