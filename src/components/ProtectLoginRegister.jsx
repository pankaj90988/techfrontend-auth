import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";


const ProtectLoginRegister=({children})=>{
    const token=localStorage.getItem('token')
    if(token){
        toast.warn("You already logged in")
        console.log("helloo....")
        return <Navigate to="/" replace/>
    }
    return children;
}

export default ProtectLoginRegister