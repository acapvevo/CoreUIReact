import { CButton, CSpinner } from '@coreui/react'
import { CButtonProps } from '@coreui/react/dist/esm/components/button/CButton'

interface LoadingButtonProps extends CButtonProps {
  processing: boolean
  text: string
  loadingText?: string
}

const LoadingButton = (props: LoadingButtonProps) => {
  const { processing, text, loadingText, ...rest } = props

  return (
    <CButton disabled={processing} {...rest}>
      {processing ? (
        <>
          <CSpinner as="span" size="sm" aria-hidden="true" />
          {loadingText && ' Loading...'}
        </>
      ) : (
        text
      )}
    </CButton>
  )
}

export default LoadingButton
