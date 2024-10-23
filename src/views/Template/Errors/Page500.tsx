import { CButton, CCol, CFormInput, CInputGroup, CInputGroupText, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMagnifyingGlass } from '@coreui/icons'

const Page500 = () => {
  return (
    <CRow className="justify-content-center">
      <CCol md={6}>
        <span className="clearfix">
          <h1 className="float-start display-3 me-4">500</h1>
          <h4 className="pt-3">Houston, we have a problem!</h4>
          <p className="text-body-secondary float-start">
            The page you are looking for is temporarily unavailable.
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

export default Page500
