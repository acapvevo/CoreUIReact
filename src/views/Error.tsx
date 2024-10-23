import { isRouteErrorResponse, useRouteError } from "react-router-dom"
import { CButton, CCol, CFormInput, CInputGroup, CInputGroupText, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMagnifyingGlass } from '@coreui/icons'

const Page = ({code, text}: {code: number, text: string}) => {
  return (
    <CRow className="justify-content-center">
      <CCol md={6}>
        <span className="clearfix">
          <h1 className="float-start display-3 me-4">{code}</h1>
          <h4 className="pt-3">Houston, we have a problem!</h4>
          <p className="text-body-secondary float-start">
            {text}
          </p>
        </span>
        <CInputGroup className="input-prepend">
          <CInputGroupText>
            <CIcon icon={cilMagnifyingGlass} />
          </CInputGroupText>
          <CFormInput type="text" placeholder="What are you looking for?" />
          <CButton color="info">Search</CButton>
        </CInputGroup>
      </CCol>
    </CRow>
  )
}

const Error = () => {
  const error = useRouteError()

  if(!isRouteErrorResponse(error))
    return <></>

  return <Page code={error.status} text={error.statusText} />
}

export default Error
