import useRequest from '@/hooks/request'
import { useAppQuery } from '@/libs/react-query'
import sweetAlert from '@/libs/sweet-alert2'
import { UserListingProps } from '@/types/listings/user'
import { User } from '@/types/models/user'
import { useEffect, useState } from 'react'
import Action from '../Button/Action'
import LoadingContent from '../Loading/Content'
import { formatQuery, RuleGroupType } from 'react-querybuilder'
import SearchBuilder from '../SearchBuilder'
import { generateColumnDefObject } from '@/utils/table'
import { formatForDateTimeLocalInput } from '@/libs/luxon'
import { Column } from '@/types/components/table'
import { SortingState } from '@tanstack/react-table'
import Table from '../Table'

const UserListing = ({ counter, setID, setViewing, setVisible }: UserListingProps) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [query, setQuery] = useState<RuleGroupType>({ combinator: 'and', rules: [] })
  const { data, refetch, isFetching } = useAppQuery<User[]>({
    url: `/setting/user?query=${formatQuery(query, 'json_without_ids')}&sort=${encodeURIComponent(JSON.stringify(sorting))}`,
    method: 'GET',
    queryKey: ['user', 'list'],
  })
  const { deleteAsync } = useRequest('/setting/user')
  const fields: Column<User>[] = [
    { name: 'name', label: 'Name', ...generateColumnDefObject<User>('Name', 'name') },
    {
      name: 'email',
      label: 'Email Address',
      ...generateColumnDefObject<User>('Email Address', 'email'),
    },
    {
      name: 'created_at',
      label: 'Created At',
      inputType: 'datetime-local',
      defaultValue: formatForDateTimeLocalInput(new Date()),
      ...generateColumnDefObject<User>('Created At', 'created_at'),
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
                title: 'Delete User',
                text: 'Are you sure you want to delete this user?',
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
          />
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
  }, [counter, query, sorting])

  if (isFetching) return <LoadingContent />

  return (
    <>
      <div className="py-3">
        <SearchBuilder
          query={query}
          setQuery={setQuery}
          fields={fields.filter((field) => field.header !== 'Action')}
        />
      </div>
      <Table
        data={data!.filter((role) => !role.deleted_at)}
        columnDef={fields}
        sorting={sorting}
        setSorting={setSorting}
      />
    </>
  )
}

export default UserListing
