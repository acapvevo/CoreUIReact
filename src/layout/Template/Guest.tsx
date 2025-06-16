import { CContainer } from '@coreui/react'
import { Outlet } from 'react-router'

const Guest = () => {
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <Outlet />
      </CContainer>
    </div>
  )
}

export default Guest
