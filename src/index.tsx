import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import 'core-js'
import App from './App'
import store from './store/reducer'
import './i18n'
import { registerLicense } from '@syncfusion/ej2-base'
import { configureEcho } from '@laravel/echo-react'

registerLicense(import.meta.env.VITE_SYNCFUSION_LICENSE_KEY);
configureEcho({
  broadcaster: "pusher",
});

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
