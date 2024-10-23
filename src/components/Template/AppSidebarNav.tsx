import React, { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'

import { CBadge, CNavLink, CSidebarNav } from '@coreui/react'
import { Nav } from '@/nav'

export const AppSidebarNav = ({ items }: { items: Nav[] }) => {
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
        {name && name}
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
