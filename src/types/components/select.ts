import { ReactNode, RefAttributes } from 'react'
import Select from 'react-select/dist/declarations/src/Select'
import { StateManagerProps } from 'react-select/dist/declarations/src/useStateManager'
import { DropdownIndicatorProps, GroupBase } from 'react-select'
import { AsyncProps } from 'react-select/async'
import { ThemeConfig } from 'react-select/dist/declarations/src/theme'
import { StylesConfig } from 'react-select/dist/declarations/src/styles'

export type SelectProps<Option, IsMulti extends boolean, Group extends GroupBase<Option>> = {
  async: boolean
  size?: string
} & AsyncProps<Option, IsMulti, Group> &
  RefAttributes<Select<Option, IsMulti, Group>>

export type SelectComponent = <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
  props: SelectProps<Option, IsMulti, Group>,
) => ReactNode
export type SelectStylesFunction = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(
  multi: SelectProps<Option, IsMulti, Group>['isMulti'],
  size?: string,
) => StylesConfig<Option, IsMulti, Group>

export type DropdownIndicatorFunction = <Option, IsMulti extends boolean, Group extends GroupBase<Option>>() => DropdownIndicatorProps<Option, IsMulti, Group>
