import { AppContent, AppSidebar, AppFooter, AppHeader } from '@/components/App'
import LoadingModal from '@/components/App/Loading/Modal'
import { State } from '@/types/store'
import { useSelector } from 'react-redux'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import { Navigate, useLocation } from 'react-router-dom'

const Layout = () => {
  const { loading } = useSelector((state: State) => state.loading)
  const isAuthenticate = useIsAuthenticated()
  const location = useLocation()

  if (!isAuthenticate) {
    return <Navigate to={'/Auth/Login'} state={{ redirectTo: location.pathname }}/>
  }

  return (
    <>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        <AppFooter />
      </div>
      <LoadingModal loading={loading} />
    </>
  )
}

export default Layout
