import React, { useState } from 'react'
import Swal from 'sweetalert2'
import {Link, useNavigate} from 'react-router-dom'
import './Register.css'
import RegiImage from '../assets/registration-3.png'

const Register = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    phone: ""
  });

  const inputHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({
      ...user,
      [name]: value,
    });
  }

  const formHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://techbackend-h4vp.onrender.com/api/auth/register', {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        Swal.fire({
          title: "Registration succesfull\nThank you",
          icon: "success",
          draggable: true
        });
        // const res_data = await response.json();
        //storing data in localstorage
        // sotreTokenInLocalStorage(res_data.token);
        // localStorage.setItem("token", res_data.token);

        setUser({
          username: "",
          email: "",
          password: "",
          phone: ""
        });
        navigate("/login");
      }else{
        Swal.fire({
          title: "Something went wrong try again",
          icon: "success",
          draggable: true
        });
        
      }
    } catch (error) {
      console.log("In Register:", error);
    }

  };


  return (
    <>
      <section className='register-section'>
        <main>
          <div className="registration-section">

            <div className="leftbox registration-image">
              <img src={RegiImage}
                alt="Registration Image"
                height="400"
                width="360"
              />
              <h2>Do the Registration And Code Together</h2>
            </div>

            <div className="right-box registration-form">
              <h1 className="main-heading">Register Yourself</h1>
              <br />
              <form onSubmit={formHandler}>
                <div className='register-label-input-cont'>
                  <label htmlFor="username">Username</label>
                  <input type="text"
                    name='username'
                    placeholder='Username'
                    id='username'
                    autoComplete='off'
                    value={user.username}
                    onChange={inputHandler}
                    required
                  />
                </div>
                <div className='register-label-input-cont'>
                  <label htmlFor="email">Email</label>
                  <input type="email"
                    name='email'
                    placeholder='Enter your email..'
                    id='email'
                    autoComplete='off'
                    value={user.email}
                    onChange={inputHandler}
                    required
                  />
                </div>
                <div className='register-label-input-cont'>
                  <label htmlFor="phone">Phone</label>
                  <input type="number"
                    name='phone'
                    placeholder='Phone Number'
                    id='phone'
                    autoComplete='off'
                    value={user.phone}
                    onChange={inputHandler}
                    required
                  />
                </div>
                <div className='register-label-input-cont'>
                  <label htmlFor="password">Password</label>
                  <input type="password"
                    name='password'
                    placeholder='Password'
                    id='password'
                    autoComplete='off'
                    value={user.password}
                    onChange={inputHandler}
                    required
                  />
                </div>

                <br />
                <button type='submit'
                  className='submit-btn'
                >Register Now</button>
              </form>
               
               <p className='already'>Already registred ?</p>
               <Link className="login-route" to='/login'>
                login
               </Link>
            </div>
          </div>
        </main>
      </section>
    </>
  )
}

export default Register