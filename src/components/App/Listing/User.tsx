import useRequest from '@/hooks/request'
import { useAppQuery } from '@/libs/react-query'
import sweetAlert from '@/libs/sweet-alert2'
import { UserListingProps } from '@/types/listings/user'
import { User } from '@/types/models/user'
import { ColumnDef } from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import Action from '../Button/Action'
import LoadingContent from '../Loading/Content'
import { Table } from '../Table'
import { Field, formatQuery, RuleGroupType } from 'react-querybuilder'
import SearchBuilder from '../SearchBuilder'
import { generateColumnDefObject } from '@/utils/table'
import { formatForDateTimeLocalInput } from '@/libs/luxon'

const UserListing = ({ counter, setID, setViewing, setVisible }: UserListingProps) => {
  const [query, setQuery] = useState<RuleGroupType>({ combinator: 'and', rules: [] })
  const { data, refetch, isFetching } = useAppQuery<User[]>({
    url: `/setting/user?query=${formatQuery(query, 'json_without_ids')}`,
    method: 'GET',
    queryKey: ['user', 'list'],
  })
  const { deleteAsync } = useRequest('/setting/user')
  const fields = [
    { name: 'name', label: 'Name' },
    { name: 'email', label: 'Email Address' },
    {
      name: 'created_at',
      label: 'Created At',
      inputType: 'datetime-local',
      defaultValue: formatForDateTimeLocalInput(new Date()),
    },
  ]
  const columnDef: ColumnDef<User>[] = [
    ...fields.map(({ name, label }) => {
      return generateColumnDefObject<User>(label, name)
    }),
    {
      header: 'Action',
      enableHiding: false, 
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
  }, [counter, query])

  if (isFetching) return <LoadingContent />

  return (
    <>
      <div className="py-3">
        <SearchBuilder query={query} setQuery={setQuery} fields={fields} />
      </div>
      <Table data={data!.filter((role) => !role.deleted_at)} columnDef={columnDef} />
    </>
  )
}

export default UserListing
