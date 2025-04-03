import { ActionButtonsProps, ActionDropdownItemProps, ActionProps } from '@/types/components/button'
import { CButton, CButtonGroup, CDropdownItem } from '@coreui/react'
import { Icon } from '@iconify/react'
import { useTranslation } from 'react-i18next'

export const ActionButtons = ({
  viewButtonProps,
  editButtonProps,
  deleteButtonProps,
  restoreButtonProps,
}: ActionButtonsProps) => {
  return (
    <>
      {viewButtonProps && (
        <CButton {...viewButtonProps} color="primary">
          <Icon icon="carbon:view-filled" inline />
        </CButton>
      )}
      {editButtonProps && (
        <CButton {...editButtonProps} color="secondary">
          <Icon icon="material-symbols:edit" inline />
        </CButton>
      )}
      {deleteButtonProps && (
        <CButton {...deleteButtonProps} color="danger">
          <Icon icon="material-symbols:delete" inline />
        </CButton>
      )}
      {restoreButtonProps && (
        <CButton {...restoreButtonProps} color="success">
          <Icon icon="material-symbols:restore-from-trash-outline" inline />
        </CButton>
      )}
    </>
  )
}

export const ActionGroupButton = ({ ...buttonProps }: ActionProps) => {
  return (
    <>
      <CButtonGroup size="sm" role="group" className="d-none d-lg-flex">
        <ActionButtons {...buttonProps} />
      </CButtonGroup>
      <CButtonGroup size="sm" vertical role="group" className="d-lg-none">
        <ActionButtons {...buttonProps} />
      </CButtonGroup>
    </>
  )
}

export const ActionContextMenuButton = ({
  viewDropdownItemProps,
  editDropdownItemProps,
  deleteDropdownItemProps,
  restoreDropdownItemProps,
}: ActionDropdownItemProps) => {
  const { t } = useTranslation()

  return (
    <>
      {viewDropdownItemProps && (
        <CDropdownItem as="button" {...viewDropdownItemProps}>
          <Icon icon="carbon:view-filled" inline /> {t('View')}
        </CDropdownItem>
      )}
      {editDropdownItemProps && (
        <CDropdownItem as="button" {...editDropdownItemProps}>
          <Icon icon="material-symbols:edit" inline /> {t('Edit')}
        </CDropdownItem>
      )}
      {deleteDropdownItemProps  && (
        <CDropdownItem as="button" {...deleteDropdownItemProps}>
          <Icon icon="material-symbols:delete" inline /> {t('Delete')}
        </CDropdownItem>
      )}
      {restoreDropdownItemProps  && (
        <CDropdownItem as="button" {...restoreDropdownItemProps}>
          <Icon icon="material-symbols:restore-from-trash-outline" inline /> {t('Restore')}
        </CDropdownItem>
      )}
    </>
  )
}
