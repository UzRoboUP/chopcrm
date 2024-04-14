import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from './components/ui/ErrorFallback.tsx'
import { Provider } from "react-redux"
import { store } from './redux/store.ts'
import Root from './pages/Root.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.replace('/')}>
        {/* <App /> */}
        <Root/>
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>,
)
