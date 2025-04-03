import { CTableProps } from '@coreui/react/dist/esm/components/table/CTable'
import {
  Cell,
  ColumnDef,
  Header,
  PaginationState,
  Row,
  SortingState,
  Table,
} from '@tanstack/react-table'
import { Dispatch, PropsWithChildren, ReactNode, SetStateAction } from 'react'
import { Field } from 'react-querybuilder'
import { ContextMenuProps } from './context_menu'
import { CTableRowProps } from '@coreui/react/dist/esm/components/table/CTableRow'

export type Column<T> = ColumnDef<T> &
  Field & { includeInTable?: boolean; includeInQuery?: boolean }
export type Columns<T> = Column<T>[]

export interface TableProps<T> extends CTableProps {
  data?: Paginate<T>
  columnDef: ColumnDef<T>[]
  pageSize?: number
  usePagination?: boolean
  enableRowSelection?: boolean
  setSorting?: Dispatch<SetStateAction<SortingState>>
  sorting?: SortingState
  setPagination?: Dispatch<SetStateAction<PaginationState>>
  pagination?: PaginationState
  RowsContextMenu?: TableContentProps<T>['RowsContextMenu']
  RowProps?: TableContentProps<T>['RowProps']
}

interface TableContentProps<T> extends CTableProps {
  table: Table<T>
  columnOrder: string[]
  useSorting: boolean
  RowsContextMenu?: (props: { row: Row<T> }) => ReactNode
  RowProps?: (row: Row<T>) => CTableRowProps
}
export type TableContentType = <T>(props: TableContentProps<T>) => JSX.Element

export type DraggableHeaderType = <T>(props: {
  header: Header<T, unknown>
  useSorting: boolean
}) => JSX.Element
export type DragAlongCellType = <T>({ cell }: { cell: Cell<T, unknown> }) => JSX.Element

interface TableContextMenuProps<T> {
  table: Table<T>
}

export type TableHeaderContextMenuType = <T>(
  props: TableContextMenuProps<T> & ContextMenuProps,
) => JSX.Element

export type TableRowsContextMenuType = <T>(
  props: PropsWithChildren<Partial<TableContextMenuProps<T>> & ContextMenuProps>,
) => JSX.Element

export interface Paginate<T> {
  current_page: number
  data: T[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: Link[]
  next_page_url: string | null
  path: string
  per_page: number
  prev_page_url: string | null
  to: number
  total: number
}

interface Link {
  url: string | null
  label: string
  active: boolean
}
