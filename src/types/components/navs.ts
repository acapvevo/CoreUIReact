import { CNavProps } from '@coreui/react/dist/esm/components/nav/CNav'
import { CTabContentProps } from '@coreui/react/dist/esm/components/tabs/CTabContent'
import { UserToken } from '@/types/models/user'

export interface NavsProps {
  list: Nav[]
  navProps: CNavProps
  tabContentProps: CTabContentProps
  mainPath: string
}

export interface Nav {
  title: string
  path: string
  permissions: UserToken['permissions']
}
