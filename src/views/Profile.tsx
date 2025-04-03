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
} from '@/types/models/user'
import { CButton, CCard, CCardBody, CCol, CFormInput, CImage, CRow } from '@coreui/react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Modal from '@/components/App/Modal'
import ProfileForm from '@/components/App/Form/Profile'
import LoadingButton from '@/components/App/Loading/Button'
import { UploadFileInput } from '@/types/forms/uploadFile'
import UploadFile from '@/components/App/Form/UploadFile'
import { Alert } from '@/libs/sweet-alert2'
import Password from '@/components/App/Form/Password'
import { useTranslation } from 'react-i18next'

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
  const { isPending, mutateAsync } = useAppMutation<PasswordInput, Alert>({
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
  const [imgPreview, setImgPreview] = useState('')
  const form = useForm<UploadFileInput>({
    defaultValues: {
      files: [],
    },
  })
  const { handleSubmit, setValue } = form
  const { isPending, mutateAsync } = useAppMutation<FormData, { user: User }>({
    url: '/profile/picture',
    method: 'POST',
    success: (data) => {
      localStorage.setItem(`${import.meta.env.VITE_APP_NAME}_auth_state`, JSON.stringify(data.user))
      onClose && onClose()
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

  const save: SubmitHandler<UploadFileInput> = async (profile) => {
    const payload = new FormData()
    payload.append('profile_picture', profile.files[0])

    await mutateAsync(payload)
  }

  const Content = () => {
    if (!data || isFetching) return <LoadingContent />

    return (
      <>
        <div className="d-flex justify-content-center">
          <CImage
            ref={imgRef}
            className="py-3"
            width={200}
            height={200}
            rounded
            onLoad={() => {
              URL.revokeObjectURL(imgPreview)
            }}
          />
        </div>
        <UploadFile
          form={form}
          needList={false}
          options={{
            multiple: false,
            onDrop: (acceptedFiles) => {
              setValue('files', acceptedFiles)
              setImgPreview(URL.createObjectURL(acceptedFiles[0]))
            },
          }}
        />
      </>
    )
  }

  return (
    <Modal
      {...props}
      title={t('upload_profile_picture')}
      footer={
        <LoadingButton
          color="primary"
          onClick={handleSubmit(save)}
          processing={isPending}
          text={t('save')}
          loadingText={`${t('saving')}...`}
        />
      }
    >
      <Content />
    </Modal>
  )
}

const UpdateProfileModal = (props: ModalProps) => {
  const { t } = useTranslation()
  const { onClose, visible } = props
  const form = useForm<UserInput>({
    resolver: zodResolver(UserSchema),
  })
  const { handleSubmit } = form
  const { mutateAsync, isPending } = useAppMutation<UserInput, { user: User }>({
    url: '/profile',
    method: 'PATCH',
    success: (data) => {
      localStorage.setItem(`${import.meta.env.VITE_APP_NAME}_auth_state`, JSON.stringify(data.user))
      onClose && onClose()
    },
  })

  const save: SubmitHandler<UserInput> = async (user) => {
    await mutateAsync(user)
  }

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
          onClick={handleSubmit(save)}
        />
      }
    >
      <ProfileForm enabled={visible} form={form}></ProfileForm>
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

  const ProfileData = useMemo(() => {
    if (isFetching) return <LoadingContent />
    return (
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
    )
  }, [data, isFetching])

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
          {ProfileData}
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
          window.location.reload()
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
