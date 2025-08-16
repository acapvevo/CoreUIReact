import LoadingContent from '@/components/App/Loading/Content'
import useNav from '@/hooks/nav'
import { getHealth } from '@/utils/query'
import { CCard, CCardBody, CCardText, CCardTitle, CCol, CRow } from '@coreui/react'
import { useTranslation } from 'react-i18next'
import { formatFromUnix } from '../../libs/luxon'
import Icon from '@/components/App/Icon'

const Health = () => {
  useNav(3)
  const { t } = useTranslation()
  const { data, isLoading } = getHealth()

  return (
    <>
      {!data || isLoading ? (
        <LoadingContent />
      ) : (
        <>
          <p>Last Update: {formatFromUnix(data.finishedAt, 'F')}</p>
          <CRow lg={{ cols: 3, gutter: 2 }}>
            {Object.entries(data.checkResults).map(
              ([key, { label, notificationMessage, status }]) => (
                <CCol key={key}>
                  <CCard className="h-100">
                    <CCardBody>
                      <CRow>
                        <CCol xs={3}>
                          <Icon icon={status == 'ok' ? 'mdi:tick-circle' : 'mdi:alert-circle'} className={status == 'ok' ? 'text-success' : 'text-danger'} />
                        </CCol>
                        <CCol xs={9}>
                          <CCardTitle>{label}</CCardTitle>
                        </CCol>
                      </CRow>
                      <CCardText>{notificationMessage}</CCardText>
                    </CCardBody>
                  </CCard>
                </CCol>
              ),
            )}
          </CRow>
        </>
      )}
    </>
  )
}

export default Health
