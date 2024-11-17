import RoleForm from '@/components/App/Form/Role'
import UserForm from '@/components/App/Form/User'
import RoleListing from '@/components/App/Listing/Role'
import UserListing from '@/components/App/Listing/User'
import LoadingButton from '@/components/App/Loading/Button'
import Modal from '@/components/App/Modal'
import { useAppMutation } from '@/libs/react-query'
import { RoleInput, RoleScheme } from '@/types/models/role'
import {
  Gender,
  RolesInput,
  RolesScheme,
  UserInput,
  UserSchema,
} from '@/types/models/user'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
} from '@coreui/react'
import { CNavLinkProps } from '@coreui/react/dist/esm/components/nav/CNavLink'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AllowedAccess } from 'react-permission-role'
import { HasAccessProps } from 'react-permission-role/dist/components/AllowedAccess'

interface SettingContentProps {
  enabled: boolean
}

const RoleContent = ({ enabled }: {} & SettingContentProps) => {
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
  const listing = useMemo(() => {
    return (
      <RoleListing
        counter={counter}
        setID={setID}
        setViewing={setViewing}
        setVisible={setVisible}
      />
    )
  }, [counter])
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
      {listing}
      <Modal
        visible={visible}
        onClose={onClose}
        title={viewing ? 'View Role' : !!id ? 'Edit Role' : 'Create Role'}
        body={<RoleForm viewing={viewing} id={id} enabled={enabled} form={form} />}
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
      />
    </>
  )
}

const UserContent = ({ enabled }: {} & SettingContentProps) => {
  const [counter, setCounter] = useState(0)
  const [visible, setVisible] = useState(false)
  const [id, setID] = useState<number>()
  const [viewing, setViewing] = useState(false)
  const defaultValue: UserInput & RolesInput = {
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
      number: '',
      iso2: '',
    },
    roles: [],
  }
  const onClose = () => {
    setCounter(counter + 1)
    setVisible(false)
    setID(undefined)
    reset(defaultValue)
  }
  const listing = useMemo(() => {
    return (
      <UserListing
        counter={counter}
        setID={setID}
        setViewing={setViewing}
        setVisible={setVisible}
      />
    )
  }, [counter])
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
      {listing}
      <Modal
        visible={visible}
        onClose={onClose}
        title={viewing ? 'View User' : !!id ? 'Edit User' : 'Create User'}
        body={<UserForm viewing={viewing} id={id} enabled={enabled} form={form} />}
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
      />
    </>
  )
}

const tabs = [
  {
    name: 'Role Management',
    permissions: ['roles'],
    content: (props: SettingContentProps) => {
      return <RoleContent {...props} />
    },
  },
  {
    name: 'User Management',
    permissions: ['users'],
    content: (props: SettingContentProps) => {
      return <UserContent {...props} />
    },
  },
]

const NavItem = ({
  permissions,
  title,
  ...props
}: { title: string } & HasAccessProps & CNavLinkProps) => {
  return (
    <AllowedAccess permissions={permissions}>
      <CNavItem>
        <CNavLink {...props}>{title}</CNavLink>
      </CNavItem>
    </AllowedAccess>
  )
}

const System = () => {
  const [activeKey, setActiveKey] = useState(-1)

  return (
    <CCard>
      <CCardHeader>
        <CNav variant="pills" role="tablist">
          {tabs.map((tab, index) => (
            <NavItem
              key={index}
              title={tab.name}
              permissions={tab.permissions}
              active={activeKey === index}
              onClick={() => setActiveKey(index)}
            />
          ))}
        </CNav>
      </CCardHeader>
      <CCardBody>
        <CTabContent>
          <CTabPane
            visible={activeKey === -1}
            role="tabpanel"
            aria-labelledby={`${-1}_tab`}
            className="text-center"
          >
            Please Choose Menu
          </CTabPane>
          {tabs.map((tab, index) => {
            const Content = tab.content
            return (
              <CTabPane
                key={index}
                role="tabpanel"
                aria-labelledby={`${index}_tab`}
                visible={activeKey === index}
              >
                <Content enabled={activeKey === index} />
              </CTabPane>
            )
          })}
        </CTabContent>
      </CCardBody>
    </CCard>
  )
}

export default System
