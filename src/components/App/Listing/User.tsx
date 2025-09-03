import useRequest from '@/hooks/request'
import sweetAlert from '@/libs/sweet-alert2'
import { UserListingProps } from '@/types/listings/user'
import { User } from '@/types/models/user'
import { useEffect } from 'react'
import LoadingContent from '../Loading/Content'
import { generateColumnDefObject } from '@/utils/table'
import { formatForDateTimeLocalInput } from '@/libs/luxon'
import { Columns } from '@/types/components/table'
import Table from '../Table'
import { useTranslation } from 'react-i18next'
import useTable from '@/hooks/table'
import { ActionContextMenuButton } from '@/components/App/Button'
import LoadingModal from '@/components/App/Loading/Modal'
import { Role } from '@/types/models/role'
import { getUserListing, getUsers } from '@/utils/query'
import { QueryBuilderComponent } from '@syncfusion/ej2-react-querybuilder'
import QueryBuilder from '../QueryBuilder'

const UserListing = ({ setID, setViewing, setVisible }: UserListingProps) => {
  const { t } = useTranslation()
  const {
    paginationState: [pagination, setPagination],
    sortingState: [sorting, setSorting],
    queryState: [_, setQuery],
    params,
  } = useTable()
  const { data, refetch, isFetching } = getUserListing(params)
  const { data: users } = getUsers()
  const { deleteAsync, isLoading } = useRequest('/setting/user')
  const fields: Columns<User> = [
    {
      field: 'name',
      label: t('name'),
      type: 'string',
      ...generateColumnDefObject<User>(t('name'), 'name'),
      includeInQuery: true,
      includeInTable: true,
    },
    {
      field: 'email',
      label: t('email_address'),
      type: 'string',
      ...generateColumnDefObject<User>(t('email_address'), 'email'),
      includeInQuery: true,
      includeInTable: true,
    },
    {
      field: 'roles.name',
      label: t('roles'),
      type: 'array',
      ...generateColumnDefObject<User>(t('roles'), 'roles'),
      cell: ({ getValue }) => {
        return (getValue() as Role[]).map(({ name }) => name).join(', ')
      },
      includeInQuery: true,
      includeInTable: true,
    },
    {
      field: 'created_at',
      label: t('created_at'),
      type: 'date',
      ...generateColumnDefObject<User>(t('created_at'), 'created_at'),
      includeInQuery: true,
      includeInTable: true,
    },
  ]

  useEffect(() => {
    refetch()
  }, [params.toString()])

  return (
    <>
      <div className="py-3">
        <QueryBuilder dataSource={users} fields={fields} setQuery={setQuery} />
      </div>
      {isFetching ? (
        <LoadingContent />
      ) : (
        <Table
          data={data}
          columnDef={fields.filter((field) => field.includeInTable)}
          sorting={sorting}
          setSorting={setSorting}
          pagination={pagination}
          setPagination={setPagination}
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
                    permissions: ['users.view'],
                  }}
                  editDropdownItemProps={{
                    onClick: () => {
                      setViewing(false)
                      setID(id)
                      setVisible(true)
                    },
                    permissions: ['users.update'],
                  }}
                  deleteDropdownItemProps={{
                    className: !!deleted_at ? 'd-none' : '',
                    onClick: () => {
                      sweetAlert({
                        title: t('delete_user'),
                        text: t('are_you_sure_you_want_to_delete_this_user?'),
                        type: 'question',
                        showCancelButton: true,
                        cancelButtonText: t('no'),
                        confirmButtonText: t('yes'),
                      }).then(async (result) => {
                        if (result.isConfirmed) {
                          const isSuccess = await deleteAsync(id)

                          if (isSuccess) refetch()
                        }
                      })
                    },
                    permissions: ['users.delete'],
                  }}
                  restoreDropdownItemProps={{
                    className: !!deleted_at ? '' : 'd-none',
                    onClick: () => {
                      sweetAlert({
                        title: t('restore_user'),
                        text: t('are_you_sure_you_want_to_restore_this_user?'),
                        type: 'question',
                        showCancelButton: true,
                        cancelButtonText: t('no'),
                        confirmButtonText: t('yes'),
                      }).then(async (result) => {
                        if (result.isConfirmed) {
                          const isSuccess = await deleteAsync(`${id}`)

                          if (isSuccess) refetch()
                        }
                      })
                    },
                    permissions: ['users.delete'],
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

export default UserListing
