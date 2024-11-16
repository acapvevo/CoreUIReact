import type { Field } from 'react-querybuilder'
import { QueryBuilder } from 'react-querybuilder'
import 'react-querybuilder/dist/query-builder.scss'
import {
  bootstrapControlClassnames,
  bootstrapControlElements,
  QueryBuilderBootstrap,
} from '@react-querybuilder/bootstrap'
import { SearchBuilderProps } from '@/types/components/search_builder'

const SearchBuilder = ({ fields, query, setQuery }: SearchBuilderProps) => {
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

export default SearchBuilder
