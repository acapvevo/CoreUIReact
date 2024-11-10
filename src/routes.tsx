import AppGuest from '@/layout/App/Guest'
import AppLayout from '@/layout/App/Layout'
import TemplateLayout from '@/layout/Template/Layout'
import { RouteObj } from '@/types/route'
import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
import Error from '@/views/Error'

export const app_routes: RouteObj[] = [
  {
    path: '',
    name: 'Home',
  },
  {
    path: '/Dashboard',
    name: 'Dashboard',
  },
  {
    path: '/Setting',
    name: 'Setting',
    children: [
      {
        path: '/Profile',
        name: 'Profile',
      },
      {
        path: '/System',
        name: 'System',
      },
    ],
  },
]

const guest_routes: RouteObj[] = [
  {
    path: '/Auth',
    name: 'Auth',
    children: [
      {
        path: '/Login',
        name: 'Login',
      },
      {
        path: '/Register',
        name: 'Register',
      },
    ],
  },
]

export const template_routes: RouteObj[] = [
  {
    path: '',
    name: 'Home',
  },
  {
    path: '/Dashboard',
    name: 'Dashboard',
  },
  {
    path: '/Theme',
    name: 'Theme',
    children: [
      { path: '/Colors', name: 'Colors' },
      { path: '/Typography', name: 'Typography' },
    ],
  },
  {
    path: '/Base',
    name: 'Base',
    children: [
      { path: '/Accordion', name: 'Accordion' },
      { path: '/Breadcrumbs', name: 'Breadcrumbs' },
      { path: '/Cards', name: 'Cards' },
      { path: '/Carousel', name: 'Carousel' },
      { path: '/Collapse', name: 'Collapse' },
      { path: '/ListGroups', name: 'List Groups' },
      { path: '/Navs', name: 'Navs' },
      { path: '/Pagination', name: 'Paginations' },
      { path: '/Placeholders', name: 'Placeholders' },
      { path: '/Popovers', name: 'Popovers' },
      { path: '/Progress', name: 'Progress' },
      { path: '/Spinners', name: 'Spinners' },
      { path: '/Tables', name: 'Tables' },
      { path: '/Tooltips', name: 'Tooltips' },
    ],
  },
  {
    path: '/Buttons',
    name: 'Buttons',
    children: [
      { path: '/Button', name: 'Button' },
      { path: '/Dropdowns', name: 'Dropdowns' },
      { path: '/ButtonGroup', name: 'Button Groups' },
    ],
  },
  {
    path: '/Charts',
    name: 'Charts',
  },
  {
    path: '/Forms',
    name: 'Forms',
    children: [
      { path: '/FormControl', name: 'Form Control' },
      { path: '/Select', name: 'Select' },
      { path: '/ChecksRadio', name: 'Checks & Radios' },
      { path: '/Range', name: 'Range' },
      { path: '/InputGroup', name: 'Input Group' },
      { path: '/FloatingLabels', name: 'Floating Labels' },
      { path: '/Layout', name: 'Layout' },
      { path: '/Validation', name: 'Validation' },
    ],
  },
  {
    path: '/Icons',
    name: 'Icons',
    children: [
      { path: '/CoreUIIcons', name: 'CoreUI Icons' },
      { path: '/Flags', name: 'Flags' },
      { path: '/Brands', name: 'Brands' },
    ],
  },
  {
    path: '/Notifications',
    name: 'Notifications',
    children: [
      { path: '/Alerts', name: 'Alerts' },
      { path: '/Badges', name: 'Badges' },
      { path: '/Modals', name: 'Modals' },
      { path: '/Toasts', name: 'Toasts' },
    ],
  },
  {
    path: '/Widgets',
    layout: '/Main',
    name: 'Widgets',
  },
  {
    path: '/Errors',
    name: 'Errors',
    children: [
      { path: '/Page404', name: 'Page404' },
      { path: '/Page500', name: 'Page500' },
    ],
  },
  {
    path: '/Auth',
    name: 'Auth',
    children: [
      { path: '/Login', name: 'Login' },
      { path: '/Register', name: 'Register' },
    ],
  },
]

const routes_map = (routes: RouteObj[], base: string) => {
  return routes.map((route, i) => {
    const path = route.children
      ? route.layout
        ? `./views${base}${route.path}${route.layout}`
        : ''
      : route.name == 'Home'
        ? `./views/Dashboard`
        : `./views${base}${route.path}`
    const Element = path ? lazy(() => import(/* @vite-ignore */ path)) : null

    return (
      <Route key={i} path={`${base}${route.path}`} {...(Element && { element: <Element /> })}>
        {route.children && routes_map(route.children, `${base}${route.path}`)}
      </Route>
    )
  })
}

const AppRoutes = (
  <Route errorElement={<Error />} element={<AppLayout />}>
    {routes_map(app_routes, '')}
  </Route>
)
const GuestRoutes = (
  <Route errorElement={<Error />} element={<AppGuest />}>
    {routes_map(guest_routes, '')}
  </Route>
)
const TemplateRoutes = (
  <Route errorElement={<Error />} element={<TemplateLayout />}>
    {routes_map(template_routes, '/Template')}
  </Route>
)

export { AppRoutes, GuestRoutes, TemplateRoutes }
