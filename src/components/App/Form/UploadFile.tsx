import { UploadFileInput, UploadFileType } from '@/types/forms/uploadFile'
import { UploadFileFormControl } from '@/utils/form'
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'

const UploadFile: UploadFileType = ({ options, needList }) => {
  const { getInputProps, getRootProps } = useDropzone(options)
  const {
    watch,
    formState: { errors },
  } = useForm({
    formControl: UploadFileFormControl.formControl,
  })

  return (
    <section className="container">
      <div
        {...getRootProps({
          className: 'py-3 d-flex justify-content-center border border-primary align-items-center ',
        })}
      >
        <input {...getInputProps()} />
        <p className="text-light text-opacity-50">
          Drag and drop some files here, or click to select files
        </p>
      </div>
      {!!errors.files && <div className="invalid-feedback">{errors.files.message}</div>}
      {needList && (
        <CTable responsive>
          <CTableHead color="primary">
            <CTableRow>
              <CTableHeaderCell>File Name</CTableHeaderCell>
              <CTableHeaderCell>File Size</CTableHeaderCell>
              <CTableHeaderCell>Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {watch('files').map((file) => {
              return (
                <CTableRow>
                  <CTableDataCell>{file.name}</CTableDataCell>
                  <CTableDataCell>{file.size}</CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                </CTableRow>
              )
            })}
          </CTableBody>
        </CTable>
      )}
    </section>
  )
}

export default UploadFile
