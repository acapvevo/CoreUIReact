import { StrictMode } from 'react'
import { registerLicense } from '@syncfusion/ej2-base'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import 'core-js'
import App from './App'
import store from './store/reducer'
import './i18n'

registerLicense(import.meta.env.VITE_SYNCFUSION_LICENSE_KEY)

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
