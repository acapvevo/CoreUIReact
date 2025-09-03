import { RuleModel } from '@syncfusion/ej2-react-querybuilder'
import { PaginationState, SortingState } from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { formatQuery, RuleGroupType } from 'react-querybuilder'

const useTable = () => {
  const sortingState = useState<SortingState>([])
  const queryState = useState<RuleModel>({})
  const paginationState = useState<PaginationState>({
    pageSize: 10,
    pageIndex: 0,
  })

  const filters = useMemo(() => {
    return {
      query: JSON.stringify(queryState[0]),
      sort: JSON.stringify(sortingState[0]),
      paginate: JSON.stringify({
        size: paginationState[0].pageSize,
        page: paginationState[0].pageIndex + 1,
      }),
    }
  }, [queryState[0], paginationState[0], sortingState[0]])

  const params = new URLSearchParams(filters)

  return {
    paginationState,
    sortingState,
    queryState,
    params,
  }
}

export default useTable
