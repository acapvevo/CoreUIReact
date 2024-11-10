import Swal, { SweetAlertIcon, SweetAlertOptions } from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

type AlertProps = Alert & SweetAlertOptions

export interface Alert {
  type: SweetAlertIcon
}

const alertTitle = {
  success: 'Success!',
  error: 'Error!',
  warning: 'Warning!',
  info: 'Info!',
  question: 'Question?',
}

const sweetAlert = (props: AlertProps) => {
  const { type, text, title, html } = props

  const alertSwal = withReactContent(Swal)
  const alert: SweetAlertOptions = {
    ...props,
    icon: type,
    title: title ?? alertTitle[type],
  }

  return alertSwal.fire(alert)
}

export default sweetAlert
