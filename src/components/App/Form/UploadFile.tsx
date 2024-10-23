import { UploadFileType } from '@/types/forms/uploadFile'
import { CTable, CTableBody, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import { useDropzone } from 'react-dropzone'

const UploadFile: UploadFileType = ({
  options,
  form: {
    watch,
    formState: { errors },
  },
  needList,
}) => {
  const { getInputProps, getRootProps } = useDropzone(options)
console.log(watch('files'))
  const list = watch('files').map((file) => {
    return (
      <CTableRow>
        <td>{file.name}</td>
        <td>{file.size}</td>
      </CTableRow>
    )
  })

  return (
    <section className="container">
      <div {...getRootProps({ className: 'py-3 d-flex justify-content-center border border-primary align-items-center ' })}>
        <input {...getInputProps()} />
        <p className='text-primary text-opacity-50'>Drag 'n' drop some files here, or click to select files</p>
      </div>
      {!!errors.files && <div className='invalid-feedback'>{errors.files.message}</div>}
      {needList && (
        <CTable responsive>
          <CTableHead color="primary">
            <CTableRow>
              <CTableHeaderCell>File Name</CTableHeaderCell>
              <CTableHeaderCell>File Size</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>{list}</CTableBody>
        </CTable>
      )}
    </section>
  )
}

export default UploadFile
