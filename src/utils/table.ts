import { formatFromISO } from '@/libs/luxon'
import { ColumnDef } from '@tanstack/react-table'

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

export const generateColumnDefObject: <T>(header: string, column: string) => ColumnDef<T> = (
  header,
  column,
) => {
  return {
    header: header,
    id: column,
    accessorFn: (row) => checkDisplayValueByColName(column, row[column])
  }
}
