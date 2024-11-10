import { ModalProps } from '@/types/components/modal'
import { CModal, CModalBody, CModalFooter, CModalHeader } from '@coreui/react'

const Modal = ({ title, body, footer, ...props }: ModalProps) => {
  return (
    <CModal {...props} scrollable backdrop="static" alignment="center" size="xl">
      {title && <CModalHeader>{title}</CModalHeader>}
      <CModalBody>{body}</CModalBody>
      {footer && (
        <CModalFooter className="d-grid gap-2 d-md-flex justify-content-md-end">
          {footer}
        </CModalFooter>
      )}
    </CModal>
  )
}

export default Modal
