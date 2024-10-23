import { formatFromISO } from '@/libs/luxon'

export const checkDisplayValueByColName = (colName: string, value: any) => {
  switch (colName) {
    case 'Date':
      if (value) return `${formatFromISO(value)}`

      return ''
    default:
      return value
  }
}
