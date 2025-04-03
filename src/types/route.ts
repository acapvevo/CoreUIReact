import { LazyExoticComponent, ReactNode } from 'react'

export interface RouteObj {
  path: string
  name: string
  layout?: string
  element?: LazyExoticComponent<() => JSX.Element>
  children?: RouteObj[]
}
