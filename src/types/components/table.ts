import { CSSProperties } from "react"

export type Columns = { [key: string]: string }
export type Data = { [key: string]: any }
export interface Listing {
  list: Data[]
  columns: Columns
}

export interface Stat {
  quantity: number
  percent: number
}

export interface TableProps extends Listing {
  style?: CSSProperties
}

export interface TableElementWithPagination extends TableProps {
  pageSize:number
}
