import { ModalProps } from '@/types/components/modal'

export type VerifyEmailModalProps = {

} & ModalProps

export type VerifyEmailFormProps = {
  onClose: VerifyEmailModalProps['onClose']
}

export enum VerifyEmailStatus {
  VERIFIED = 'verified',
  VERIFICATION_REQUIRED = 'verification_required',
  VERIFICATION_LINK_SENT = 'verification_link_sent',
}
