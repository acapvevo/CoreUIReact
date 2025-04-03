import Swal, { SweetAlertIcon, SweetAlertOptions } from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export type AlertProps = {
  type: SweetAlertIcon
} & SweetAlertOptions

const alertTitle = {
  success: 'Success!',
  error: 'Error!',
  warning: 'Warning!',
  info: 'Info!',
  question: 'Question?',
}

const sweetAlert = ({ type, title, ...props }: AlertProps) => {
  return withReactContent(Swal).fire({
    ...props,
    icon: type,
    title: title ?? alertTitle[type],
  })
}

export default sweetAlert
