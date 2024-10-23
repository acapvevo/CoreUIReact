import { DropzoneOptions } from 'react-dropzone/.'
import { UseFormReturn } from 'react-hook-form'

export interface UploadFileProps {
  options?: DropzoneOptions
  form: UseFormReturn<UploadFileInput>
  needList: boolean
}

export interface UploadFileInput {
  files: File[]
}

export type UploadFileType = (props: UploadFileProps) => JSX.Element
