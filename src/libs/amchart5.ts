import AnimatedTheme from '@amcharts/amcharts5/themes/Animated'
import ResponsiveTheme from '@amcharts/amcharts5/themes/Responsive'
import DarkTheme from '@amcharts/amcharts5/themes/Dark'
import { Root } from '@amcharts/amcharts5'
import { Exporting } from '@amcharts/amcharts5/.internal/plugins/exporting/Exporting'
import { CheckThemeMode, ChangeThemes, ChartExport, Theme } from '@/types/components/chart'

const checkThemeMode: CheckThemeMode = (colorMode: string) => {
  const currMode = colorMode
  const themes: Theme[] = [AnimatedTheme, ResponsiveTheme]

  if (
    currMode == 'dark' ||
    (currMode == 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    themes.push(DarkTheme)
  }

  return themes
}

const initRootSetting = (root: Root, colorMode: string) => {
  if (root._logo) root._logo.dispose()

  root.setThemes(
    checkThemeMode(colorMode).map((theme) => {
      return theme.new(root)
    }),
  )
}

const changeThemes: ChangeThemes = (root, colorMode) => {
  const currThemes = checkThemeMode(colorMode)

  return currThemes.map((theme) => {
    return theme.new(root)
  })
}

const exportChart: ChartExport = (root) => {
  return Exporting.new(root, {
    pngOptions: {
      quality: 1,
      maintainPixelRatio: true,
    },
  })
}

export { checkThemeMode, initRootSetting, changeThemes, exportChart }
