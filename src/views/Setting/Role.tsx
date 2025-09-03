import { useState } from 'react'
import RoleListing from '@/components/App/Listing/Role'
import { SubmitHandler, useForm } from 'react-hook-form'
import { RoleInput } from '@/types/models/role'
import { queryClient, useAppMutation } from '@/libs/react-query'
import { CButton } from '@coreui/react'
import Modal from '@/components/App/Modal'
import LoadingButton from '@/components/App/Loading/Button'
import RoleForm from '@/components/App/Form/Role'
import useNav from '@/hooks/nav'
import { RoleDefaultValues, RoleFormControl } from '@/utils/form'
import { invalidateRole } from '@/utils/query'

const Role = () => {
  useNav(1)
  const [visible, setVisible] = useState(false)
  const [id, setID] = useState<number>()
  const [viewing, setViewing] = useState(false)
  const onClose = () => {
    invalidateRole()
    setVisible(false)
    setID(undefined)
    reset(RoleDefaultValues)
  }
  const { handleSubmit, reset } = useForm<RoleInput>({
    formControl: RoleFormControl,
  })
  const { mutateAsync, isPending } = useAppMutation<RoleInput, {}>({
    url: '/setting/role' + (!!id ? `/${id}` : ''),
    method: !!id ? 'PATCH' : 'POST',
    success: () => {
      onClose()
    },
  })
  const save: SubmitHandler<RoleInput> = async (data) => {
    await mutateAsync(data)
  }

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
          Add Role
        </CButton>
      </div>
      <RoleListing setID={setID} setViewing={setViewing} setVisible={setVisible} />
      <Modal
        visible={visible}
        onClose={onClose}
        title={viewing ? 'View Role' : !!id ? 'Edit Role' : 'Create Role'}
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
                onClick={handleSubmit(save)}
              />
            </>
          )
        }
      >
        <RoleForm viewing={viewing} id={id} enabled={visible} />
      </Modal>
    </>
  )
}

export default Role
