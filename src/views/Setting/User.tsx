import { useMemo, useState } from 'react'
import { Gender, RolesInput, RolesScheme, UserInput, UserSchema } from '@/types/models/user'
import UserListing from '@/components/App/Listing/User'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppMutation } from '@/libs/react-query'
import { CButton } from '@coreui/react'
import Modal from '@/components/App/Modal'
import LoadingButton from '@/components/App/Loading/Button'
import UserForm from '@/components/App/Form/User'
import useNav from '@/hooks/nav'

const User = () => {
  useNav(2)
  const [counter, setCounter] = useState(0)
  const [visible, setVisible] = useState(false)
  const [id, setID] = useState<number>()
  const [viewing, setViewing] = useState(false)
  const defaultValue = useMemo<UserInput & RolesInput>(() => {
    return {
      name: '',
      gender: Gender.MALE,
      email: '',
      username: '',
      address: {
        line_1: '',
        line_2: '',
        line_3: '',
        postcode: '',
        city: '',
        state: '',
        country: '',
      },
      phone_number: {
        number: '+60',
        iso2: 'my',
      },
      roles: [],
    }
  }, [])
  const onClose = () => {
    setCounter(counter + 1)
    setVisible(false)
    setID(undefined)
    reset(defaultValue)
  }
  const form = useForm<UserInput & RolesInput>({
    defaultValues: defaultValue,
    resolver: zodResolver(UserSchema.partial().and(RolesScheme)),
  })
  const { mutateAsync, isPending } = useAppMutation<UserInput & RolesInput, {}>({
    url: '/setting/user' + (!!id ? `/${id}` : ''),
    method: !!id ? 'PATCH' : 'POST',
    success: () => {
      onClose()
    },
  })
  const { handleSubmit, reset } = form
  const onClickSave = handleSubmit(async (data) => {
    await mutateAsync(data)
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
      <UserListing
        counter={counter}
        setID={setID}
        setViewing={setViewing}
        setVisible={setVisible}
      />
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
        <UserForm viewing={viewing} id={id} enabled={visible} form={form} />
      </Modal>
    </>
  )
}

export default User
