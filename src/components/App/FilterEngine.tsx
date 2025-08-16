import { QueryBuilder } from 'react-querybuilder'
import 'react-querybuilder/dist/query-builder.scss'
import {
  bootstrapControlClassnames,
  bootstrapControlElements,
  QueryBuilderBootstrap,
} from '@react-querybuilder/bootstrap'
import { FilterEngineProps } from '@/types/components/filter_engine'

const FilterEngine = ({ fields, query, setQuery }: FilterEngineProps) => {
  return (
    <QueryBuilderBootstrap>
      <QueryBuilder
        fields={fields}
        query={query}
        onQueryChange={setQuery}
        controlElements={bootstrapControlElements}
        controlClassnames={bootstrapControlClassnames}
      />
    </QueryBuilderBootstrap>
  )
}

export default FilterEngine
