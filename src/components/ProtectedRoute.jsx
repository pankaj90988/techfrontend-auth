import { jwtDecode } from "jwt-decode"
import { useEffect, useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useAuth } from "../store/AuthContextAPI"
import Loader from "./Loader"

const ProtectedRoute = ({ children }) => {

    const { logoutUser } = useAuth();
    const [isVerifying, setIsVerifying] = useState(true)
    const [isNewDeviceLogin, setIsNewDeviceLogin] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isnotgettoken, setisnotgettoken] = useState(false);
    const [errorMessage,setErrorMessage]=useState("");
    const token = localStorage.getItem('token');

    const token_and_session_checker = async () => {
        if (!token) {
            setIsVerifying(false);
            setIsAuthenticated(false);
            setisnotgettoken(true);
            return;
        }
      
        try {
            const response = await fetch('https://panku-auth.onrender.com/api/verify-session', {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const message = await response.json();
            console.log("message:", message);
            if (response.ok) {
                // toast.success(message.msg);
                setIsAuthenticated(true);
                
            } else {
                logoutUser();
                toast.error(message.detail);
                setErrorMessage(message.detail)
                setIsNewDeviceLogin(true);
                setIsAuthenticated(false);
            }
        } catch (error) {
            setIsAuthenticated(false);
            console.log("Something went wrong in protected route", error);
        } finally {
            setIsVerifying(false);
        }

    }

    useEffect(() => {
        token_and_session_checker();
    }, [token,logoutUser]);

    if (isVerifying) {
        return <Loader />
    }

    if (isAuthenticated) {
        return children;
    } else {

        if (isNewDeviceLogin) {
            return (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '80vh',
                    width: '100vw',
                    backgroundColor: '#f0f9ff',
                    textAlign: 'center',
                    padding: '20px',
                    boxSizing: 'border-box'
                }}>
                    
                    <div style={{
                        width: '80px',
                        height: '80px',
                        backgroundColor: '#dbeafe',
                        borderRadius: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: '20px'
                    }}>
                        <span style={{ fontSize: '40px', color: '#3b82f6' }}>🔒</span>
                    </div>

                    <h1 style={{
                        fontSize: '28px',
                        color: '#1e3a8a', 
                        marginBottom: '10px',
                        fontFamily: 'sans-serif'
                    }}>
                        Security Notification
                    </h1>

                    <p style={{
                        fontSize: '16px',
                        color: '#1e40af',
                        maxWidth: '400px',
                        lineHeight: '1.5',
                        marginBottom: '30px',
                        fontFamily: 'sans-serif'
                    }}>
                        {errorMessage}. Please <b>Re-login</b> to continue.
                        
                    </p>

                    <Link
                        style={{
                            padding: '12px 24px',
                            fontSize: '16px',
                            backgroundColor: '#2563eb',
                            color: 'white',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            textDecoration: 'none',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                        to={'/login'}
                    >
                        Proceed to Login
                    </Link>
                </div>
            );
        }

        if (isnotgettoken) {
            // toast.warn("We are sorry! Please login first to access this page")
            return <Navigate to="/login" replace />
        }

        
        return (
            <>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    width: '100vw',
                    backgroundColor: '#f8fafc', // Light grayish-blue background
                    textAlign: 'center',
                    padding: '20px',
                    boxSizing: 'border-box'
                }}>
                    {/* Error Icon (Pure CSS) */}
                    <div style={{
                        width: '80px',
                        height: '80px',
                        backgroundColor: '#fee2e2', // Light red circle
                        borderRadius: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: '20px'
                    }}>
                        <span style={{ fontSize: '40px', color: '#ef4444' }}>⚠️</span>
                    </div>

                    {/* Main Message */}
                    <h1 style={{
                        fontSize: '28px',
                        color: '#1e293b', // Dark slate color
                        marginBottom: '10px',
                        fontFamily: 'sans-serif'
                    }}>
                        Server Connection Refused
                    </h1>

                    {/* Sub Message */}
                    <p style={{
                        fontSize: '16px',
                        color: '#64748b', // Muted text color
                        maxWidth: '400px',
                        lineHeight: '1.5',
                        marginBottom: '30px',
                        fontFamily: 'sans-serif'
                    }}>
                        We're having trouble connecting to our server. This could be due to maintenance or a temporary network issue. Or check your internet connection!
                    </p>

                    {/* Retry Button */}
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            padding: '12px 24px',
                            fontSize: '16px',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            transition: 'background-color 0.2s'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
                    >
                        Try Refreshing
                    </button>
                </div>
            </>
        )
    }

}

export default ProtectedRoute