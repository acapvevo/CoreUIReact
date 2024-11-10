import { useAppQuery } from '@/libs/react-query'
import { User, UserInput } from '@/types/models/user'
import {
  CRow,
  CCol,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { usePhoneInput, defaultCountries, parseCountry, FlagImage } from 'react-international-phone'
import LoadingContent from '../Loading/Content'
import 'react-international-phone/style.css'

const Profile = ({
  enabled,
  form: {
    register,
    setValue,
    reset,
    formState: { errors },
    watch,
    getValues,
  },
}: {
  enabled: boolean
  form: UseFormReturn<UserInput>
}) => {
  const { data, isLoading } = useAppQuery<User>({
    url: `/profile`,
    queryKey: ['profile', 'update'],
    method: 'GET',
    enabled: enabled,
  })
  const {
    inputValue,
    handlePhoneValueChange,
    country: currentCountry,
    setCountry,
  } = usePhoneInput({
    countries: defaultCountries,
    defaultCountry: getValues('phone_number.iso2') || undefined,
    value: getValues('phone_number.number') || undefined,
    onChange: (data) => {
      setValue('phone_number.number', data.phone)
      setValue('phone_number.iso2', data.country.iso2)
    },
  })

  useEffect(() => {
    if (data) {
      reset({ ...data })
    }
  }, [data, enabled])

  if (isLoading) return <LoadingContent />

  return (
    <CRow lg={{ gutterX: 2, gutterY: 2 }}>
      <CCol lg={6}>
        <CFormInput
          floatingLabel="Name"
          type="text"
          id="name"
          invalid={!!errors.name}
          feedbackInvalid={errors.name?.message}
          {...register('name')}
        />
      </CCol>
      <CCol lg={6}>
        <CFormSelect
          floatingLabel="Gender"
          id="gender"
          invalid={!!errors.gender}
          feedbackInvalid={errors.gender?.message}
          {...register('gender')}
          options={[
            { label: 'Male', value: 'M' },
            { label: 'Female', value: 'F' },
          ]}
        />
      </CCol>
      <CCol lg={6}>
        <CFormInput
          floatingLabel="Email"
          type="email"
          id="email"
          invalid={!!errors['email']}
          feedbackInvalid={errors['email']?.message}
          {...register('email')}
        />
      </CCol>
      <CCol lg={6}>
        <CInputGroup>
          <CDropdown variant="input-group" direction="dropend">
            <CDropdownToggle color="secondary" variant="outline">
              <FlagImage iso2={watch('phone_number.iso2')} />
            </CDropdownToggle>
            <CDropdownMenu className="overflow-auto" style={{ height: '300px' }}>
              {defaultCountries.map((c) => {
                const country = parseCountry(c)
                return (
                  <CDropdownItem
                    key={country.iso2}
                    onClick={() => setCountry(country.iso2)}
                    active={country.iso2 === currentCountry.iso2}
                  >
                    <FlagImage iso2={country.iso2} />
                    <span className="ms-2">{country.name}</span>
                  </CDropdownItem>
                )
              })}
            </CDropdownMenu>
          </CDropdown>
          <CFormInput
            floatingLabel="Phone Number"
            type="tel"
            value={inputValue}
            invalid={!!errors.phone_number}
            feedbackInvalid={errors.phone_number?.message}
            {...register('phone_number', { onChange: handlePhoneValueChange })}
          />
        </CInputGroup>
      </CCol>
      <CCol lg={12}>
        <CFormInput
          floatingLabel="Address 1"
          type="text"
          id="address_1"
          invalid={!!errors.address?.line_1}
          feedbackInvalid={errors.address?.line_1?.message}
          {...register('address.line_1')}
        />
      </CCol>
      <CCol lg={6}>
        <CFormInput
          floatingLabel="Address 2"
          type="text"
          id="address_2"
          invalid={!!errors.address?.line_2}
          feedbackInvalid={errors.address?.line_2?.message}
          {...register('address.line_2')}
        />
      </CCol>
      <CCol lg={6}>
        <CFormInput
          floatingLabel="Address 3"
          type="text"
          id="address_3"
          invalid={!!errors.address?.line_3}
          feedbackInvalid={errors.address?.line_3?.message}
          {...register('address.line_3')}
        />
      </CCol>
      <CCol lg={6}>
        <CFormInput
          floatingLabel="Postcode"
          type="text"
          id="postcode"
          invalid={!!errors.address?.postcode}
          feedbackInvalid={errors.address?.postcode?.message}
          {...register('address.postcode')}
        />
      </CCol>
      <CCol lg={6}>
        <CFormInput
          floatingLabel="City"
          type="text"
          id="city"
          invalid={!!errors.address?.city}
          feedbackInvalid={errors.address?.city?.message}
          {...register('address.city')}
        />
      </CCol>
      <CCol lg={6}>
        <CFormInput
          floatingLabel="State"
          type="text"
          id="state"
          invalid={!!errors.address?.state}
          feedbackInvalid={errors.address?.state?.message}
          {...register('address.state')}
        />
      </CCol>
      <CCol lg={6}>
        <CFormSelect
          floatingLabel="Country"
          id="country"
          options={defaultCountries.map((c) => {
            const country = parseCountry(c)
            return {
              label: country.name,
              value: country.name,
            }
          })}
          invalid={!!errors.address?.country}
          feedbackInvalid={errors.address?.country?.message}
          {...register('address.country')}
        />
      </CCol>
    </CRow>
  )
}

export default Profile
