import { Dispatch, ReactNode, SetStateAction } from 'react'

export interface ModalProps extends ModalComponentProps {
  title?: string
  body?: ReactNode
  footer?: ReactNode
}

export interface ModalComponentProps {
  visible: boolean
  onClose: () => void
}
