import { Method } from "axios"

export interface Upload<R> extends UseFile {
  data: FormData
  onSuccess?: (data: R) => void
}

export interface Download<D> extends UseFile {
  data: D
}

interface UseFile {
  url: string
  method: Method
}
