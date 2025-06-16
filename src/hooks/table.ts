import { PaginationState, SortingState } from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { formatQuery, RuleGroupType } from 'react-querybuilder'

const useTable = () => {
  const sortingState = useState<SortingState>([])
  const queryState = useState<RuleGroupType>({ combinator: 'and', rules: [] })
  const includeDeletedState = useState(false)
  const paginationState = useState<PaginationState>({
    pageSize: 10,
    pageIndex: 0,
  })

  const filters = useMemo(() => {
    return {
      query: formatQuery(queryState[0], 'json_without_ids'),
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
    includeDeletedState,
    params,
  }
}

export default useTable
