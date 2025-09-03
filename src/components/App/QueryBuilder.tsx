import { QueryBuilderProps } from '@/types/components/query_builder'
import { Model } from '@/types/model'
import { QueryBuilderComponent } from '@syncfusion/ej2-react-querybuilder'
import { memo } from 'react'

const QueryBuilder = <T extends Model>({ fields, setQuery, ...rest }: QueryBuilderProps<T>) => {
  return (
    <QueryBuilderComponent
      width="100%"
      columns={fields.filter(({ includeInQuery }) => includeInQuery)}
      ruleChange={(e) => {
        setQuery(e.rule)
      }}
      {...rest}
    />
  )
}

export default memo(QueryBuilder) as typeof QueryBuilder
