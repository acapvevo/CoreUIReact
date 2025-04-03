import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import 'core-js'
import App from './App'
import store from './store/reducer'
import './i18n'

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
