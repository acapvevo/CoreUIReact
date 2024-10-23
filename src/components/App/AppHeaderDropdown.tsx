import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilBell, cilSettings, cilAccountLogout, cilUser, cilBriefcase } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import useAuth from '@/hooks/auth'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import { User } from '@/types/user'
import { useNavigate } from 'react-router-dom'

const AppHeaderDropdown = () => {
  const { logout } = useAuth()
  const user = useAuthUser<User>()
  const navigate = useNavigate()

  return (
    <>
      <CDropdown variant="nav-item">
        <CDropdownToggle className="py-0 pe-0" caret={false}>
          <CAvatar src={user!['profile_picture']} size="md" shape="rounded-0" />
        </CDropdownToggle>
        <CDropdownMenu className="pt-0">
          <CDropdownItem href="#">
            <CIcon icon={cilBell} className="me-2" />
            Alerts
            <CBadge color="warning" className="ms-2">
              42
            </CBadge>
          </CDropdownItem>
          <CDropdownDivider />
          <CDropdownHeader>Settings</CDropdownHeader>
          <CDropdownItem as="button" onClick={() => navigate('/Setting/Profile')}>
            <CIcon icon={cilUser} className="me-2" />
            Profile
          </CDropdownItem>
          <CDropdownItem href="#">
            <CIcon icon={cilBriefcase} className="me-2" />
            System
          </CDropdownItem>
          <CDropdownDivider />
          <CDropdownItem as="button" onClick={() => logout()}>
            <CIcon icon={cilAccountLogout} className="me-2" />
            Log Out
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    </>
  )
}

export default AppHeaderDropdown
