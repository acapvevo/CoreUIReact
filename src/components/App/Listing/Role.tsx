import { useAppQuery } from '@/libs/react-query'
import { Role } from '@/types/models/role'
import { SortingState } from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import Action from '../Button/Action'
import LoadingContent from '../Loading/Content'
import sweetAlert from '@/libs/sweet-alert2'
import useRequest from '@/hooks/request'
import { RoleListingProps } from '@/types/listings/role'
import Table from '../Table'
import { Columns } from '@/types/components/table'
import { generateColumnDefObject } from '@/utils/table'
import { formatForDateTimeLocalInput } from '@/libs/luxon'
import SearchBuilder from '@/components/App/SearchBuilder'
import { formatQuery, RuleGroupType } from 'react-querybuilder'

const RoleListing = ({ counter, setID, setViewing, setVisible }: RoleListingProps) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [query, setQuery] = useState<RuleGroupType>({ combinator: 'and', rules: [] })
  const { data, refetch, isFetching } = useAppQuery<Role[]>({
    url: `/setting/role?query=${formatQuery(query, 'json_without_ids')}&sort=${encodeURIComponent(JSON.stringify(sorting))}`,
    method: 'GET',
    queryKey: ['role', 'list', 'setting'],
  })
  const { deleteAsync } = useRequest('/setting/role')
  const fields: Columns<Role> = [
    {
      label: 'Role',
      name: 'name',
      ...generateColumnDefObject<Role>('Role', 'name'),
    },
    {
      name: 'created_at',
      label: 'Created At',
      inputType: 'datetime-local',
      defaultValue: formatForDateTimeLocalInput(new Date()),
      ...generateColumnDefObject<Role>('Created At', 'created_at'),
    },
    {
      header: 'Action',
      enableHiding: false,
      enableSorting: false,
      cell: (cell) => {
        return (
          <Action
            onClickView={() => {
              setViewing(true)
              setID(cell.row.original.id)
              setVisible(true)
            }}
            onClickEdit={() => {
              setViewing(false)
              setID(cell.row.original.id)
              setVisible(true)
            }}
            onClickDelete={() => {
              sweetAlert({
                title: 'Delete Role',
                text: 'Are you sure you want to delete this role?',
                type: 'question',
                showCancelButton: true,
                cancelButtonText: 'No',
                confirmButtonText: 'Yes',
              }).then(async (result) => {
                if (result.isConfirmed) {
                  const isSuccess = await deleteAsync(cell.row.original.id)

                  if (isSuccess) refetch()
                }
              })
            }}
          ></Action>
        )
      },
      meta: {
        getCellContext: () => {
          return {
            style: { width: '5%' },
          }
        },
      },
    },
  ]

  useEffect(() => {
    refetch()
  }, [counter, query,sorting])

  return (
    <>
      <div className="py-3">
        <SearchBuilder
          query={query}
          setQuery={setQuery}
          fields={fields.filter((field) => field.header !== 'Action')}
        />
      </div>
      {isFetching ? (
        <LoadingContent />
      ) : (
        <Table
          data={data!.filter((role) => !role.deleted_at)}
          columnDef={fields}
          sorting={sorting}
          setSorting={setSorting}
        />
      )}
    </>
  )
}

export default RoleListing
