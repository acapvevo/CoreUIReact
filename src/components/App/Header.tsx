import { useEffect, useReducer, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CAvatar,
  CContainer,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilAccountLogout,
  cilBriefcase,
  cilContrast,
  cilMenu,
  cilMoon,
  cilSun,
  cilUser,
} from '@coreui/icons'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'

import { AppBreadcrumb } from '@/components/App/index'
import { sidebarAction } from '@/store/slices/sidebar'
import { State } from '@/types/store'
import useTheme from '@/hooks/theme'
import { User } from '@/types/models/user'
import { useTranslation } from 'react-i18next'
import useAuth from '@/hooks/auth'
import { AllowedAccess } from 'react-permission-role'

const HeaderDropdown = () => {
  const { t } = useTranslation()
  const { logout } = useAuth()
  const user = useAuthUser<User>()

  return (
    <>
      <CDropdown variant="nav-item">
        <CDropdownToggle className="py-0 pe-0" caret={false}>
          <CAvatar src={user!['profile_picture']} size="md" shape="rounded-0" />
        </CDropdownToggle>
        <CDropdownMenu className="pt-0">
          <CDropdownHeader>Settings</CDropdownHeader>
          <CDropdownItem href="/Profile">
            <CIcon icon={cilUser} className="me-2" />
            {t('profile')}
          </CDropdownItem>
          <AllowedAccess permissions={['users', 'roles']}>
            <CDropdownItem href="/Setting">
              <CIcon icon={cilBriefcase} className="me-2" />
              {t('system')}
            </CDropdownItem>
          </AllowedAccess>
          <CDropdownDivider />
          <CDropdownItem as="button" onClick={() => logout()}>
            <CIcon icon={cilAccountLogout} className="me-2" />
            {t('log_out')}
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    </>
  )
}

const Header = () => {
  const user = useAuthUser<User>()
  const headerRef = useRef<HTMLDivElement>(null)
  const { colorMode, setColorMode } = useTheme()
  const { i18n, t } = useTranslation()

  const dispatch = useDispatch()
  const { sidebarShow } = useSelector((state: State) => state.sidebar)

  const langs = [
    {
      label: 'english',
      value: 'en',
    },
    {
      label: 'malay',
      value: 'ms',
    },
  ]
  const change_language = (lang: string) => {
    i18n.changeLanguage(lang)
  }

  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })
  }, [])

  return (
    <CHeader position="sticky" className="p-0" ref={headerRef}>
      <CContainer className="border-bottom px-4" fluid>
        <CHeaderToggler
          onClick={() => dispatch(sidebarAction.sidebarShowToggle({ visible: !sidebarShow }))}
          style={{ marginInlineStart: '-14px' }}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderNav className="ms-auto">
          <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle caret={false}>
              {langs
                .find(
                  (lang) =>
                    lang.value === ((i18n.language || window.localStorage.i18nextLng) ?? 'en'),
                )
                ?.value.toUpperCase()}
            </CDropdownToggle>
            <CDropdownMenu>
              {langs.map((lang) => {
                return (
                  <CDropdownItem
                    key={lang.value}
                    active={
                      ((i18n.language || window.localStorage.i18nextLng) ?? 'en') === lang.value
                    }
                    className="d-flex align-items-center"
                    as="button"
                    type="button"
                    onClick={() => change_language(lang.value)}
                  >
                    {' '}
                    {t(lang.label)}
                  </CDropdownItem>
                )
              })}
            </CDropdownMenu>
          </CDropdown>
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle caret={false}>
              {colorMode === 'dark' ? (
                <CIcon icon={cilMoon} size="lg" />
              ) : colorMode === 'auto' ? (
                <CIcon icon={cilContrast} size="lg" />
              ) : (
                <CIcon icon={cilSun} size="lg" />
              )}
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem
                active={colorMode === 'light'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('light')}
              >
                <CIcon className="me-2" icon={cilSun} size="lg" /> {t('light')}
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'dark'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('dark')}
              >
                <CIcon className="me-2" icon={cilMoon} size="lg" /> {t('dark')}
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'auto'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('auto')}
              >
                <CIcon className="me-2" icon={cilContrast} size="lg" /> {t('auto')}
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <div className="d-flex align-items-center">
            <strong dir="auto">{user!['name']}</strong>
          </div>
          <HeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CContainer className="px-4" fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default Header
