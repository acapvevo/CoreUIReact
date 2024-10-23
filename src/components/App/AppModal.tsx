import { ModalProps } from '@/types/components/modal'
import { CModal, CModalBody, CModalFooter, CModalHeader } from '@coreui/react'

const Modal = (props: ModalProps) => {
  return (
    <CModal
      visible={props.visible}
      onClose={props.onClose}
      size="xl"
      backdrop="static"
      scrollable
      alignment="center"
    >
      {props.title && <CModalHeader>{props.title}</CModalHeader>}
      <CModalBody>{props.body}</CModalBody>
      {props.footer && <CModalFooter>{props.footer}</CModalFooter>}
    </CModal>
  )
}
