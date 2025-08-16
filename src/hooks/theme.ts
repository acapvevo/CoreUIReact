import { useColorModes } from '@coreui/react'
import { useEffect } from 'react'

const useTheme = () => {
  const colorMode = useColorModes()

  const isDark =
    colorMode.colorMode == 'dark' ||
    (colorMode.colorMode == 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)

  const isLight =
    colorMode.colorMode == 'light' ||
    (colorMode.colorMode == 'auto' && window.matchMedia('(prefers-color-scheme: light)').matches)

  useEffect(() => {
    if (isLight) {
      document.body.classList.remove('e-dark-mode')
    } else {
      document.body.classList.add('e-dark-mode')
    }
  }, [colorMode.colorMode])

  return {
    ...colorMode,
    isDark,
    isLight,
  }
}

export default useTheme
