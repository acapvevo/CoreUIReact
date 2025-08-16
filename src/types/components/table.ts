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
import { Dispatch, PropsWithChildren, ReactElement, ReactNode, SetStateAction } from 'react'
import { Field } from 'react-querybuilder'
import { ContextMenuProps } from './context_menu'
import { CTableRowProps } from '@coreui/react/dist/esm/components/table/CTableRow'
import { Model } from '@/types/model'

export type Column<T extends Model> = ColumnDef<T> &
  Field & { includeInTable?: boolean; includeInQuery?: boolean }
export type Columns<T extends Model> = Column<T>[]

export interface TableProps<T extends Model> extends CTableProps {
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

export interface TableContentProps<T extends Model> extends CTableProps {
  table: Table<T>
  columnOrder: string[]
  useSorting: boolean
  RowsContextMenu?: (props: { row: Row<T> }) => ReactNode
  RowProps?: (row: Row<T>) => CTableRowProps
}
export type TableContentType = <T extends Model>(props: TableContentProps<T>) => JSX.Element

export type DraggableHeaderType = <T>(props: {
  header: Header<T, unknown>
  useSorting: boolean
}) => JSX.Element
export type DragAlongCellType = <T>({ cell }: { cell: Cell<T, unknown> }) => JSX.Element

interface TableContextMenuProps<T extends Model> {
  table: Table<T>
}

export type TableHeaderContextMenuType = <T extends Model>(
  props: TableContextMenuProps<T> & ContextMenuProps,
) => JSX.Element

export type TableRowsContextMenuType = <T extends Model>(
  props: PropsWithChildren<Partial<TableContextMenuProps<T>> & ContextMenuProps>,
) => JSX.Element

export interface Paginate<T> {
  data: T[]
  links: {
    first: string
    last: string
    prev: string | null
    next: string | null
  }
  meta: {
    current_page: number
    from: number
    last_page: number
    links: Link[]
    path: string
    per_page: number
    to: number
    total: number
  }
}

interface Link {
  url: string | null
  label: string
  active: boolean
}
