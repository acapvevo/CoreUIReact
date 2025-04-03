
import Modal from '@/components/App/Modal'
import VerifyEmailForm from '@/components/App/Form/VerifyEmail'
import { VerifyEmailModalProps } from '@/types/forms/verifyEmail'

const VerifyEmailModal = ({ onClose, visible }: VerifyEmailModalProps) => {
  return (
    <Modal
      backdrop={'static'}
      size={undefined}
      visible={visible}
      onClose={onClose}
      title={'User Verification'}
    >
      <VerifyEmailForm onClose={onClose} />
    </Modal>
  )
}

export default VerifyEmailModal
