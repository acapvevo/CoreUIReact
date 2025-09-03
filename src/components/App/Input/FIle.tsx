import { FileProps } from '@/types/components/file'
import { UploadFileFormControl } from '@/utils/form'
import { SelectedEventArgs, UploaderComponent } from '@syncfusion/ej2-react-inputs'
import { useFieldArray, useForm } from 'react-hook-form'

const File = ({ selected: selectedProps, ...props }: FileProps) => {
  const { setValue } = useForm({
    formControl: UploadFileFormControl.formControl,
  })

  const selected = (args: SelectedEventArgs) => {
    setValue(
      'files',
      args.filesData.map((file) => file.rawFile as File),
      { shouldDirty: true },
    )

    selectedProps && selectedProps(args)
  }

  return <UploaderComponent {...props} selected={selected.bind(this)} />
}

export default File
