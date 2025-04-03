import { Mosaic } from 'react-loading-indicators'
import { useTranslation } from 'react-i18next'
import tinycolor from 'tinycolor2'

const LoadingContent = ({ text }: { text?: string }) => {
  const { t } = useTranslation()
  return (
    <div className="d-flex justify-content-center align-items-center">
      <p className="text-center">
        <Mosaic size="large" color={'#5856d6'}/>
        <br/>
        <br/>
        <i className='text-primary'>{text ?? `${t('executing_your_request')}...`}</i>
      </p>
    </div>
  )
}

export default LoadingContent
