import { AppContent, AppSidebar, AppFooter, Header } from '@/components/App'
import LoadingModal from '@/components/App/Loading/Modal'
import { State } from '@/types/store'
import { useSelector } from 'react-redux'
import { Navigate, useLocation, useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import VerifyEmailModal from '@/components/App/Modal/VerifyEmail'
import { useAuthChangeEffect, useIsAuthenticated } from '@reactit/auth'
import useAppAuth from '@/hooks/auth'
import { useEcho } from '@laravel/echo-react'

const Layout = () => {
  const [verifyEmailModalVisibility, setVerifyEmailModalVisibility] = useState(false)
  const { loading } = useSelector((state: State) => state.loading)
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, initialized, session } = useAppAuth()
  const { listen } = useEcho(`user.${session?.user.id}`, 'Verified', (e) => console.log(e))

  useEffect(() => {
    listen()
  }, [])
  useAuthChangeEffect((context) => {
    if (!isAuthenticated || !initialized) {
      navigate('/Login', {
        state: { redirectTo: location.pathname },
      })
    }
  })

  if (!isAuthenticated || !initialized)
    return <Navigate to="/Login" state={{ redirectTo: location.pathname }} />
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
