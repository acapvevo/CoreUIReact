import { useEffect, useMemo, useState } from 'react'
import RoleListing from '@/components/App/Listing/Role'
import { SubmitHandler, useForm } from 'react-hook-form'
import { RoleInput, RoleScheme } from '@/types/models/role'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppMutation } from '@/libs/react-query'
import { CButton } from '@coreui/react'
import Modal from '@/components/App/Modal'
import LoadingButton from '@/components/App/Loading/Button'
import RoleForm from '@/components/App/Form/Role'
import { useOutletContext } from 'react-router-dom'
import { UseState } from '@/types/store'
import useNav from '@/hooks/nav'

const Role = () => {
  useNav(1)
  const [counter, setCounter] = useState(0)
  const [visible, setVisible] = useState(false)
  const [id, setID] = useState<number>()
  const [viewing, setViewing] = useState(false)
  const defaultValue = {
    name: '',
    permissions: [],
  }
  const onClose = () => {
    setCounter(counter + 1)
    setVisible(false)
    setID(undefined)
    reset(defaultValue)
  }
  const form = useForm<RoleInput>({
    defaultValues: defaultValue,
    resolver: zodResolver(RoleScheme),
  })
  const { mutateAsync, isPending } = useAppMutation<RoleInput, {}>({
    url: '/setting/role' + (!!id ? `/${id}` : ''),
    method: !!id ? 'PATCH' : 'POST',
    success: () => {
      onClose()
    },
  })
  const { handleSubmit, reset } = form
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
      <RoleListing
        counter={counter}
        setID={setID}
        setViewing={setViewing}
        setVisible={setVisible}
      />
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
        <RoleForm viewing={viewing} id={id} enabled={visible} form={form} />
      </Modal>
    </>
  )
}

export default Role
