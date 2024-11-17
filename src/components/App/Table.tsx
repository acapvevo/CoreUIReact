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
  CFormSelect,
  CRow,
  CFormLabel,
  CCol,
} from '@coreui/react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  PaginationState,
} from '@tanstack/react-table'
import { range } from 'lodash'
import { CSSProperties, ReactNode, useState } from 'react'

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
import ContextMenu from './ContextMenu'
import {
  DragAlongCellType,
  DraggableHeaderType,
  TableContentType,
  TableContextMenuType,
  TableProps,
} from '@/types/components/table'
import Icon from './Icon'

const Table: <T>(props: TableProps<T>) => ReactNode = ({
  data: defaultData,
  columnDef: defaultColumns,
  style,
  captionTop,
  enableRowSelection,
  sorting,
  setSorting,
  usePagination = true,
}) => {
  const [data] = useState(() => [...defaultData])
  const [columns] = useState<typeof defaultColumns>(() => [...defaultColumns])
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState({})
  const [columnOrder, setColumnOrder] = useState<string[]>(() => columns.map((c) => c.id!))
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const useSorting = !!sorting && !!setSorting

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
    onSortingChange: setSorting,
    enableRowSelection,
    enableMultiRowSelection: false,
    manualPagination: !usePagination,
    manualSorting: useSorting,
    isMultiSortEvent: () => true,
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
      sorting,
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
        <CRow>
          <CCol lg={2}>
            <CRow>
              <CFormLabel htmlFor="page_number" className="col-sm-4 col-form-label">
                Show
              </CFormLabel>
              <CCol sm={8}>
                <CFormSelect
                  id="page_number"
                  value={table.getState().pagination.pageSize.toString()}
                  onChange={(e) => {
                    table.setPageSize(Number(e.target.value))
                  }}
                  options={[10, 20, 30, 40, 50].map((value) => {
                    return {
                      label: `${value} rows`,
                      value: value.toString(),
                    }
                  })}
                />
              </CCol>
            </CRow>
          </CCol>
          <CCol lg={10}></CCol>
        </CRow>
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
          useSorting={useSorting}
        />
      </DndContext>
      {usePagination && (
        <CRow>
          <CCol lg={4}>
            <span>
              {table.getState().pagination.pageIndex + 1} of {table.getPageCount().toLocaleString()}{' '}
              pages
            </span>
          </CCol>
          <CCol lg={8}>
            <CPagination align="end">
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
                } else if (
                  pageIndex >= currPageIndexState - 2 &&
                  pageIndex <= currPageIndexState + 2
                ) {
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
          </CCol>
        </CRow>
      )}
    </>
  )
}

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
            label={column.columnDef.header?.toString()}
            disabled={!column.getCanHide()}
          />
        )
      })}
    </ContextMenu>
  )
}

const DraggableHeader: DraggableHeaderType = ({ header, useSorting }) => {
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
      {header.isPlaceholder ? null : (
        <div className="d-flex justify-content-between align-items-center">
          <span
            onClick={header.column.getToggleSortingHandler()}
            className={header.column.getCanSort() ? '' : 'pe-none user-select-none'}
          >
            {flexRender(header.column.columnDef.header, header.getContext())}
            {useSorting && header.column.getCanSort() && (
              <Icon
                className="icon-lg mx-1"
                height="none"
                icon={
                  {
                    asc: 'prime:sort-up-fill',
                    desc: 'prime:sort-down-fill',
                  }[header.column.getIsSorted() as string] ?? 'prime:sort'
                }
              />
            )}
          </span>
          <CButton {...attributes} {...listeners}>
            <Icon className="icon icon-lg" height="none" icon="mdi:drag" />
          </CButton>
        </div>
      )}
    </CTableHeaderCell>
  )
}

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

const TableContent: TableContentType = ({ table, style, columnOrder, captionTop, useSorting }) => {
  const [visible, setVisible] = useState(false)
  const [position, setPosition] = useState({
    top: '0px',
    left: '0px',
  })

  return (
    <>
      <div className="table-responsive py-3" style={style}>
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
                    <DraggableHeader useSorting={useSorting} header={header} key={header.id} />
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

export default Table
