import { CButtonProps } from "@coreui/react/dist/esm/components/button/CButton"
import { CDropdownItemProps } from '@coreui/react/dist/esm/components/dropdown/CDropdownItem'

export interface ActionButtonsProps {
  viewButtonProps?: CButtonProps
  editButtonProps?: CButtonProps
  deleteButtonProps?: CButtonProps
  restoreButtonProps?: CButtonProps
}

export interface ActionDropdownItemProps {
  viewDropdownItemProps?: CDropdownItemProps
  editDropdownItemProps?: CDropdownItemProps
  deleteDropdownItemProps?: CDropdownItemProps
  restoreDropdownItemProps?: CDropdownItemProps
  isDeleted?: boolean
}

export interface ActionProps extends ActionButtonsProps {

}
