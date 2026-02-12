import React, { useEffect } from 'react'
import { useAuth } from '../store/AuthContextAPI';
import { Navigate, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

const ProtectAdminPanelRoute = ({ children }) => {
    const { logoutUser } = useAuth();
    const token = localStorage.getItem('token')
    const navigate = useNavigate();

    if (!token) {
        return <Navigate to="/login" replace />
    }

    useEffect(() => {
        try {
            const decoded_payload = jwtDecode(token);
            const current_Time = Date.now() / 1000;
            if (decoded_payload.exp < current_Time) {
                logoutUser();
                toast.error('Token has been expired. Please login again to continue!')
                navigate('/login', { replace: true });
            }
            if (decoded_payload.role != 'admin') {
                navigate('/', { replace: true });
            }
            
        } catch (error) {
            console.log("Error in Protected route:", error);
            localStorage.removeItem('token');
            navigate('/login', { replace: true });
        }
    }, [logoutUser,navigate]);

    return children;
}

export default ProtectAdminPanelRoute