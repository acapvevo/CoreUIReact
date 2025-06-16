import { useAppQuery } from '@/libs/react-query'
import { Role } from '@/types/models/role'
import { useEffect } from 'react'
import LoadingContent from '../Loading/Content'
import sweetAlert from '@/libs/sweet-alert2'
import useRequest from '@/hooks/request'
import { RoleListingProps } from '@/types/listings/role'
import Table from '../Table'
import { Columns, Paginate } from '@/types/components/table'
import { generateColumnDefObject, generateStatusColumnDef } from '@/utils/table'
import { formatForDateTimeLocalInput } from '@/libs/luxon'
import SearchBuilder from '@/components/App/SearchBuilder'
import { useTranslation } from 'react-i18next'
import useTable from '@/hooks/table'
import { ActionContextMenuButton, ActionGroupButton } from '@/components/App/Button'

const RoleListing = ({ counter, setID, setViewing, setVisible }: RoleListingProps) => {
  const { t } = useTranslation()
  const {
    paginationState: [pagination, setPagination],
    sortingState: [sorting, setSorting],
    queryState: [query, setQuery],
    params,
  } = useTable()
  const { data, refetch, isFetching } = useAppQuery<Paginate<Role>>({
    url: `/setting/role?${params.toString()}`,
    method: 'GET',
    queryKey: ['role', 'list'],
  })
  const { deleteAsync } = useRequest('/setting/role')
  const fields: Columns<Role> = [
    {
      label: t('role'),
      name: 'name',
      ...generateColumnDefObject<Role>(t('role'), 'name'),
      includeInQuery: true,
      includeInTable: true,
    },
    {
      label: t('created_at'),
      name: 'created_at',
      inputType: 'datetime-local',
      defaultValue: formatForDateTimeLocalInput(new Date()),
      ...generateColumnDefObject<Role>(t('created_at'), 'created_at'),
      includeInQuery: true,
      includeInTable: true,
    },
    {
      label: t('in_used'),
      name: 'in_used',
      ...generateColumnDefObject<Role>(t('in_used'), 'in_used'),
      cell: ({ getValue }) => (getValue() ? 'Yes' : 'No'),
      includeInQuery: false,
      includeInTable: true,
    },
    generateStatusColumnDef(),
  ]

  useEffect(() => {
    refetch()
  }, [counter, query, sorting])

  return (
    <>
      <div className="py-3">
        <SearchBuilder
          query={query}
          setQuery={setQuery}
          fields={fields.filter((field) => field.includeInQuery)}
        />
      </div>
      {isFetching ? (
        <LoadingContent />
      ) : (
        <Table
          data={data}
          columnDef={fields.filter((field) => field.includeInTable)}
          sorting={sorting}
          setSorting={setSorting}
          setPagination={setPagination}
          pagination={pagination}
          RowsContextMenu={({
            row: {
              original: { id, deleted_at },
            },
          }) => {
            return (
              <>
                <ActionContextMenuButton
                  viewDropdownItemProps={{
                    onClick: () => {
                      setViewing(true)
                      setID(id)
                      setVisible(true)
                    },
                  }}
                  editDropdownItemProps={{
                    onClick: () => {
                      setViewing(false)
                      setID(id)
                      setVisible(true)
                    },
                  }}
                  deleteDropdownItemProps={{
                    className: !!deleted_at ? 'd-none' : '',
                    onClick: () => {
                      sweetAlert({
                        title: t('delete_role'),
                        text: t('are_you_sure_you_want_to_delete_this_role?'),
                        type: 'question',
                        showCancelButton: true,
                        cancelButtonText: t('no'),
                        confirmButtonText: t('yes'),
                      }).then(async (result) => {
                        if (result.isConfirmed && (await deleteAsync(id))) refetch()
                      })
                    },
                  }}
                  restoreDropdownItemProps={{
                    className: !!deleted_at ? '' : 'd-none',
                    onClick: () => {
                      sweetAlert({
                        title: t('restore_role'),
                        text: t('are_you_sure_you_want_to_restore_this_role?'),
                        type: 'question',
                        showCancelButton: true,
                        cancelButtonText: t('no'),
                        confirmButtonText: t('yes'),
                      }).then(async (result) => {
                        if (result.isConfirmed && (await deleteAsync(id))) refetch()
                      })
                    },
                  }}
                />
              </>
            )
          }}
        />
      )}
    </>
  )
}

export default RoleListing
