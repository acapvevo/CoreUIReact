import { CButtonProps } from '@coreui/react/dist/esm/components/button/CButton'
import { CDropdownItemProps } from '@coreui/react/dist/esm/components/dropdown/CDropdownItem'
import { HasAccessProps } from 'react-permission-role/dist/components/AllowedAccess'

export interface ActionButtonsProps {
  viewButtonProps?: CButtonProps
  editButtonProps?: CButtonProps
  deleteButtonProps?: CButtonProps
  restoreButtonProps?: CButtonProps
}

export type DropdownItemProps = CDropdownItemProps & Pick<HasAccessProps, 'roles' | 'permissions'>

export interface ActionDropdownItemProps {
  viewDropdownItemProps?: DropdownItemProps
  editDropdownItemProps?: DropdownItemProps
  deleteDropdownItemProps?: DropdownItemProps
  restoreDropdownItemProps?: DropdownItemProps
  isDeleted?: boolean
}

export interface ActionProps extends ActionButtonsProps {}
