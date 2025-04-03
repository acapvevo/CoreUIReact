import { useColorModes } from '@coreui/react'

const useTheme = () => {
  const colorMode = useColorModes()

  const isDark =
    colorMode.colorMode == 'dark' ||
    (colorMode.colorMode == 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)

  const isLight =
    colorMode.colorMode == 'light' ||
    (colorMode.colorMode == 'auto' && window.matchMedia('(prefers-color-scheme: light)').matches)

  return {
    ...colorMode,
    isDark,
    isLight,
  }
}

export default useTheme
