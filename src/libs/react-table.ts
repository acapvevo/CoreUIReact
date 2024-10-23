import { checkDisplayValueByColName } from "@/utils/table"
import { ColumnDef } from "@tanstack/react-table"

export const generateColumnDefObject: <T>(colName:string, dispName: string) => ColumnDef<T> = (colName, dispName) => {
  return {
    accessorFn: (row) => checkDisplayValueByColName(colName, row[colName]),
    header: dispName,
    id: colName,
  }
}
