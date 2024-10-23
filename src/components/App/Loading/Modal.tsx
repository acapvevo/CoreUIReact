import { CModal, CModalBody } from '@coreui/react'
import LoadingContent from './Content'

const LoadingModal = (props: { loading: boolean; text?: string }) => {
  return (
    <CModal visible={props.loading} backdrop="static" alignment="center">
      <CModalBody>
        <LoadingContent text={props.text} />
      </CModalBody>
    </CModal>
  )
}

export default LoadingModal
