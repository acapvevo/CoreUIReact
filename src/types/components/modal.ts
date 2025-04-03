import { Dispatch, PropsWithChildren, ReactNode, SetStateAction } from 'react'
import { CModalProps } from '@coreui/react/dist/cjs/components/modal/CModal'

// export interface ModalProps extends CModalProps {
//   title?: string
//   footer?: ReactNode
// }

export type ModalProps = PropsWithChildren<
  {
    title?: string
    footer?: ReactNode
  } & CModalProps
>
