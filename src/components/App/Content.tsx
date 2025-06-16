import React, { Suspense } from 'react'
import { CContainer } from '@coreui/react'
import { Outlet } from 'react-router'
import LoadingContent from './Loading/Content'

const Content = () => {
  return (
    <CContainer fluid className="my-3">
      <Suspense fallback={<LoadingContent />}>
        <Outlet />
      </Suspense>
    </CContainer>
  )
}

export default React.memo(Content)
