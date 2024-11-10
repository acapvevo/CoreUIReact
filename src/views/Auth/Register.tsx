import { useAppMutation } from '@/libs/react-query'
import { CaptchaInput, CaptchaScheme } from '@/types/captcha'
import {
  Gender,
  PasswordInput,
  PasswordScheme,
  RegistrationInput,
  RegistrationScheme,
  UserToken,
} from '@/types/models/user'
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CForm,
  CInputGroup,
  CInputGroupText,
  CFormInput,
  CFormSelect,
  CCardFooter,
} from '@coreui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import ReCAPTCHA from 'react-google-recaptcha'
import { Icon } from '@iconify/react'
import LoadingButton from '@/components/App/Loading/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import useAuth from '@/hooks/auth'

const Register = () => {
  const { login } = useAuth()
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationInput & PasswordInput & CaptchaInput>({
    defaultValues: {
      name: '',
      email: '',
      gender: undefined,
      password: '',
      password_confirmation: '',
      isCaptcha: false,
    },
    resolver: zodResolver(RegistrationScheme.and(PasswordScheme).and(CaptchaScheme)),
  })
  const { isPending, mutate } = useAppMutation<RegistrationInput & PasswordInput, UserToken>({
    url: '/register',
    method: 'POST',
    success: (data) => {
      login(data)
    },
  })

  const save: SubmitHandler<RegistrationInput & PasswordInput & CaptchaInput> = (data) => {
    mutate(data)
  }

  return (
    <CRow className="justify-content-center">
      <CCol md={10} lg={8} xl={6}>
        <CCard className="mx-4">
          <CCardBody className="p-4">
            <CForm onSubmit={handleSubmit(save)}>
              <h1>Registration</h1>
              <p className="text-body-secondary">Create your account</p>
              <CRow lg={{ gutter: 2 }}>
                <CInputGroup className="col-lg-6">
                  <CInputGroupText>
                    <Icon icon="openmoji:european-name-badge" />
                  </CInputGroupText>
                  <CFormInput
                    type="text"
                    placeholder="Name"
                    autoComplete="name"
                    {...register('name')}
                    invalid={!!errors.name}
                    feedbackInvalid={errors.name?.message}
                  />
                </CInputGroup>
                <CInputGroup className="col-lg-6">
                  <CInputGroupText>
                    <Icon icon="icons8:gender" />
                  </CInputGroupText>
                  <CFormSelect
                    id="gender"
                    options={[
                      {
                        label: 'Please Select Your Gender',
                        value: '',
                      },
                      {
                        label: 'Male',
                        value: Gender.MALE,
                      },
                      {
                        label: 'Female',
                        value: Gender.FEMALE,
                      },
                    ]}
                    {...register('gender')}
                    invalid={!!errors.gender}
                    feedbackInvalid={errors.gender?.message}
                  />
                </CInputGroup>
                <CInputGroup className="col-lg-6">
                  <CInputGroupText>
                    <Icon icon="mdi:email" />
                  </CInputGroupText>
                  <CFormInput
                    type="email"
                    placeholder="Email Address"
                    autoComplete="email"
                    {...register('email')}
                    invalid={!!errors.email}
                    feedbackInvalid={errors.email?.message}
                  />
                </CInputGroup>
                <CInputGroup className="col-lg-6">
                  <CInputGroupText>
                    <Icon icon="mdi:user" />
                  </CInputGroupText>
                  <CFormInput
                    type="text"
                    placeholder="Username"
                    autoComplete="username"
                    {...register('username')}
                    invalid={!!errors.username}
                    feedbackInvalid={errors.username?.message}
                  />
                </CInputGroup>
                <CInputGroup className="col-lg-6">
                  <CInputGroupText>
                    <Icon icon="mdi:password" />
                  </CInputGroupText>
                  <CFormInput
                    type="password"
                    placeholder="Password"
                    autoComplete="new-password"
                    {...register('password')}
                    invalid={!!errors.password}
                    feedbackInvalid={errors.password?.message}
                  />
                </CInputGroup>
                <CInputGroup className="col-lg-6">
                  <CInputGroupText>
                    <Icon icon="mdi:password-outline" />
                  </CInputGroupText>
                  <CFormInput
                    type="password"
                    placeholder="Repeat password"
                    autoComplete="new-password"
                    {...register('password_confirmation')}
                    invalid={!!errors.password_confirmation}
                    feedbackInvalid={errors.password_confirmation?.message}
                  />
                </CInputGroup>
              </CRow>
              <div className="my-3">
                <ReCAPTCHA
                  className="d-flex justify-content-center"
                  sitekey={import.meta.env.VITE_GOOGLE_RECAPTCHA_SITE_KEY}
                  onChange={(token) => setValue('isCaptcha', !!token)}
                />
                <p className="invalid-feedback d-block text-center">{errors.isCaptcha?.message}</p>
              </div>
              <div className="d-grid">
                <LoadingButton
                  type="submit"
                  text="Register"
                  loadingText="Registering..."
                  processing={isPending}
                  color="success"
                />
              </div>
            </CForm>
          </CCardBody>
          <CCardFooter className='d-flex justify-content-center'>
            Have an account?&nbsp;<a href='/Auth/Login'>Login Here</a>
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Register
