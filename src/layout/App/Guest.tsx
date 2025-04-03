import { CContainer } from '@coreui/react'
import { Outlet } from 'react-router-dom'
import { Suspense } from 'react'
import LoadingContent from '@/components/App/Loading/Content'

const Guest = () => {
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <Suspense fallback={<LoadingContent />}>
          <Outlet />
        </Suspense>
      </CContainer>
    </div>
  )
}

export default Guest
