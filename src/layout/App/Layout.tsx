import { AppContent, AppSidebar, AppFooter, Header } from '@/components/App'
import LoadingModal from '@/components/App/Loading/Modal'
import { State } from '@/types/store'
import { useSelector } from 'react-redux'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import { User } from '@/types/models/user'
import VerifyEmailModal from '@/components/App/Modal/VerifyEmail'

const Layout = () => {
  const [verifyEmailModalVisibility, setVerifyEmailModalVisibility] = useState(false)
  const { loading } = useSelector((state: State) => state.loading)
  const isAuthenticate = useIsAuthenticated()
  const user = useAuthUser<User>()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticate) {
      navigate('/Login', {
        state: { redirectTo: location.pathname },
      })
    }
    // else if (user && !user.email_verified_at) {
    //   setVerifyEmailModalVisibility(true)
    // }
  }, [isAuthenticate, user?.email_verified_at])

  if (!isAuthenticate)
    return <Navigate to="/Auth/Login" state={{ redirectTo: location.pathname }} />
  return (
    <>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <Header />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        <AppFooter />
      </div>
      <LoadingModal loading={loading} />
      <VerifyEmailModal
        visible={verifyEmailModalVisibility}
        onClose={() => setVerifyEmailModalVisibility(false)}
      />
    </>
  )
}

export default Layout
