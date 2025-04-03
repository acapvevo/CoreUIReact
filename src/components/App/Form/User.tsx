import { useAppQuery } from '@/libs/react-query'
import { Form } from '@/types/form'
import { Role } from '@/types/models/role'
import { RolesInput, User, UserInput } from '@/types/models/user'
import { useEffect } from 'react'
import LoadingContent from '../Loading/Content'
import {
  CRow,
  CCol,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CFormLabel,
} from '@coreui/react'
import { FlagImage, defaultCountries, parseCountry, usePhoneInput } from 'react-international-phone'
import { Controller } from 'react-hook-form'
import 'react-international-phone/style.css'
import { useTranslation } from 'react-i18next'
import Select from '../Input/Select'

const UserForm = ({
  id,
  enabled,
  viewing,
  form: {
    register,
    reset,
    setValue,
    getValues,
    watch,
    control,
    formState: { errors },
  },
}: Form<UserInput & RolesInput>) => {
  const { t } = useTranslation()
  const { data: roles, isFetching: isRolesFetching } = useAppQuery<Role[]>({
    url: `/setting/role`,
    method: 'GET',
    queryKey: ['roles', 'form'],
    enabled: enabled,
  })
  const { data: user, isFetching } = useAppQuery<User>({
    queryKey: ['user', 'form', id],
    url: `/setting/user/${id}`,
    method: 'GET',
    enabled: !!id && !!roles && enabled,
  })
  const {
    inputValue,
    handlePhoneValueChange,
    country: currentCountry,
    setCountry,
  } = usePhoneInput({
    countries: defaultCountries,
    defaultCountry: getValues('phone_number.iso2') ?? 'my',
    value: getValues('phone_number.number') ?? undefined,
    onChange: (data) => {
      setValue('phone_number.number', data.phone)
      setValue('phone_number.iso2', data.country.iso2)
    },
  })

  useEffect(() => {
    if (user) {
      reset({ ...user, roles: user.role_names })
    }
  }, [user, isFetching])

  if (isFetching || isRolesFetching) return <LoadingContent />

  return (
    <CRow lg={{ gutterX: 2, gutterY: 2 }}>
      <CCol lg={6}>
        <CFormInput
          label={t('username')}
          type="text"
          id="username"
          invalid={!!errors.username}
          feedbackInvalid={errors.username?.message}
          {...register('username', { disabled: viewing })}
        />
      </CCol>
      <CCol lg={6}>
        <Controller
          name="roles"
          disabled={viewing}
          control={control}
          render={({
            field: { onChange, disabled, value, name, onBlur, ref },
            formState: { errors },
          }) => {
            return (
              <>
                <CFormLabel htmlFor="roles">{t('roles')}</CFormLabel>
                <Select
                  async={false}
                  id="roles"
                  name={name}
                  classNames={{
                    menu: () => 'z-3',
                  }}
                  isMulti
                  onChange={(selections) =>
                    onChange(selections.map((selection) => selection.value))
                  }
                  onBlur={onBlur}
                  ref={ref}
                  isDisabled={disabled}
                  isLoading={isRolesFetching}
                  options={roles?.map((role) => {
                    return {
                      value: role.name,
                      label: role.name,
                    }
                  })}
                  value={value.map((role) => {
                    return {
                      value: role,
                      label: role,
                    }
                  })}
                />
                {errors.roles?.message && (
                  <div className="invalid-feedback">{errors.roles.message}</div>
                )}
              </>
            )
          }}
        />
      </CCol>
      <CCol lg={6}>
        <CFormInput
          label={t('name')}
          type="text"
          id="name"
          invalid={!!errors.name}
          feedbackInvalid={errors.name?.message}
          {...register('name', { disabled: viewing })}
        />
      </CCol>
      <CCol lg={6}>
        <CFormSelect
          label={t('gender')}
          id="gender"
          invalid={!!errors.gender}
          feedbackInvalid={errors.gender?.message}
          {...register('gender', { disabled: viewing })}
          options={[
            { label: t('male'), value: 'M' },
            { label: t('female'), value: 'F' },
          ]}
        />
      </CCol>
      <CCol lg={6}>
        <CFormInput
          label={t('email_address')}
          type="email"
          id="email"
          invalid={!!errors['email']}
          feedbackInvalid={errors['email']?.message}
          {...register('email', {
            disabled: viewing,
          })}
        />
      </CCol>
      <CCol lg={6}>
        <CFormLabel htmlFor="phone_number">{t('phone_number')}</CFormLabel>
        <CInputGroup size="sm" id="phone_number">
          <CDropdown variant="input-group" direction="dropend">
            <CDropdownToggle color="secondary" variant="outline">
              <FlagImage iso2={watch('phone_number.iso2') ?? 'my'} />
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
            type="tel"
            value={inputValue}
            invalid={!!errors.phone_number}
            feedbackInvalid={errors.phone_number?.message}
            {...register('phone_number.number', {
              onChange: handlePhoneValueChange,
              disabled: viewing,
            })}
          />
        </CInputGroup>
      </CCol>
      <CCol lg={12}>
        <CFormInput
          label={t('address', { num: 1 })}
          type="text"
          id="address_1"
          invalid={!!errors.address?.line_1}
          feedbackInvalid={errors.address?.line_1?.message}
          {...register('address.line_1', { disabled: viewing })}
        />
      </CCol>
      <CCol lg={6}>
        <CFormInput
          label={t('address', { num: 2 })}
          type="text"
          id="address_2"
          invalid={!!errors.address?.line_2}
          feedbackInvalid={errors.address?.line_2?.message}
          {...register('address.line_2', { disabled: viewing })}
        />
      </CCol>
      <CCol lg={6}>
        <CFormInput
          label={t('address', { num: 3 })}
          type="text"
          id="address_3"
          invalid={!!errors.address?.line_3}
          feedbackInvalid={errors.address?.line_3?.message}
          {...register('address.line_3', { disabled: viewing })}
        />
      </CCol>
      <CCol lg={6}>
        <CFormInput
          label={t('postcode')}
          type="text"
          id="postcode"
          invalid={!!errors.address?.postcode}
          feedbackInvalid={errors.address?.postcode?.message}
          {...register('address.postcode', { disabled: viewing })}
        />
      </CCol>
      <CCol lg={6}>
        <CFormInput
          label={t('city')}
          type="text"
          id="city"
          invalid={!!errors.address?.city}
          feedbackInvalid={errors.address?.city?.message}
          {...register('address.city', { disabled: viewing })}
        />
      </CCol>
      <CCol lg={6}>
        <CFormInput
          label={t('state')}
          type="text"
          id="state"
          invalid={!!errors.address?.state}
          feedbackInvalid={errors.address?.state?.message}
          {...register('address.state', { disabled: viewing })}
        />
      </CCol>
      <CCol lg={6}>
        <CFormSelect
          label={t('country')}
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
          {...register('address.country', { disabled: viewing })}
        />
      </CCol>
    </CRow>
  )
}

export default UserForm
