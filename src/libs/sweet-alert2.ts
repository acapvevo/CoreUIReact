import Swal, { SweetAlertIcon, SweetAlertOptions } from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

interface AlertProps extends Alert {
  title?: string
  html?: string | HTMLElement | JQuery | undefined
}

export interface Alert {
  type: SweetAlertIcon
  text: string
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

  if (!type && !text) return

  const alertSwal = withReactContent(Swal)
  const alert: SweetAlertOptions = {
    icon: type,
    title: title ?? alertTitle[type],
  }

  if (text) {
    alert['text'] = text
  } else if (html) {
    alert['html'] = html
  }

  alertSwal.fire(alert)
}

export default sweetAlert
