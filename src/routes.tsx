import AppGuest from '@/layout/App/Guest'
import AppLayout from '@/layout/App/Layout'
import TemplateLayout from '@/layout/Template/Layout'
import { RouteObj } from '@/types/route'
import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
import ErrorPage from '@/views/Error'

export const app_routes: RouteObj[] = [
  {
    path: '/',
    name: 'Home',
    element: lazy(() => import('@/views/Dashboard')),
  },
  {
    path: '/Dashboard',
    name: 'Dashboard',
    element: lazy(() => import('@/views/Dashboard')),
  },
  {
    path: '/Profile',
    name: 'Profile',
    element: lazy(() => import('@/views/Profile')),
  },
  {
    path: '/Setting',
    name: 'Setting',
    element: lazy(() => import('@/views/Setting/Main')),
    children: [
      {
        path: '/Role',
        name: 'Role',
        element: lazy(() => import('@/views/Setting/Role')),
      },
      {
        path: '/User',
        name: 'User',
        element: lazy(() => import('@/views/Setting/User')),
      },
    ],
  },
]

const guest_routes: RouteObj[] = [
  {
    path: '/Login',
    name: 'login',
    element: lazy(() => import('@/views/Auth/Login')),
  },
  {
    path: '/Register',
    name: 'register',
    element: lazy(() => import('@/views/Auth/Register')),
  },
  {
    path: '/ForgotPassword',
    name: 'forgotPassword',
    element: lazy(() => import('@/views/Auth/ForgotPassword')),
  },
  {
    path: '/ResetPassword',
    name: 'resetPassword',
    element: lazy(() => import('@/views/Auth/ResetPassword')),
  },
]

export const template_routes: RouteObj[] = [
  {
    path: '',
    name: 'Home',
    element: lazy(() => import('@/views/Template/Dashboard')),
  },
  {
    path: '/Dashboard',
    name: 'Dashboard',
    element: lazy(() => import('@/views/Template/Dashboard')),
  },
  {
    path: '/Theme',
    name: 'Theme',
    children: [
      {
        path: '/Colors',
        name: 'Colors',
        element: lazy(() => import('@/views/Template/Theme/Colors')),
      },
      {
        path: '/Typography',
        name: 'Typography',
        element: lazy(() => import('@/views/Template/Theme/Typography')),
      },
    ],
  },
  {
    path: '/Base',
    name: 'Base',
    children: [
      {
        path: '/Accordion',
        name: 'Accordion',
        element: lazy(() => import('@/views/Template/Base/Accordion')),
      },
      {
        path: '/Breadcrumbs',
        name: 'Breadcrumbs',
        element: lazy(() => import('@/views/Template/Base/Breadcrumbs')),
      },
      { path: '/Cards', name: 'Cards', element: lazy(() => import('@/views/Template/Base/Cards')) },
      {
        path: '/Carousel',
        name: 'Carousel',
        element: lazy(() => import('@/views/Template/Base/Carousels')),
      },
      {
        path: '/Collapse',
        name: 'Collapse',
        element: lazy(() => import('@/views/Template/Base/Collapses')),
      },
      {
        path: '/ListGroups',
        name: 'List Groups',
        element: lazy(() => import('@/views/Template/Base/ListGroups')),
      },
      { path: '/Navs', name: 'Navs', element: lazy(() => import('@/views/Template/Base/Navs')) },
      {
        path: '/Pagination',
        name: 'Paginations',
        element: lazy(() => import('@/views/Template/Base/Paginations')),
      },
      {
        path: '/Placeholders',
        name: 'Placeholders',
        element: lazy(() => import('@/views/Template/Base/Placeholders')),
      },
      {
        path: '/Popovers',
        name: 'Popovers',
        element: lazy(() => import('@/views/Template/Base/Popovers')),
      },
      {
        path: '/Progress',
        name: 'Progress',
        element: lazy(() => import('@/views/Template/Base/Progress')),
      },
      {
        path: '/Spinners',
        name: 'Spinners',
        element: lazy(() => import('@/views/Template/Base/Spinners')),
      },
      {
        path: '/Tables',
        name: 'Tables',
        element: lazy(() => import('@/views/Template/Base/Tables')),
      },
      {
        path: '/Tooltips',
        name: 'Tooltips',
        element: lazy(() => import('@/views/Template/Base/Tooltips')),
      },
    ],
  },
  {
    path: '/Buttons',
    name: 'Buttons',
    children: [
      {
        path: '/Button',
        name: 'Button',
        element: lazy(() => import('@/views/Template/Buttons/Buttons')),
      },
      {
        path: '/Dropdowns',
        name: 'Dropdowns',
        element: lazy(() => import('@/views/Template/Buttons/Dropdowns')),
      },
      {
        path: '/ButtonGroup',
        name: 'Button Groups',
        element: lazy(() => import('@/views/Template/Buttons/ButtonGroups')),
      },
    ],
  },
  {
    path: '/Charts',
    name: 'Charts',
    element: lazy(() => import('@/views/Template/Charts')),
  },
  {
    path: '/Forms',
    name: 'Forms',
    children: [
      {
        path: '/FormControl',
        name: 'Form Control',
        element: lazy(() => import('@/views/Template/Forms/FormControl')),
      },
      {
        path: '/Select',
        name: 'Select',
        element: lazy(() => import('@/views/Template/Forms/Select')),
      },
      {
        path: '/ChecksRadio',
        name: 'Checks & Radios',
        element: lazy(() => import('@/views/Template/Forms/ChecksRadios')),
      },
      {
        path: '/Range',
        name: 'Range',
        element: lazy(() => import('@/views/Template/Forms/Range')),
      },
      {
        path: '/InputGroup',
        name: 'Input Group',
        element: lazy(() => import('@/views/Template/Forms/InputGroup')),
      },
      {
        path: '/FloatingLabels',
        name: 'Floating Labels',
        element: lazy(() => import('@/views/Template/Forms/FloatingLabels')),
      },
      {
        path: '/Layout',
        name: 'Layout',
        element: lazy(() => import('@/views/Template/Forms/Layout')),
      },
      {
        path: '/Validation',
        name: 'Validation',
        element: lazy(() => import('@/views/Template/Forms/Validation')),
      },
    ],
  },
  {
    path: '/Icons',
    name: 'Icons',
    children: [
      {
        path: '/CoreUIIcons',
        name: 'CoreUI Icons',
        element: lazy(() => import('@/views/Template/Icons/CoreUIIcons')),
      },
      {
        path: '/Flags',
        name: 'Flags',
        element: lazy(() => import('@/views/Template/Icons/Flags')),
      },
      {
        path: '/Brands',
        name: 'Brands',
        element: lazy(() => import('@/views/Template/Icons/Brands')),
      },
    ],
  },
  {
    path: '/Notifications',
    name: 'Notifications',
    children: [
      {
        path: '/Alerts',
        name: 'Alerts',
        element: lazy(() => import('@/views/Template/Notifications/Alerts')),
      },
      {
        path: '/Badges',
        name: 'Badges',
        element: lazy(() => import('@/views/Template/Notifications/Badges')),
      },
      {
        path: '/Modals',
        name: 'Modals',
        element: lazy(() => import('@/views/Template/Notifications/Modals')),
      },
      {
        path: '/Toasts',
        name: 'Toasts',
        element: lazy(() => import('@/views/Template/Notifications/Toasts')),
      },
    ],
  },
  {
    path: '/Widgets',
    name: 'Widgets',
    element: lazy(() => import('@/views/Template/Widgets')),
  },
  {
    path: '/Errors',
    name: 'Errors',
    children: [
      {
        path: '/Page404',
        name: 'Page404',
        element: lazy(() => import('@/views/Template/Errors/Page404')),
      },
      {
        path: '/Page500',
        name: 'Page500',
        element: lazy(() => import('@/views/Template/Errors/Page500')),
      },
    ],
  },
  {
    path: '/Auth',
    name: 'Auth',
    children: [
      { path: '/Login', name: 'Login', element: lazy(() => import('@/views/Template/Auth/Login')) },
      {
        path: '/Register',
        name: 'Register',
        element: lazy(() => import('@/views/Template/Auth/Register')),
      },
    ],
  },
]

const routes_map = (routes: RouteObj[], base: string) => {
  return routes.map((route, i) => {
    const Element = route.element

    return (
      <Route key={i} path={`${base}${route.path}`} {...(Element && { element: <Element /> })}>
        {route.children && routes_map(route.children, `${base}${route.path}`)}
      </Route>
    )
  })
}

const AppRoutes = <Route element={<AppLayout />}>{routes_map(app_routes, '')}</Route>
const GuestRoutes = <Route element={<AppGuest />}>{routes_map(guest_routes, '')}</Route>
const TemplateRoutes = (
  <Route element={<TemplateLayout />}>{routes_map(template_routes, '/Template')}</Route>
)

export { AppRoutes, GuestRoutes, TemplateRoutes }
