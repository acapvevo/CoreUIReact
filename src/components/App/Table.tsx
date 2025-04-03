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
  Row,
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
  TableHeaderContextMenuType,
  TableProps,
  TableRowsContextMenuType,
} from '@/types/components/table'
import Icon from './Icon'

const Table: <T>(props: TableProps<T>) => ReactNode = ({
  data: defaultData,
  columnDef: defaultColumns,
  enableRowSelection,
  sorting,
  setSorting,
  pagination,
  setPagination,
  ...props
}) => {
  const [data] = useState(() => [...(defaultData?.data ?? [])])
  const [columns] = useState<typeof defaultColumns>(() => [...defaultColumns])
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState({})
  const [columnOrder, setColumnOrder] = useState<string[]>(() => columns.map((c) => c.id!))
  const usePagination = !!pagination && !!setPagination
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
    rowCount: defaultData?.total,
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
        <TableContent table={table} columnOrder={columnOrder} useSorting={useSorting} {...props} />
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

const TableHeaderContextMenu: TableHeaderContextMenuType = ({ table, ...rest }) => {
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

const TableRowsContextMenu: TableRowsContextMenuType = ({ children, ...rest }) => {
  return <ContextMenu {...rest}>{children}</ContextMenu>
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

const DragAlongCell: DragAlongCellType = ({ cell: { column, getContext } }) => {
  const { isDragging, setNodeRef, transform } = useSortable({
    id: column.id,
  })
  const meta = column.columnDef.meta

  const style: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: 'relative',
    transition: 'width transform 0.2s ease-in-out',
    width: column.getSize(),
    zIndex: isDragging ? 2 : 1,
    ...(meta && meta.getCellContext && meta.getCellContext(getContext()).style),
  }

  return (
    <CTableDataCell
      {...(meta && meta.getCellContext && meta.getCellContext(getContext()))}
      style={style}
      ref={setNodeRef}
    >
      {flexRender(column.columnDef.cell, getContext())}
    </CTableDataCell>
  )
}

const TableContent: TableContentType = ({
  table,
  style,
  columnOrder,
  captionTop,
  useSorting,
  RowsContextMenu,
  RowProps,
}) => {
  const [headerContextMenuVisible, setHeaderContextMenuVisible] = useState(false)
  const [rowsContextMenuVisible, setRowsContextMenuVisible] = useState(false)
  const [position, setPosition] = useState({
    top: '0px',
    left: '0px',
  })
  const [row, setRow] = useState<Row<any>>()

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
              setHeaderContextMenuVisible(true)
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
              const { onClick, onContextMenu, active, ...props } = RowProps ? RowProps(row) : {}
              return (
                <CTableRow
                  key={row.id}
                  {...props}
                  onClick={(e) => {
                    row.getToggleSelectedHandler()(e)
                    onClick && onClick(e)
                  }}
                  active={row.getIsSelected() && active}
                  onContextMenu={(e) => {
                    e.preventDefault()

                    setPosition({
                      top: `${e.pageY - 10}px`,
                      left: `${e.pageX - 40}px`,
                    })
                    setRow(row)
                    setRowsContextMenuVisible(true)
                    onContextMenu && onContextMenu(e)
                  }}
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
      {headerContextMenuVisible && (
        <TableHeaderContextMenu
          table={table}
          style={{ top: position.top, left: position.left }}
          setVisible={setHeaderContextMenuVisible}
        />
      )}
      {RowsContextMenu && row && rowsContextMenuVisible && (
        <TableRowsContextMenu
          style={{ top: position.top, left: position.left }}
          setVisible={setRowsContextMenuVisible}
        >
          <RowsContextMenu row={row} />
        </TableRowsContextMenu>
      )}
    </>
  )
}

export default Table
