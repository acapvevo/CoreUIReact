import { Dispatch, SetStateAction } from 'react'
import { Field, RuleGroupType, RuleType } from 'react-querybuilder'

export interface SearchBuilderProps {
  fields: Field[]
  setQuery: Dispatch<SetStateAction<RuleGroupType<RuleType<string, string, any, string>, string>>>
  query: RuleGroupType<RuleType<string, string, any, string>, string>
}
