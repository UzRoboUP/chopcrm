import React from 'react'
import ReactDOM from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import { Provider } from 'react-redux'
import App from './App.tsx'
import store from './store'
import ErrorFallback from './ui/ErrorFallback.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.replace('/')}>
        <App />
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>,
)
