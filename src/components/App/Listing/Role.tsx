import { Role } from '@/types/models/role'
import { useEffect } from 'react'
import LoadingContent from '../Loading/Content'
import sweetAlert from '@/libs/sweet-alert2'
import useRequest from '@/hooks/request'
import { RoleListingProps } from '@/types/listings/role'
import Table from '../Table'
import { Columns } from '@/types/components/table'
import { generateColumnDefObject } from '@/utils/table'
import { formatForDateTimeLocalInput } from '@/libs/luxon'
import FilterEngine from '@/components/App/FilterEngine'
import { useTranslation } from 'react-i18next'
import useTable from '@/hooks/table'
import { ActionContextMenuButton } from '@/components/App/Button'
import { getRoleListing } from '@/utils/query'
import LoadingModal from '../Loading/Modal'

const RoleListing = ({ setID, setViewing, setVisible }: RoleListingProps) => {
  const { t } = useTranslation()
  const {
    paginationState: [pagination, setPagination],
    sortingState: [sorting, setSorting],
    queryState: [query, setQuery],
    params,
  } = useTable()
  const { data, refetch, isFetching } = getRoleListing(params)
  const { deleteAsync, isLoading } = useRequest('/setting/role')
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
  ]

  useEffect(() => {
    refetch()
  }, [query, sorting])

  return (
    <>
      <div className="py-3">
        <FilterEngine
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
                    permissions: ['roles.view'],
                  }}
                  editDropdownItemProps={{
                    onClick: () => {
                      setViewing(false)
                      setID(id)
                      setVisible(true)
                    },
                    permissions: ['roles.update'],
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
                    permissions: ['roles.delete'],
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
                    permissions: ['roles.delete'],
                  }}
                />
              </>
            )
          }}
        />
      )}
      <LoadingModal loading={isLoading} />
    </>
  )
}

export default RoleListing
