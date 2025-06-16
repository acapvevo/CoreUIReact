import React, { memo, ReactNode } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'

import {
  CBadge,
  CCloseButton,
  CNavLink,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarNav,
  CSidebarToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { logo } from '@/assets/brand/logo'
import { sygnet } from '@/assets/brand/sygnet'

import { sidebarAction } from '@/store/slices/sidebar'

// sidebar nav config
import { State } from '@/types/store'
import { app_nav, Nav } from '@/nav'
import { NavLink } from 'react-router'
import { useTranslation } from 'react-i18next'

const SidebarNav = ({ items }: { items: Nav[] }) => {
  const { t } = useTranslation()
  const navLink = (
    name: string,
    icon: ReactNode,
    badge?: {
      color: string
      text: string
    },
    indent = false,
  ) => {
    return (
      <>
        {icon
          ? icon
          : indent && (
              <span className="nav-icon">
                <span className="nav-icon-bullet"></span>
              </span>
            )}
        {name && t(name)}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    )
  }

  const navItem = (item: Nav, index: number, indent = false) => {
    const { component, name, badge, icon, ...rest } = item
    const Component = component

    return (
      <Component as="div" key={index}>
        {rest.to || rest.href ? (
          <CNavLink {...(rest.to && { as: NavLink })} {...rest}>
            {navLink(name, icon, badge, indent)}
          </CNavLink>
        ) : (
          navLink(name, icon, badge, indent)
        )}
      </Component>
    )
  }

  const navGroup = (item: Nav, index: number) => {
    const { component, name, icon, badge, items, to, ...rest } = item
    const Component = component

    return (
      <Component compact as="div" key={index} toggler={navLink(name, icon, badge)} {...rest}>
        {item.items?.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index, true),
        )}
      </Component>
    )
  }

  return (
    <CSidebarNav as={SimpleBar}>
      {items &&
        items.map((item, index) => (item.items ? navGroup(item, index) : navItem(item, index)))}
    </CSidebarNav>
  )
}

const Sidebar = () => {
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
        <CSidebarBrand href="/">
          <CIcon customClassName="sidebar-brand-full" icon={logo} height={32} />
          <CIcon customClassName="sidebar-brand-narrow" icon={sygnet} height={32} />
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch(sidebarAction.sidebarShowToggle({ visible: false }))}
        />
      </CSidebarHeader>
      <SidebarNav items={app_nav} />
      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler onClick={() => dispatch(sidebarAction.sidebarUnfoldableToggle())} />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default memo(Sidebar)
