import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [isLoggedIn, setIsloggedIn] = useState(null);
  const [role, setRole] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [isLoading, setIsLoding] = useState(true);

  useEffect(() => {
    if (token && token != 'undefined') {
      try {
        const decoded_payload = jwtDecode(token);
        setRole(decoded_payload.role);
      } catch (error) {
         console.log("Decoding failed:",error);
         localStorage.removeItem('token');
         setToken(null)
      }
     
    }
    setIsLoding(false);
  }, [token]);

  // function which login the User
  const loginUser = (jwt_token) => {
    localStorage.setItem('token', jwt_token);
    setToken(jwt_token);
    return;
  }

  // function which logout the User
  const logoutUser = () => {
    localStorage.removeItem('token');
    setToken(null);
    setRole(null);
    return;
  }

  // create a bool variable which is updated according token
  const isLogin = !!token;
  return (
    <>
      <AuthContext.Provider value={{ isLogin, setIsloggedIn, role, setRole, token, setToken, isLoading, logoutUser, loginUser }}>
        {children}
      </AuthContext.Provider>
    </>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}