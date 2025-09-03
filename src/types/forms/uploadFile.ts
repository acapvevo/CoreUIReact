import { z } from '@/libs/zod'
import { DropzoneOptions } from 'react-dropzone/.'
import { UseFormReturn } from 'react-hook-form'

export interface UploadFileProps {
  options?: DropzoneOptions
  needList: boolean
}

export type UploadFileInput = z.infer<typeof UploadFileScheme>
export const UploadFileScheme = z.object({
  files: z.array(z.instanceof(File)).min(1, 'At least one file is required'),
})

export type UploadFileType = (props: UploadFileProps) => JSX.Element
