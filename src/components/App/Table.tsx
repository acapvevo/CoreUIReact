import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CTableFoot,
  CPagination,
  CPaginationItem,
  CButton,
  CDropdownItem,
  CFormSwitch,
} from '@coreui/react'
import { CTableProps } from '@coreui/react/dist/esm/components/table/CTable'
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  Table as TableReturn,
  Header,
  Cell,
  PaginationState,
} from '@tanstack/react-table'
import { range } from 'lodash'
import { CSSProperties, Dispatch, ReactNode, SetStateAction, useState } from 'react'

// needed for table body level scope DnD setup
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  type DragEndEvent,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers'
import { arrayMove, SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'

// needed for row & cell level scope DnD setup
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Icon } from '@iconify/react'
import { ContextMenuProps } from '@/types/components/context_menu'
import ContextMenu from './ContextMenu'

interface TableProps<T> extends CTableProps {
  data: Array<T>
  columnDef: ColumnDef<T>[]
  pageSize?: number
  usePagination?: boolean
  enableRowSelection?: boolean
}

export const Table: <T>(props: TableProps<T>) => ReactNode = ({
  data: defaultData,
  columnDef: defaultColumns,
  pageSize,
  style,
  captionTop,
  usePagination,
  enableRowSelection = false,
}) => {
  const [data] = useState(() => [...defaultData])
  const [columns] = useState<typeof defaultColumns>(() => [...defaultColumns])
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState({})
  const [columnOrder, setColumnOrder] = useState<string[]>(() => columns.map((c) => c.id!))
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: pageSize ?? 50,
  })

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnOrderChange: setColumnOrder,
    onPaginationChange: setPagination,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    enableRowSelection,
    enableMultiRowSelection: false,
    manualPagination: !usePagination,
    defaultColumn: {
      minSize: 60,
      maxSize: 800,
    },
    columnResizeMode: 'onChange',
    state: {
      rowSelection,
      columnOrder,
      pagination,
      columnVisibility,
    },
  })

  // reorder columns after drag & drop
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (active && over && active.id !== over.id) {
      setColumnOrder((columnOrder) => {
        const oldIndex = columnOrder.indexOf(active.id as string)
        const newIndex = columnOrder.indexOf(over.id as string)
        return arrayMove(columnOrder, oldIndex, newIndex) //this is just a splice util
      })
    }
  }

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
  )

  return (
    <>
      {usePagination && (
        <CPagination size="sm" align="end">
          <CPaginationItem
            aria-label="Previous"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span aria-hidden="true">{'<'}</span>
          </CPaginationItem>
          {range(table.getPageCount()).map((pageIndex) => {
            const currPageIndexState = table.getState().pagination.pageIndex

            if (
              pageIndex == 0 ||
              (pageIndex >= currPageIndexState - 1 && pageIndex <= currPageIndexState + 1) ||
              pageIndex + 1 == table.getPageCount()
            ) {
              return (
                <CPaginationItem
                  key={pageIndex}
                  onClick={() => table.setPageIndex(pageIndex)}
                  active={currPageIndexState == pageIndex}
                >
                  <span aria-hidden="true">{pageIndex + 1}</span>
                </CPaginationItem>
              )
            } else if (pageIndex >= currPageIndexState - 2 && pageIndex <= currPageIndexState + 2) {
              return (
                <CPaginationItem disabled={true}>
                  <span aria-hidden="true">{'...'}</span>
                </CPaginationItem>
              )
            }
          })}
          <CPaginationItem
            aria-label="Next"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span aria-hidden="true">{'>'}</span>
          </CPaginationItem>
        </CPagination>
      )}
      <DndContext
        collisionDetection={closestCenter}
        modifiers={[restrictToHorizontalAxis]}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <TableContent
          table={table}
          style={style}
          columnOrder={columnOrder}
          captionTop={captionTop}
        />
      </DndContext>
    </>
  )
}

type TableContextMenuType = <T>(
  props: {
    table: TableReturn<T>
  } & ContextMenuProps,
) => JSX.Element
const TableContextMenu: TableContextMenuType = ({ table, ...rest }) => {
  return (
    <ContextMenu {...rest}>
      <CDropdownItem
        onClick={() => table.toggleAllColumnsVisible()}
        active={table.getIsAllColumnsVisible()}
      >
        Toggle All
      </CDropdownItem>
      {table.getAllLeafColumns().map((column, index) => {
        return (
          <CFormSwitch
            key={index}
            checked={column.getIsVisible()}
            onChange={column.getToggleVisibilityHandler()}
            label={column.id}
            disabled={!column.getCanHide()}
          />
        )
      })}
    </ContextMenu>
  )
}

type DraggableHeaderType = <T>({ header }: { header: Header<T, unknown> }) => JSX.Element
const DraggableHeader: DraggableHeaderType = ({ header }) => {
  const { attributes, isDragging, listeners, setNodeRef, transform } = useSortable({
    id: header.column.id,
  })

  const style: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: 'relative',
    transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
    transition: 'width transform 0.2s ease-in-out',
    whiteSpace: 'nowrap',
    width: header.column.getSize(),
    zIndex: isDragging ? 2 : 1,
  }

  return (
    <CTableHeaderCell colSpan={header.colSpan} ref={setNodeRef} style={style}>
      {header.isPlaceholder
        ? null
        : flexRender(header.column.columnDef.header, header.getContext())}
      <CButton {...attributes} {...listeners}>
        <Icon icon="mdi:drag" inline />
      </CButton>
    </CTableHeaderCell>
  )
}

type DragAlongCellType = <T>({ cell }: { cell: Cell<T, unknown> }) => JSX.Element
const DragAlongCell: DragAlongCellType = ({ cell }) => {
  const { isDragging, setNodeRef, transform } = useSortable({
    id: cell.column.id,
  })
  const meta = cell.column.columnDef.meta

  const style: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: 'relative',
    transform: CSS.Translate.toString({ ...transform!, y: 0 }), // translate instead of transform to avoid squishing
    transition: 'width transform 0.2s ease-in-out',
    width: cell.column.getSize(),
    zIndex: isDragging ? 2 : 1,
    ...(meta && meta.getCellContext && meta.getCellContext(cell.getContext()).style),
  }

  return (
    <CTableDataCell
      {...(meta && meta.getCellContext && meta.getCellContext(cell.getContext()))}
      style={style}
      ref={setNodeRef}
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </CTableDataCell>
  )
}

interface TableContentProps<T> extends CTableProps {
  table: TableReturn<T>
  columnOrder: string[]
}
type TableElementType = <T>(props: TableContentProps<T>) => JSX.Element
const TableContent: TableElementType = ({ table, style, columnOrder, captionTop }) => {
  const [visible, setVisible] = useState(false)
  const [position, setPosition] = useState({
    top: '0px',
    left: '0px',
  })

  return (
    <>
      <div className="table-responsive" style={style}>
        <CTable bordered hover captionTop={captionTop}>
          <CTableHead
            color="primary position-sticky top-0 z-1"
            onContextMenu={(e) => {
              e.preventDefault()
              setPosition({
                top: `${e.pageY - 10}px`,
                left: `${e.pageX - 40}px`,
              })
              setVisible(true)
            }}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <CTableRow key={headerGroup.id}>
                <SortableContext items={columnOrder} strategy={horizontalListSortingStrategy}>
                  {headerGroup.headers.map((header) => (
                    <DraggableHeader header={header} key={header.id} />
                  ))}
                </SortableContext>
              </CTableRow>
            ))}
          </CTableHead>
          <CTableBody>
            {table.getRowModel().rows.map((row) => {
              return (
                <CTableRow
                  key={row.id}
                  onClick={row.getToggleSelectedHandler()}
                  active={row.getIsSelected()}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <SortableContext
                        key={cell.id}
                        items={columnOrder}
                        strategy={horizontalListSortingStrategy}
                      >
                        <DragAlongCell key={cell.id} cell={cell} />
                      </SortableContext>
                    )
                  })}
                </CTableRow>
              )
            })}
          </CTableBody>
          {table
            .getFooterGroups()
            .map((group) => group.headers.map((header) => header.column.columnDef.footer))
            .flat()
            .filter(Boolean).length > 0 && (
            <CTableFoot>
              {table.getFooterGroups().map((footerGroup) => (
                <CTableRow key={footerGroup.id}>
                  {footerGroup.headers.map((header) => (
                    <CTableHeaderCell key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.footer, header.getContext())}
                    </CTableHeaderCell>
                  ))}
                </CTableRow>
              ))}
            </CTableFoot>
          )}
        </CTable>
      </div>
      {visible && (
        <TableContextMenu
          table={table}
          style={{ top: position.top, left: position.left }}
          setVisible={setVisible}
        />
      )}
    </>
  )
}
