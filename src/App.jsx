import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Service from './pages/Service'
import Register from './pages/Register'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Pagenotfound from './pages/Pagenotfound'
import ProtectedRoute from './components/ProtectedRoute'
import ProtectLoginRegister from './components/ProtectLoginRegister'
import VerifyOTP from './components/VerifyOTP'
import ForgotPassword from './components/ForgotPassword'
import AdminPanel from './components/AdminPanel'
import ProtectAdminPanelRoute from './components/ProtectAdminPanelRoute'
import WelcomePage from './components/WelcomePage'

const App = () => {
  const [isWelcomePage,setIsWelcomePage]=useState(true);
  const token=localStorage.getItem('token');

  useEffect(()=>{
      const timer = setTimeout(()=>{
          setIsWelcomePage(false);
      },6000)
      return ()=> clearTimeout(timer)
  },[])

   if(isWelcomePage && !token){
    return <WelcomePage/>
   }


  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>

          {/* Public Route */}

          <Route path='/register' element={
            <ProtectLoginRegister>
              <Register />
            </ProtectLoginRegister>

          } />

          <Route path='/login' element={
            <ProtectLoginRegister>
              <Login />
            </ProtectLoginRegister>
          } />

          <Route path='/verify-otp/:email' element={
            <VerifyOTP />
          }
          />

          <Route path='/reset-password' element={
            <ForgotPassword />
          }
          />

          <Route path='/admin-dashboard' element={
            <ProtectAdminPanelRoute>
              <AdminPanel />
            </ProtectAdminPanelRoute>
          } />

          {/* protected route */}
          <Route path='/' element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>

          } />
          <Route path='/about' element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>

          } />
          <Route path='/contact' element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>

          } />
          <Route path='/service' element={
            <ProtectedRoute>
              <Service />
            </ProtectedRoute>
          } />

          {/* protect route */}


          <Route path='*' element={<Pagenotfound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App