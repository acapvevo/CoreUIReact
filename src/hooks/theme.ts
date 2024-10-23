import { useColorModes } from "@coreui/react"

const useTheme = () => {
  const { colorMode, isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')

  return {
    colorMode,
    isColorModeSet,
    setColorMode
  }
}

export default useTheme
