import useRequest from '@/hooks/request'
import { useAppQuery } from '@/libs/react-query'
import sweetAlert from '@/libs/sweet-alert2'
import { UserListingProps } from '@/types/listings/user'
import { User } from '@/types/models/user'
import { ColumnDef } from '@tanstack/react-table'
import { useEffect } from 'react'
import Action from '../Button/Action'
import LoadingContent from '../Loading/Content'
import { Table } from '../Table'

const UserListing = ({ counter, setID, setViewing, setVisible }: UserListingProps) => {
  const { data, refetch, isFetching } = useAppQuery<User[]>({
    url: '/setting/user',
    method: 'GET',
    queryKey: ['user', 'list'],
  })
  const { deleteAsync } = useRequest('/setting/user')
  const columnDef: ColumnDef<User>[] = [
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Email',
      accessorKey: 'email',
    },
    {
      header: 'Action',
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
  }, [counter])

  if (isFetching) return <LoadingContent />

  return <Table data={data!.filter((role) => !role.deleted_at)} columnDef={columnDef} />
}

export default UserListing
