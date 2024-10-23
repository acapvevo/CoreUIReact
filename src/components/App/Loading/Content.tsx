import { CImage } from '@coreui/react'

import loadBall from '@/assets/gifs/loadBall.gif'

const LoadingContent = ({ text }: { text?: string }) => {
  return (
    <div className='min-vh-100 d-flex justify-content-center align-items-center'>
      <p className='text-center'>
        <i>{text ?? 'Executing your Request...'}</i>
        <br />
        <b>Thank you</b> for waiting
        <br />
        <CImage src={loadBall} align="center" />
      </p>
    </div>
  )
}

export default LoadingContent
