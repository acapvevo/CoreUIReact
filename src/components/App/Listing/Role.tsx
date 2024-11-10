import { useAppQuery } from '@/libs/react-query'
import { Role } from '@/types/models/role'
import { ColumnDef } from '@tanstack/react-table'
import { useEffect } from 'react'
import Action from '../Button/Action'
import { Table } from '../Table'
import LoadingContent from '../Loading/Content'
import sweetAlert from '@/libs/sweet-alert2'
import useRequest from '@/hooks/request'
import { RoleListingProps } from '@/types/listings/role'

const RoleListing = ({ counter, setID, setViewing, setVisible }: RoleListingProps) => {
  const { data, refetch, isFetching } = useAppQuery<Role[]>({
    url: '/setting/role',
    method: 'GET',
    queryKey: ['role', 'list', 'setting'],
  })
  const { deleteAsync } = useRequest('/setting/role')
  const columnDef: ColumnDef<Role>[] = [
    {
      header: 'Role Name',
      accessorKey: 'name',
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
  }, [counter])

  if (isFetching) return <LoadingContent />

  return <Table data={data!.filter((role) => !role.deleted_at)} columnDef={columnDef} />
}

export default RoleListing
