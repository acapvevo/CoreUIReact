import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CFormCheck,
  CRow,
  CCardFooter,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useForm } from 'react-hook-form'
import queryString from 'query-string'

import useAppAuth from '@/hooks/auth'
import LoadingButton from '@/components/App/Loading/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginWithUsernameInput, LoginWithUsernameScheme, UserToken } from '@/types/models/user'
import { useLocation, useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import { useGuestMutation } from '@/libs/react-query'

const Login = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const redirectToAfterAuthenticated = location.state
    ? location.state.redirectTo
    : queryString.parse(location.search)['redirectTo']
  const { login } = useAppAuth(redirectToAfterAuthenticated)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isLoading },
  } = useForm<LoginWithUsernameInput>({
    defaultValues: {
      username: '',
      password: '',
      remember_me: false,
    },
    resolver: zodResolver(LoginWithUsernameScheme),
  })

  const onSubmit = handleSubmit((data) => {
    login(data)
  })

  return (
    <CContainer>
      <CRow className="justify-content-center">
        <CCol md={8}>
          <CCard>
            <CCardBody className="p-4">
              <CForm onSubmit={onSubmit}>
                <h1>{t('login')}</h1>
                <p className="text-body-secondary">{t('sign_in_to_your_account')}</p>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilUser} />
                  </CInputGroupText>
                  <CFormInput
                    {...register('username', { required: true })}
                    invalid={!!errors.username}
                    valid={!!(!errors.username && watch('username'))}
                    feedback={errors.username?.message}
                    type="string"
                    placeholder={t('username')}
                    autoComplete="username"
                  />
                </CInputGroup>
                <CInputGroup className="mb-4">
                  <CInputGroupText>
                    <CIcon icon={cilLockLocked} />
                  </CInputGroupText>
                  <CFormInput
                    {...register('password', { required: true })}
                    invalid={!!errors.password}
                    valid={!!(!errors.password && watch('password'))}
                    feedback={errors.password?.message}
                    type="password"
                    placeholder={t('password')}
                    autoComplete="current-password"
                  />
                </CInputGroup>
                <CInputGroup className="mb-4">
                  <CFormCheck label={t('remember_me')} {...register('remember_me')} />
                </CInputGroup>
                <div className="d-grid gap-2 d-md-flex justify-content-md-between">
                  <LoadingButton
                    color="primary"
                    className="px-4"
                    type="submit"
                    text={t('login')}
                    loadingText={t('logging_in')}
                    processing={isLoading}
                  />
                  <CButton
                    color="link"
                    className="px-0"
                    onClick={() => navigate('/ForgotPassword')}
                  >
                    {t('forgot_your_password?')}
                  </CButton>
                </div>
              </CForm>
            </CCardBody>
            <CCardFooter className="d-flex justify-content-center">
              {t('no_account?')}&nbsp;<a href="/Register">{t('sign_up_here')}</a>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default Login
