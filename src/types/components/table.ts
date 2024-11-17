import { CTableProps } from '@coreui/react/dist/esm/components/table/CTable'
import {
  Cell,
  ColumnDef,
  Header,
  SortingState,
  Table,
} from '@tanstack/react-table'
import { Dispatch, SetStateAction } from 'react'
import { Field } from 'react-querybuilder'
import { ContextMenuProps } from './context_menu'

export type Column<T> = ColumnDef<T> & Field
export type Columns<T> = Column<T>[]

export interface TableProps<T> extends CTableProps {
  data: Array<T>
  columnDef: ColumnDef<T>[]
  pageSize?: number
  usePagination?: boolean
  enableRowSelection?: boolean
  setSorting?: Dispatch<SetStateAction<SortingState>>
  sorting?: SortingState
}

interface TableContentProps<T> extends CTableProps {
  table: Table<T>
  columnOrder: string[]
  useSorting: boolean
}
export type TableContentType = <T>(props: TableContentProps<T>) => JSX.Element

export type DraggableHeaderType = <T>(props: {
  header: Header<T, unknown>
  useSorting: boolean
}) => JSX.Element
export type DragAlongCellType = <T>({ cell }: { cell: Cell<T, unknown> }) => JSX.Element

export type TableContextMenuType = <T>(
  props: {
    table: Table<T>
  } & ContextMenuProps,
) => JSX.Element
