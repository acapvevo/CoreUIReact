import { ModalProps } from '@/types/components/modal'
import { CModal, CModalBody, CModalFooter, CModalHeader } from '@coreui/react'

const Modal = ({ title, children, footer, ...props }: ModalProps) => {
  return (
    <CModal scrollable backdrop="static" alignment="center" size="xl" {...props}>
      {title && <CModalHeader>{title}</CModalHeader>}
      <CModalBody>{children}</CModalBody>
      {footer && (
        <CModalFooter className="d-grid gap-2 d-md-flex justify-content-md-end">
          {footer}
        </CModalFooter>
      )}
    </CModal>
  )
}

export default Modal
