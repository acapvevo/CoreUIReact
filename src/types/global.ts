import { CTableDataCellProps } from '@coreui/react/dist/esm/components/table/CTableDataCell'
import '@tanstack/react-table'
import { CellContext, Row, RowData } from '@tanstack/react-table'

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    getCellContext?: (context: CellContext<TData, TValue>) => CTableDataCellProps
    getRowContext?: (context: Row<TData>) => CTableDataCellProps
  }
}
