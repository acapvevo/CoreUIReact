import { CDropdownMenuProps } from '@coreui/react/dist/esm/components/dropdown/CDropdownMenu'
import { CSSProperties, Dispatch, SetStateAction } from 'react'

export interface ContextMenuProps extends CDropdownMenuProps {
  setVisible: Dispatch<SetStateAction<boolean>>
}
