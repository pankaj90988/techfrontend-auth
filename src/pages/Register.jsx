import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Register.css'
import RegiImage from '../assets/registration-3.png'
import { toast } from 'react-toastify'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { BASE_URL } from '../api/apiConfig'

const Register = () => {

  const [isEyeopen, setisEyeopen] = useState(false);

  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    phone: ""
  });

  /*=========
 REGISTER INPUT HANDLER
 =========*/
  const inputHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === 'phone') {
      value = value.replace(/[^0-9]/g, '');
    }

    setUser({
      ...user,
      [name]: value,
    });
  }


  /*
   =========
   REGISTER SUBMIT HANDLER HANDLER
   =========
  */
  const formHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.msg);
        setUser({
          username: "",
          email: "",
          password: "",
          phone: ""
        });
        navigate(`/verify-otp/${user.email}`);
      } else {

        if (data.detail[0].msg) {
          toast.info(data.detail[0].msg);
        } else {
          // verify by backend that this credentail have account or not || user have account but enter wrong credetial
          console.log("From credentail", data.detail);
          toast.error(data.detail);
        }

      }
    } catch (error) {
      toast.error("Something went wrong. PLease check your internet connection!");
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
              <form onSubmit={(e) => formHandler(e)}>
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
                  <input type="text"
                    name='phone'
                    placeholder='Phone Number'
                    id='phone'
                    autoComplete='off'
                    value={user.phone}
                    onChange={inputHandler}
                    maxLength="10"
                    title='Please enter exact 10 digit'
                    required
                  />

                </div>
                <div className='register-label-input-cont'>
                  <label htmlFor="password">Password</label>
                  <input type={`${isEyeopen ? 'text' : 'password'}`}
                    name='password'
                    placeholder='Password'
                    id='password'
                    autoComplete='off'
                    value={user.password}
                    onChange={inputHandler}
                    required
                  />
                  {!isEyeopen ?
                    (<FaRegEyeSlash className='eye-icon' onClick={() => setisEyeopen(!isEyeopen)} />) :
                    (<FaRegEye className='eye-icon' onClick={() => setisEyeopen(!isEyeopen)} />)
                  }
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