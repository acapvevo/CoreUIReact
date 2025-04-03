import { PasswordInput } from '@/types/models/user'
import { CCol, CFormInput, CRow } from '@coreui/react'
import { UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

const Password = ({
  form: {
    register,
    formState: { errors },
  },
}: {
  form: UseFormReturn<PasswordInput>
}) => {
  const { t } = useTranslation()

  return (
    <CRow lg={{ gutterY: 3 }}>
      <CCol>
        <CFormInput
          floatingLabel={t('password')}
          id="password"
          type="password"
          placeholder={t('enter_your_new_password')}
          invalid={!!errors.password}
          feedbackInvalid={errors.password?.message}
          {...register('password')}
        />
      </CCol>
      <CCol>
        <CFormInput
          floatingLabel={t('password_confirmation')}
          id="password_confirmation"
          type="password"
          placeholder={t('enter_your_new_password_again')}
          invalid={!!errors.password_confirmation}
          feedbackInvalid={errors.password_confirmation?.message}
          {...register('password_confirmation')}
        />
      </CCol>
    </CRow>
  )
}

export default Password
