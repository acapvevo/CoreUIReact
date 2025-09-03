import LoadingContent from '@/components/App/Loading/Content'
import { useAppMutation, useAppQuery } from '@/libs/react-query'
import { ModalProps } from '@/types/components/modal'
import {
  Gender,
  PasswordInput,
  PasswordScheme,
  User,
  UserInput,
  UserSchema,
  UserSession,
} from '@/types/models/user'
import { CButton, CCard, CCardBody, CCol, CFormInput, CImage, CRow } from '@coreui/react'
import { useEffect, useRef, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Modal from '@/components/App/Modal'
import ProfileForm from '@/components/App/Form/Profile'
import LoadingButton from '@/components/App/Loading/Button'
import Password from '@/components/App/Form/Password'
import { useTranslation } from 'react-i18next'
import { useSessionStorage } from '@uidotdev/usehooks'
import { UpdateProfileFormControl } from '@/utils/form'
import useAppAuth from '@/hooks/auth'

const UpdatePasswordModal = (props: ModalProps) => {
  const { t } = useTranslation()
  const { onClose } = props
  const form = useForm<PasswordInput>({
    defaultValues: {
      password: '',
      password_confirmation: '',
    },
    resolver: zodResolver(PasswordScheme),
  })
  const { handleSubmit } = form
  const { isPending, mutateAsync } = useAppMutation<PasswordInput>({
    url: '/profile/password',
    method: 'POST',
    success: () => {
      onClose && onClose()
    },
  })

  const save: SubmitHandler<PasswordInput> = async (data) => {
    await mutateAsync(data)
  }

  return (
    <Modal
      {...props}
      title={t('change_password')}
      footer={
        <LoadingButton
          text={t('save')}
          loadingText={`${t('saving')}...`}
          processing={isPending}
          color="primary"
          onClick={handleSubmit(save)}
        />
      }
    >
      <Password form={form} />
    </Modal>
  )
}

const UpdateProfilePicturedModal = (props: ModalProps) => {
  const { t } = useTranslation()
  const { onClose, visible } = props
  const imgRef = useRef<HTMLImageElement>(null)
  const [imgPreview, setImgPreview] = useState<string | undefined>()
  const { handleSubmit, control } = useForm<{ files: FileList }>()
  const { session } = useAppAuth()
  const [, setUser] = useSessionStorage(`${import.meta.env.VITE_APP_NAME}_user`, session)
  const { isPending, mutate } = useAppMutation<FormData, UserSession>({
    url: '/profile/picture',
    method: 'POST',
    success: (data) => {
      setUser(data)
      onClose && onClose()
      window.location.reload()
    },
  })
  const { data, isFetching } = useAppQuery<User>({
    url: '/profile',
    method: 'GET',
    enabled: visible,
    queryKey: ['profile', 'picture'],
  })

  useEffect(() => {
    if (imgRef.current && data) imgRef.current.src = imgPreview ? imgPreview : data.profile_picture
  }, [imgPreview, data])

  return (
    <Modal
      {...props}
      title={t('upload_profile_picture')}
      footer={
        <LoadingButton
          color="primary"
          onClick={handleSubmit(
            (data) => {
              const payload = new FormData()
              payload.append('profile_picture', data.files[0])

              mutate(payload)
            },
            (errors) => console.log(errors),
          )}
          processing={isPending}
          text={t('save')}
          loadingText={`${t('saving')}...`}
        />
      }
    >
      {!data || isFetching ? (
        <LoadingContent />
      ) : (
        <>
          <div className="d-flex justify-content-center">
            <CImage
              ref={imgRef}
              className="py-3"
              width={200}
              height={200}
              rounded
              onLoad={() => {
                imgPreview && URL.revokeObjectURL(imgPreview)
              }}
            />
          </div>
          <Controller
            control={control}
            name="files"
            render={({ field: { onChange, value, ...field }, fieldState: { error } }) => {
              return (
                <CFormInput
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files) {
                      onChange(e.target.files)
                      setImgPreview(URL.createObjectURL(e.target.files[0]))
                    }
                  }}
                  {...field}
                  invalid={!!error}
                  feedbackInvalid={error?.message}
                />
              )
            }}
          />
        </>
      )}
    </Modal>
  )
}

const UpdateProfileModal = (props: ModalProps) => {
  const { t } = useTranslation()
  const { onClose, visible } = props
  const { handleSubmit } = useForm({
    formControl: UpdateProfileFormControl.formControl,
  })
  const { session } = useAppAuth()
  const [, setUser] = useSessionStorage(`${import.meta.env.VITE_APP_NAME}_user`, session)
  const { mutate, isPending } = useAppMutation<UserInput, UserSession>({
    url: '/profile',
    method: 'PATCH',
    success: (data) => {
      setUser(data)
      onClose && onClose()
      window.location.reload()
    },
  })

  return (
    <Modal
      {...props}
      title={t('update_profile')}
      footer={
        <LoadingButton
          text={t('save')}
          loadingText={`${t('saving')}...`}
          color="primary"
          processing={isPending}
          onClick={handleSubmit((user) => {
            mutate(user)
          })}
        />
      }
    >
      <ProfileForm enabled={visible} />
    </Modal>
  )
}

const GetGender = (genderCode?: Gender) => {
  switch (genderCode) {
    case Gender.MALE:
      return 'Male'
    case Gender.FEMALE:
      return 'Female'
    default:
      return ''
  }
}

const Profile = () => {
  const { t } = useTranslation()
  const { data, refetch, isFetching } = useAppQuery<User>({
    url: `/profile`,
    queryKey: ['profile'],
    method: 'GET',
  })

  const [updateProfileModalVisible, setUpdateProfileModalVisible] = useState(false)
  const [updateProfilePictureModalVisible, setUpdateProfilePictureModal] = useState(false)
  const [updatePasswordModalVisible, setUpdatePasswordModal] = useState(false)

  return (
    <>
      <CCard>
        <CCardBody>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end pb-3">
            <CButton color="primary" onClick={() => setUpdatePasswordModal(true)}>
              {t('change_password')}
            </CButton>
            <CButton color="primary" onClick={() => setUpdateProfileModalVisible(true)}>
              {t('update_profile')}
            </CButton>
          </div>
          {isFetching ? (
            <LoadingContent />
          ) : (
            <CRow>
              <CCol>
                <div className="text-center">
                  <CImage rounded src={data?.profile_picture} width={200} height={200} />
                </div>
                <div className="text-center py-3">
                  <CButton color="primary" onClick={() => setUpdateProfilePictureModal(true)}>
                    {t('edit_picture')}
                  </CButton>
                </div>
              </CCol>
              <CCol lg={9}>
                <CRow lg={{ gutter: 3 }}>
                  <CCol sm={3}>{t('name')}:</CCol>
                  <CCol sm={9}>{data?.name}</CCol>
                  <CCol sm={3}>{t('gender')}:</CCol>
                  <CCol sm={9}>{GetGender(data?.gender)}</CCol>
                  <CCol sm={3}>{t('email_address')}:</CCol>
                  <CCol sm={9}>{data?.email}</CCol>
                  <CCol sm={3}>{t('phone_number')}:</CCol>
                  <CCol sm={9}>{data?.phone_number.number}</CCol>
                  <CCol sm={3}>{t('address', { num: '' })}:</CCol>
                  <CCol sm={9}>
                    {data?.address.line_1}, <br /> {data?.address.line_2}, <br />
                    {data?.address.line_3}, <br />
                    {data?.address.postcode} {data?.address.city}, <br />
                    {data?.address.state}, {data?.address.country} <br />
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
          )}
        </CCardBody>
      </CCard>

      <UpdateProfileModal
        visible={updateProfileModalVisible}
        onClose={() => {
          refetch()
          setUpdateProfileModalVisible(false)
        }}
      />

      <UpdateProfilePicturedModal
        visible={updateProfilePictureModalVisible}
        onClose={() => {
          setUpdateProfilePictureModal(false)
          refetch()
        }}
      />

      <UpdatePasswordModal
        visible={updatePasswordModalVisible}
        onClose={() => {
          setUpdatePasswordModal(false)
        }}
      />
    </>
  )
}

export default Profile
