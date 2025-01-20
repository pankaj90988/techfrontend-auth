import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import loginImage from '../assets/login-1.png'
import './Login.css'

const Login = () => {

  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });


  const inputHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setData({
      ...data,
      [name]: value
    });

  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://techbackend-h4vp.onrender.com/api/auth/login', {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        Swal.fire({
          title: "Login Successfully",
          icon: "success",
          draggable: true
        });
        setData({
          email: "",
          password: ""
        });
        navigate('/home');

      } else {
        Swal.fire({
          title: "Invalid Email or password",
          icon: "success",
          draggable: true
        });
      }
    } catch (error) {
      console.log("in login", error)
    }
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
              <h3>"Log in today to connect with other MERN FULL STACK DEVELOPERS and gain valuable insights!"</h3>
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
                    autoComplete='off'
                    value={data.email}
                    onChange={(e) => inputHandler(e)}
                    required
                  />
                </div>

                <div className='login-label-input-cont'>
                  <label htmlFor="password">Password</label>
                  <input type="password"
                    name='password'
                    placeholder='Password'
                    id='password'
                    autoComplete='off'
                    value={data.password}
                    onChange={(e) => inputHandler(e)}
                    required
                  />
                </div>

                <br />
                <button type='submit'
                  className='submit-btn'>Login</button>

              </form>

            </div>
          </div>
        </main>
      </section>
    </>
  )
}

export default Login