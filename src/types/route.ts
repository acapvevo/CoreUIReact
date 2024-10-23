export interface RouteObj {
  path: string
  name: string
  layout?: string
  children?: RouteObj[]
}
