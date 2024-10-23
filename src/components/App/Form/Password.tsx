import { PasswordInput } from '@/types/user'
import { CCol, CFormInput, CRow } from '@coreui/react'
import { UseFormReturn } from 'react-hook-form'

const Password = ({
  form: {
    register,
    formState: { errors },
  },
}: {
  form: UseFormReturn<PasswordInput>
}) => {
  return (
    <CRow lg={{ gutterY: 3 }}>
      <CCol>
        <CFormInput
          floatingLabel="Password"
          id="password"
          type='password'
          placeholder='Enter your new Password'
          invalid={!!errors.password}
          feedbackInvalid={errors.password?.message}
          {...register('password')}
        />
      </CCol>
      <CCol>
        <CFormInput
          floatingLabel="Password Confirmation"
          id="password_confirmation"
          type='password'
          placeholder='Enter your new Password again'
          invalid={!!errors.password_confirmation}
          feedbackInvalid={errors.password_confirmation?.message}
          {...register('password_confirmation')}
        />
      </CCol>
    </CRow>
  )
}

export default Password