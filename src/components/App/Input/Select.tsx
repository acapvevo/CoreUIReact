import React from 'react'
import { components } from 'react-select'

import ReactSelect from 'react-select'
import AsyncReactSelect from 'react-select/async'
import { SelectComponent } from '@/types/components/select'
import { ThemeConfig } from 'react-select/dist/declarations/src/theme'
import useTheme from '@/hooks/theme'

const IndicatorSeparator: (typeof components)['IndicatorSeparator'] = () => {
  return <></>
}

const DropdownIndicator: (typeof components)['DropdownIndicator'] = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <span></span>
    </components.DropdownIndicator>
  )
}

const SelectTheme: ThemeConfig = (theme) => {
  return {
    ...theme,
    colors: {
      ...theme.colors,
      primary: 'var(--cui-primary)',
      danger: 'var(--cui-danger)',
    },
  }
}

const Select: SelectComponent = ({ async, components, size, isMulti, ...props }) => {
  const SelectType = async ? AsyncReactSelect : ReactSelect
  const suffix = size ? `-${size}` : ''
  const multiplicator = isMulti ? 2 : 1
  const {isDark, isLight} = useTheme()

  return (
    <SelectType
      components={{ DropdownIndicator, IndicatorSeparator, ...components }}
      theme={SelectTheme}
      styles={{
        control: (provided, { isDisabled, isFocused }) => ({
          ...provided,
          backgroundColor: `var(--select${isDisabled ? '-disabled' : ''}-bg)`,
          borderColor: `var(--select${isDisabled ? '-disabled' : isFocused ? '-focus' : ''}-border-color)`,
          borderWidth: 'var(--select-border-width)',
          lineHeight: 'var(--select-line-height)',
          fontSize: `var(--select-font-size${suffix})`,
          fontWeight: 'var(--select-font-weight)',
          minHeight: `calc((var(--select-line-height)*var(--select-font-size${suffix})) + (var(--select-padding-y${suffix})*2) + (var(--select-border-width)*2))`,
          ':hover': {
            borderColor: 'var(--select-focus-border-color)',
          },
        }),
        singleValue: ({ marginLeft, marginRight, ...provided }, { isDisabled }) => ({
          ...provided,
          color: `var(--select${isDisabled ? '-disabled' : ''}-color)`,
        }),
        valueContainer: (provided) => ({
          ...provided,
          padding: `calc(var(--select-padding-y${suffix})/${multiplicator}) calc(var(--select-padding-x${suffix})/${multiplicator})`,
        }),
        dropdownIndicator: () => ({
          height: '100%',
          width: 'var(--select-indicator-padding)',
          backgroundImage: 'var(--select-indicator)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: `right var(--select-padding-x) center`,
          backgroundSize: 'var(--select-bg-size)',
        }),
        input: ({ margin, paddingTop, paddingBottom, ...provided }) => ({
          ...provided,
        }),
        option: (provided, { isDisabled }) => ({
          ...provided,
          margin: `calc(var(--select-padding-y${suffix})/2) calc(var(--select-padding-x${suffix})/2)`,
          color: `var(--select${isDisabled ? '-disabled' : ''}-color)`,
          ':hover': {
            color: isLight ? 'var(--select-color)' : `var(--select-bg)`,
          },
        }),
        menu: ({ marginTop, ...provided }) => ({
          ...provided,
          backgroundColor: `var(--select-bg)`,
        }),
        multiValue: (provided) => ({
          ...provided,
          margin: `calc(var(--select-padding-y${suffix})/2) calc(var(--select-padding-x${suffix})/2)`,
        }),
        clearIndicator: ({ padding, ...provided }) => ({
          ...provided,
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: 'var(--select-indicator-padding)',
        }),
        multiValueLabel: ({ padding, paddingLeft, fontSize, ...provided }) => ({
          ...provided,
          padding: `0 var(--select-padding-y${suffix})`,
          whiteSpace: 'normal',
        }),
      }}
      isMulti={isMulti}
      {...props}
    />
  )
}

export default Select
