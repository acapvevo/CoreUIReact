import {
  CCard,
  CCardBody,
  CCardHeader,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
} from '@coreui/react'
import { useState } from 'react'
import { NavsProps } from '@/types/components/navs'
import { Outlet, useNavigate } from 'react-router-dom'
import { AllowedAccess, usePermission } from 'react-permission-role'
import useAsyncEffect from 'use-async-effect'

const Navs = ({ list, navProps, tabContentProps, mainPath }: NavsProps) => {
  const [activeKey, setActiveKey] = useState(0)
  const navigate = useNavigate()
  const { isAuthorized } = usePermission()

  useAsyncEffect(async () => {
    if (activeKey == 0) {
      for (const { permissions, path } of list) {
        if (await isAuthorized([], permissions)) {
          navigate(`${mainPath}${path}`)
          break
        }
      }
    }
  }, [])

  return (
    <CCard>
      <CCardHeader>
        <CNav role="tablist" {...navProps}>
          {list.map(({ title, path, permissions }, index) => {
            return (
              <AllowedAccess key={index} permissions={permissions}>
                <CNavItem>
                  <CNavLink
                    active={activeKey === index + 1}
                    onClick={() => navigate(`${mainPath}${path}`)}
                  >
                    {title}
                  </CNavLink>
                </CNavItem>
              </AllowedAccess>
            )
          })}
        </CNav>
      </CCardHeader>
      <CCardBody>
        <CTabContent {...tabContentProps}>
          <CTabPane role="tabpanel" aria-labelledby="test-tab" visible={activeKey === 0}>
            Test
          </CTabPane>
          <CTabPane role="tabpanel" aria-labelledby="other-tab" visible={activeKey !== 0}>
            <Outlet context={[activeKey, setActiveKey]} />
          </CTabPane>
        </CTabContent>
      </CCardBody>
    </CCard>
  )
}

export default Navs
