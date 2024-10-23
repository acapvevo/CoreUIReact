import { useState } from 'react'
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import queryString from 'query-string'

import useAuth from '@/hooks/auth'
import LoadingButton from '@/components/App/Loading/Button'
import { getLocalTimezone } from '@/libs/luxon'

interface LoginInput {
  username: string
  password: string
  remember_me: boolean
  timezone: string
}

const Login = () => {
  const [loading, setLoading] = useState(false)
  const redirectToAfterAuthenticated = queryString.parse(location.search)['redirectTo'] as string

  const { login } = useAuth(redirectToAfterAuthenticated)
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<LoginInput>({
    defaultValues: {
      username: '',
      password: '',
      remember_me: false,
      timezone: getLocalTimezone('z'),
    },
  })

  const onSubmit: SubmitHandler<LoginInput> = (data) => {
    setLoading(true)

    login(data).finally(() => {
      setLoading(false)
    })
  }

  return (
    <CContainer>
      <CRow className="justify-content-center">
        <CCol md={8}>
          <CCard className="p-4">
            <CCardBody>
              <CForm onSubmit={handleSubmit(onSubmit)}>
                <h1>Login</h1>
                <p className="text-body-secondary">Sign In to your account</p>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilUser} />
                  </CInputGroupText>
                  <CFormInput
                    {...register('username', { required: true })}
                    invalid={errors.username ? true : false}
                    valid={!errors.username && watch('username') ? true : false}
                    feedback={errors.username?.message}
                    type="string"
                    placeholder="Username"
                    autoComplete="username"
                  />
                </CInputGroup>
                <CInputGroup className="mb-4">
                  <CInputGroupText>
                    <CIcon icon={cilLockLocked} />
                  </CInputGroupText>
                  <CFormInput
                    {...register('password', { required: true })}
                    invalid={errors.password ? true : false}
                    valid={!errors.password && watch('password') ? true : false}
                    feedback={errors.password?.message}
                    type="password"
                    placeholder="Password"
                    autoComplete="current-password"
                  />
                </CInputGroup>
                <CInputGroup className="mb-4">
                  <CFormCheck label="Remember Me" {...register('remember_me')} />
                </CInputGroup>
                <CRow>
                  <CCol xs={6}>
                    <LoadingButton
                      color="primary"
                      className="px-4"
                      type="submit"
                      text="Login"
                      loadingText="Login"
                      processing={loading}
                    />
                  </CCol>
                  <CCol xs={6} className="d-flex justify-content-end">
                    <CButton color="link" className="px-0">
                      Forgot password?
                    </CButton>
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default Login
