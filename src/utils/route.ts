import { RouteObj } from "@/types/route"
import { lazy } from "react"

export const routes = (routes: RouteObj[]) => {
  let routeList: RouteObj[] = []

  routes.forEach((parent, i) => {
    routeList.push({
      path: `${parent.path}`,
      name: parent.name,
    })

    if (parent.children) {
      parent.children.forEach((child) => {
        routeList.push({
          path: `${parent.path}${child.path}`,
          name: child.name,
        })
      })
    }
  })

  return routeList
}
