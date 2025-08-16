import Navs from '@/components/App/Navs'
import { useTranslation } from 'react-i18next'

const Main = () => {
  const { t } = useTranslation()

  return (
    <Navs
      base="Setting"
      list={[
        {
          title: t('Role'),
          path: 'Role',
          permissions: ['roles'],
        },
        {
          title: t('User'),
          path: 'User',
          permissions: ['users'],
        },
        {
          title: t('Health'),
          path: 'Health',
          permissions: ['healths'],
        },
      ]}
      navProps={{ variant: 'pills' }}
      tabContentProps={{ className: 'mt-3' }}
    />
  )
}

export default Main
