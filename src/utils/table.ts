import { formatFromISO } from '@/libs/luxon'
import { AccessorFnColumnDef, ColumnDef } from '@tanstack/react-table'
import { Role } from '@/types/models/role'
import { useTranslation } from 'react-i18next'
import { Column } from '@/types/components/table'
import { Leaves } from '@/types/helper'

export const checkDisplayValueByColName = (colName: string, value: any) => {
  switch (colName) {
    case 'updated_at':
    case 'created_at':
    case 'deleted_at':
      if (value) return `${formatFromISO(value, 'FFF')}`

      return ''
    default:
      return value
  }
}

export const generateColumnDefObject: <T>(
  header: string,
  column: Leaves<T>,
) => AccessorFnColumnDef<T> = (header, column) => {
  return {
    header,
    id: column,
    accessorFn: (row) => {
      const value = column.split('.').reduce((acc, part) => {
        return acc && acc[part] !== undefined ? acc[part] : undefined
      }, row)

      return checkDisplayValueByColName(column, value)
    },
  }
}

export const generateStatusColumnDef = function <T>() {
  const { t } = useTranslation()

  return {
    label: t('status'),
    name: 'deleted_at',
    ...generateColumnDefObject<T>(t('status'), 'deleted_at'),
    cell: ({ getValue }) => (getValue() != null ? t('active') : t('inactive')),
    includeInQuery: false,
    includeInTable: true,
    meta: {
      getCellContext: ({ getValue }) => {
        return {
          color: `${getValue() != null ? 'success' : 'danger'}`,
        }
      },
    },
  } as Column<T>
}
