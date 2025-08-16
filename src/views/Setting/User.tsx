import { useState } from 'react'
import { UserInput } from '@/types/models/user'
import UserListing from '@/components/App/Listing/User'
import { useForm } from 'react-hook-form'
import { queryClient, useAppMutation } from '@/libs/react-query'
import { CButton } from '@coreui/react'
import Modal from '@/components/App/Modal'
import LoadingButton from '@/components/App/Loading/Button'
import UserForm from '@/components/App/Form/User'
import useNav from '@/hooks/nav'
import { UserDefaultValues, UserFormControl } from '@/utils/form'
import { invalidateGetUserListing } from '@/utils/query'

const User = () => {
  useNav(2)
  const [visible, setVisible] = useState(false)
  const [id, setID] = useState<number>()
  const [viewing, setViewing] = useState(false)
  const onClose = () => {
    invalidateGetUserListing()
    setVisible(false)
    setID(undefined)
    reset(UserDefaultValues)
  }
  const { handleSubmit, reset } = useForm({
    formControl: UserFormControl.formControl,
  })
  const { mutate, isPending } = useAppMutation<UserInput, {}>({
    url: '/setting/user' + (!!id ? `/${id}` : ''),
    method: !!id ? 'PATCH' : 'POST',
    success: () => {
      onClose()
    },
  })
  const onClickSave = handleSubmit((data) => {
    mutate(data)
  })

  return (
    <>
      <div className="pb-3 d-grid gap-2 d-md-flex justify-content-md-end">
        <CButton
          color="primary"
          onClick={() => {
            setViewing(false)
            setVisible(true)
          }}
        >
          Add User
        </CButton>
      </div>
      <UserListing setID={setID} setViewing={setViewing} setVisible={setVisible} />
      <Modal
        visible={visible}
        onClose={onClose}
        title={viewing ? 'View User' : !!id ? 'Edit User' : 'Create User'}
        footer={
          !viewing && (
            <>
              <CButton color="secondary" onClick={() => reset()}>
                Reset
              </CButton>
              <LoadingButton
                color="primary"
                text="Save"
                loadingText="Saving..."
                processing={isPending}
                onClick={onClickSave}
              />
            </>
          )
        }
      >
        <UserForm viewing={viewing} id={id} enabled={visible} />
      </Modal>
    </>
  )
}

export default User
