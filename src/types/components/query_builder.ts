import { QueryBuilderComponent, RuleModel } from '@syncfusion/ej2-react-querybuilder'
import { Dispatch, SetStateAction } from 'react'
import { Model } from '../model'
import { Column } from './table'

export type QueryBuilderProps<T extends Model> = {
  fields: Column<T>[]
  setQuery: Dispatch<SetStateAction<RuleModel>>
} & QueryBuilderComponent['props']
