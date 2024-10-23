import AnimatedTheme from '@amcharts/amcharts5/themes/Animated'
import ResponsiveTheme from '@amcharts/amcharts5/themes/Responsive'
import DarkTheme from '@amcharts/amcharts5/themes/Dark'
import { Root } from '@amcharts/amcharts5'
import { Exporting } from '@amcharts/amcharts5/.internal/plugins/exporting/Exporting'

type Theme = typeof AnimatedTheme | typeof ResponsiveTheme | typeof DarkTheme
type CheckThemeMode = (colorMode: string) => Array<Theme>
type ChangeThemes = (root: Root, colorMode: string) => Array<Theme>
type ChartExport = (root: Root) => Exporting

export type {
  Theme,
  CheckThemeMode,
  ChangeThemes,
  ChartExport,
}

export interface ChartElement extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>{

}
