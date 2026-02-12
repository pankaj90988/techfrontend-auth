import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { Link, useNavigate } from 'react-router-dom'
import loginImage from '../assets/login-1.png'
import './Login.css'
import { toast } from 'react-toastify'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useAuth } from '../store/AuthContextAPI'

const Login = () => {
  const { loginUser } = useAuth();

  const [isopen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });


  /*
   =========
   LOGIN INPUT HANDLER 
   =========
  */
  const inputHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setData({
      ...data,
      [name]: value
    });

  };


  /*
   =========
   LOGIN SUBMIT HANDLER 
   =========
  */
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://panku-auth.onrender.com/api/auth/login', {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
        },
        body: JSON.stringify(data)
      });
      const message = await response.json();

      if (response.ok) {
        toast.success(message.msg)
        const jwt_token = message.token
        if (localStorage.getItem('token')) {
          localStorage.removeItem('token')
        }
        loginUser(jwt_token);
        setData({
          email: "",
          password: ""
        });
        navigate("/");

      } else {
        // error message if email format is wrong
        if (message.detail[0].msg) {
          toast.info(message.detail[0].msg);
        } else {
          // verify by backend that this credentail have account or not || user have account but enter wrong credetial
          console.log("From credentail", message.detail)
          toast.error(message.detail);
        }

        setData({
          email: "",
          password: ""
        });


      }
    } catch (error) {
      toast.error("Something went wrong \nCheck your internet connection")
      console.log("In login:", error);
    }
  }

  // reset password endpoint 
  const ForgotPasswordHandler = async (e) => {
    e.preventDefault()
    navigate('/reset-password')

  }


  return (
    <>
      <section className='login-wrapper-section'>
        <main>
          <div className="login-content-container">
            <div className="leftbox login-image">
              <img src={loginImage}
                alt="Login Image"
                height="450"
              />
              <h3>Log in today to connect with other FARM FULL STACK PYTHON DEVELOPERS and gain valuable insights!</h3>
            </div>

            <div className="right-box login-form">
              <h1 className="main-heading">Login to Your Account</h1>
              <br />
              <form onSubmit={(e) => submitHandler(e)}>

                <div className='login-label-input-cont'>
                  <label htmlFor="email">Email</label>
                  <input type="email"
                    name='email'
                    placeholder='Enter your email..'
                    id='email'
                    // autoComplete='off'
                    value={data.email}
                    onChange={(e) => inputHandler(e)}
                    required
                  />
                </div>

                <div className='login-label-input-cont'>
                  <label htmlFor="password">Password</label>
                  <input type={`${isopen ? 'text' : 'password'}`}
                    name='password'
                    placeholder='Password'
                    id='password'
                    autoComplete='off'
                    value={data.password}
                    onChange={(e) => inputHandler(e)}
                    required
                  />
                  <p style={{ color: "#076cef", cursor: 'pointer' }} onClick={(e) => ForgotPasswordHandler(e)}>Forgot Password ?</p>
                  {!isopen ?
                    (<FaRegEyeSlash className='eye-icon' onClick={() => setIsOpen(!isopen)} />) :
                    (<FaRegEye className='eye-icon' onClick={() => setIsOpen(!isopen)} />)
                  }
                </div>

                <br />
                <button type='submit'
                  className='submit-btn'>Login</button>
                <br />
                <p>Don't have already account? <Link className='register-btn' to='/register'>Register</Link></p>

              </form>

            </div>
          </div>
        </main>
      </section>
    </>
  )
}

export default Login