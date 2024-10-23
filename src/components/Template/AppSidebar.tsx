import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { sidebarAction } from '@/store/slices/sidebar'

// sidebar nav config
import { logo } from '@/assets/brand/logo'
import { sygnet } from '@/assets/brand/sygnet'
import { State } from '@/types/store'
import { template_nav } from '@/nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const { sidebarShow, sidebarUnfoldable } = useSelector((state: State) => state.sidebar)

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={sidebarUnfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch(sidebarAction.sidebarShowToggle({ visible: visible }))
      }}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand to="/">
          <CIcon customClassName="sidebar-brand-full" icon={logo} height={32} />
          <CIcon customClassName="sidebar-brand-narrow" icon={sygnet} height={32} />
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch(sidebarAction.sidebarShowToggle({ visible: false }))}
        />
      </CSidebarHeader>
      <AppSidebarNav items={template_nav} />
      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler onClick={() => dispatch(sidebarAction.sidebarUnfoldableToggle())} />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
