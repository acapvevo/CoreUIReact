import { CButton, CSpinner } from '@coreui/react'
import { CButtonProps } from '@coreui/react/dist/esm/components/button/CButton'
import { useTranslation } from 'react-i18next'

interface LoadingButtonProps extends CButtonProps {
  processing: boolean
  text: string
  loadingText?: string
}

const LoadingButton = (props: LoadingButtonProps) => {
  const {t} = useTranslation()
  const { processing, text, loadingText, ...rest } = props

  return (
    <CButton disabled={processing} {...rest}>
      {processing ? (
        <>
          <CSpinner as="span" size="sm" aria-hidden="true" />
          {loadingText && ` ${t('loading')}...`}
        </>
      ) : (
        text
      )}
    </CButton>
  )
}

export default LoadingButton
