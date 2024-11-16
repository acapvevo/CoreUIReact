import { formatFromISO } from '@/libs/luxon'
import { ColumnDef } from '@tanstack/react-table'

export const checkDisplayValueByColName = (colName: string, value: any) => {
  switch (colName) {
    case 'created_at':
      if (value) return `${formatFromISO(value, 'FFF')}`

      return ''
    default:
      return value
  }
}

export const generateColumnDefObject: <T>(header: string, column: string) => ColumnDef<T> = (
  header,
  column,
) => {
  return {
    header: header,
    accessorFn: (row) => checkDisplayValueByColName(column, row[column])
  }
}
