import { CButtonGroup, CButton } from '@coreui/react'
import { Icon } from '@iconify/react'
import { MouseEventHandler } from 'react'

const Action = ({
  onClickView,
  onClickEdit,
  onClickDelete,
}: {
  onClickView?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
  onClickEdit?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
  onClickDelete?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
}) => {
  return (
    <>
      <CButtonGroup size="sm" role="group" className="d-none d-lg-flex">
        {onClickView && (
          <CButton color="primary" onClick={onClickView}>
            <Icon icon="carbon:view-filled" inline />
          </CButton>
        )}
        {onClickEdit && (
          <CButton color="secondary" onClick={onClickEdit}>
            <Icon icon="material-symbols:edit" inline />
          </CButton>
        )}
        {onClickDelete && (
          <CButton color="danger" onClick={onClickDelete}>
            <Icon icon="material-symbols:delete" inline />
          </CButton>
        )}
      </CButtonGroup>
      <CButtonGroup size="sm" vertical role="group" className="d-lg-none">
        {onClickView && (
          <CButton color="primary" onClick={onClickView}>
            <Icon icon="carbon:view-filled" inline />
          </CButton>
        )}
        {onClickEdit && (
          <CButton color="secondary" onClick={onClickEdit}>
            <Icon icon="material-symbols:edit" inline />
          </CButton>
        )}
        {onClickDelete && (
          <CButton color="danger" onClick={onClickDelete}>
            <Icon icon="material-symbols:delete" inline />
          </CButton>
        )}
      </CButtonGroup>
    </>
  )
}

export default Action
