import { memo } from 'react'
import { useLocation } from 'react-router-dom'
import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'

import { RouteObj } from '@/types/route'
import { routes } from '@/utils/route'
import { app_routes } from '@/routes'
import { useTranslation } from 'react-i18next'

const Breadcrumb = () => {
  const currentLocation = useLocation().pathname
  const { t } = useTranslation()

  const getRouteName = (pathname: string, routes: RouteObj[]) => {
    const currentRoute = routes.find((route) => route.path === pathname)
    return currentRoute ? currentRoute.name : ''
  }

  const getBreadcrumbs = (location: string) => {
    const breadcrumbs: { pathname: string; name: string; active: boolean }[] = []
    location.split('/').reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`
      const routeName = getRouteName(currentPathname, routes(app_routes))

      routeName &&
        breadcrumbs.push({
          pathname: currentPathname,
          name: t(routeName),
          active: index + 1 === array.length,
        })

      return currentPathname
    })
    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs(currentLocation)

  return (
    <CBreadcrumb className="my-0">
      <CBreadcrumbItem href="/">Home</CBreadcrumbItem>
      {breadcrumbs.map((breadcrumb, index) => {
        return (
          <CBreadcrumbItem
            {...(breadcrumb.active ? { active: true } : { href: breadcrumb.pathname })}
            key={index}
          >
            {breadcrumb.name}
          </CBreadcrumbItem>
        )
      })}
    </CBreadcrumb>
  )
}

export default memo(Breadcrumb)
