import { ReactNode } from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilLockLocked,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilWarning,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

export interface Nav {
  component: typeof CNavItem | typeof CNavTitle | typeof CNavGroup
  name: string
  to?: string
  icon?: ReactNode
  badge?: {
    color: string
    text: string
  }
  items?: Nav[]
  href?: string
  target?: string
}

export const app_nav: Nav[] = [
  {
    component: CNavItem,
    name: 'dashboard',
    to: '/',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
]

export const template_nav: Nav[] = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/Template/Dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Theme',
  },
  {
    component: CNavItem,
    name: 'Colors',
    to: '/Template/Theme/Colors',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Typography',
    to: '/Template/Theme/Typography',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Components',
  },
  {
    component: CNavGroup,
    name: 'Base',
    to: '/Template/Base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Accordion',
        to: '/Template/Base/Accordion',
      },
      {
        component: CNavItem,
        name: 'Breadcrumb',
        to: '/Template/Base/Breadcrumbs',
      },
      {
        component: CNavItem,
        name: 'Cards',
        to: '/Template/Base/Cards',
      },
      {
        component: CNavItem,
        name: 'Carousel',
        to: '/Template/Base/Carousel',
      },
      {
        component: CNavItem,
        name: 'Collapse',
        to: '/Template/Base/Collapse',
      },
      {
        component: CNavItem,
        name: 'List group',
        to: '/Template/Base/ListGroups',
      },
      {
        component: CNavItem,
        name: 'Navs & Tabs',
        to: '/Template/Base/Navs',
      },
      {
        component: CNavItem,
        name: 'Pagination',
        to: '/Template/Base/Pagination',
      },
      {
        component: CNavItem,
        name: 'Placeholders',
        to: '/Template/Base/Placeholders',
      },
      {
        component: CNavItem,
        name: 'Popovers',
        to: '/Template/Base/Popovers',
      },
      {
        component: CNavItem,
        name: 'Progress',
        to: '/Template/Base/Progress',
      },
      {
        component: CNavItem,
        name: 'Spinners',
        to: '/Template/Base/Spinners',
      },
      {
        component: CNavItem,
        name: 'Tables',
        to: '/Template/Base/Tables',
      },
      {
        component: CNavItem,
        name: 'Tooltips',
        to: '/Template/Base/Tooltips',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Buttons',
    to: '/Template/Buttons',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Button',
        to: '/Template/Buttons/Button',
      },
      {
        component: CNavItem,
        name: 'Buttons groups',
        to: '/Template/Buttons/ButtonGroup',
      },
      {
        component: CNavItem,
        name: 'Dropdowns',
        to: '/Template/Buttons/Dropdowns',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Forms',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Form Control',
        to: '/Template/forms/FormControl',
      },
      {
        component: CNavItem,
        name: 'Select',
        to: '/Template/forms/Select',
      },
      {
        component: CNavItem,
        name: 'Checks & Radios',
        to: '/Template/forms/ChecksRadio',
      },
      {
        component: CNavItem,
        name: 'Range',
        to: '/Template/forms/Range',
      },
      {
        component: CNavItem,
        name: 'Input Group',
        to: '/Template/forms/InputGroup',
      },
      {
        component: CNavItem,
        name: 'Floating Labels',
        to: '/Template/forms/FloatingLabels',
      },
      {
        component: CNavItem,
        name: 'Layout',
        to: '/Template/forms/Layout',
      },
      {
        component: CNavItem,
        name: 'Validation',
        to: '/Template/forms/Validation',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Charts',
    to: '/Template/Charts',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Icons',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'CoreUI Free',
        to: '/Template/Icons/CoreUIIcons',
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        component: CNavItem,
        name: 'CoreUI Flags',
        to: '/Template/Icons/Flags',
      },
      {
        component: CNavItem,
        name: 'CoreUI Brands',
        to: '/Template/Icons/Brands',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Notifications',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Alerts',
        to: '/Template/Notifications/Alerts',
      },
      {
        component: CNavItem,
        name: 'Badges',
        to: '/Template/Notifications/Badges',
      },
      {
        component: CNavItem,
        name: 'Modals',
        to: '/Template/Notifications/Modals',
      },
      {
        component: CNavItem,
        name: 'Toasts',
        to: '/Template/Notifications/Toasts',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Widgets',
    to: '/Template/Widgets',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavGroup,
    name: 'Auth',
    icon: <CIcon icon={cilLockLocked} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/Template/Auth/Login',
      },
      {
        component: CNavItem,
        name: 'Register',
        to: '/Template/Auth/Register',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Error',
    icon: <CIcon icon={cilWarning} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Page 404',
        to: '/Template/Errors/Page404',
      },
      {
        component: CNavItem,
        name: 'Page 500',
        to: '/Template/Errors/Page500',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Docs',
    href: 'https://coreui.io/react/docs/templates/installation/',
    target: '_blank',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
]
