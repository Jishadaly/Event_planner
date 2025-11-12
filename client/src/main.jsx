import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux"
import { store, persistor } from './global/store.js'
import queryClient from './config/reactQuery.js'
import { QueryClientProvider } from '@tanstack/react-query'
import { ToastProvider } from './context/ToastContext.jsx'
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <ToastProvider position='bottom-right' motion='smooth' defaultDuration="5000">
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ToastProvider>
      </QueryClientProvider>
    </PersistGate>
  </Provider>
)
