import { AppContent, AppSidebar, AppFooter, AppHeader } from '@/components/App'
import LoadingModal from '@/components/App/Loading/Modal'
import { State } from '@/types/store'
import { useSelector } from 'react-redux'

const Layout = () => {
  const { loading } = useSelector((state: State) => state.loading)

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
