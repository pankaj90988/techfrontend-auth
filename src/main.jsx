import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from './store/AuthContextAPI.jsx'
// import AuthProvider from './store/AuthContextAPI.jsx'

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <AuthProvider>
      <ToastContainer />
      <App />
    </AuthProvider>
  </StrictMode>

)
