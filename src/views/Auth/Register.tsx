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
import useAppAuth from '@/hooks/auth'
import { useTranslation } from 'react-i18next'

const Register = () => {
  const { t } = useTranslation()
  const { login } = useAppAuth()
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<RegistrationInput & PasswordInput & CaptchaInput>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      isCaptcha: false,
    },
    resolver: zodResolver(RegistrationScheme.and(PasswordScheme).and(CaptchaScheme)),
  })
  const { isPending, mutate } = useAppMutation<RegistrationInput & PasswordInput, UserToken>({
    url: '/register',
    method: 'POST',
    success: () => {
      login({
        username: getValues('username'),
        password: getValues('password'),
        remember_me: false,
      })
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
              <h1>{t('registration')}</h1>
              <p className="text-body-secondary">{t('create_your_account')}</p>
              <CRow lg={{ gutter: 2 }}>
                <CInputGroup className="col-lg-6">
                  <CInputGroupText>
                    <Icon icon="openmoji:european-name-badge" />
                  </CInputGroupText>
                  <CFormInput
                    type="text"
                    placeholder={t('name')}
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
                        label: t('please_select_your_gender'),
                        value: '',
                      },
                      {
                        label: t('male'),
                        value: Gender.MALE,
                      },
                      {
                        label: t('female'),
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
                    placeholder={t('email_address')}
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
                    placeholder={t('username')}
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
                    placeholder={t('password')}
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
                    placeholder={t('repeat_password')}
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
                  onExpired={() => setValue('isCaptcha', false)}
                />
                <p className="invalid-feedback d-block text-center">{errors.isCaptcha?.message}</p>
              </div>
              <div className="d-grid">
                <LoadingButton
                  type="submit"
                  text={t('register')}
                  loadingText={`${t('registering')}...`}
                  processing={isPending}
                  color="success"
                />
              </div>
            </CForm>
          </CCardBody>
          <CCardFooter className="d-flex justify-content-center">
            {t('have_an_account?')}&nbsp;<a href="/Login">{t('login_here')}</a>
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Register
