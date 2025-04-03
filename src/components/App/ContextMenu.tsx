import { ContextMenuProps } from '@/types/components/context_menu'
import { CDropdownMenu } from '@coreui/react'

const ContextMenu = ({ style, children, setVisible }: ContextMenuProps) => {
  return (
    <CDropdownMenu
      className="position-fixed border d-block overflow-auto"
      style={{ ...style, cursor: 'pointer', maxHeight: '150px' }}
      onMouseLeave={() => {
        setVisible(false)
      }}
    >
      {children}
    </CDropdownMenu>
  )
}

export default ContextMenu
