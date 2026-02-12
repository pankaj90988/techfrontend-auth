import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css'
import { toast } from 'react-toastify';
import Timer from './Timer';

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [initialTime, setinitialTime] = useState(300); // 5 minutes
  const [isotpSent, setisotpSent] = useState(false);


  /*
 =========
 INPUT EMAIL HANDLER FUNCTION TO GENERATE OTP
 =========
 */
  const inputEmailHandler = (e) => {
    setEmail(e.target.value);
  }

  const [user, setUser] = useState({
    password: "",
    otp: ""
  });


  /*
 =========
 NEW PASSWORD AND OTP INPUT HANDLER FUNCTION
 =========
 */
  const inputHandler = (e) => {
    let { name, value } = e.target;
    if (name == 'otp') {
      value = value.replace(/[^0-9]/g, '')
    }

    setUser({
      ...user,
      [name]: value
    })
  }

  /*
  =========
  OTP GENERATOR FUNCTION
  =========
  */
  const generateOTP = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://panku-auth.onrender.com/api/auth/forgot-password/generate-code', {
        method: 'POST',
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify({ "email": email })
      });
      const message = await response.json()
      if (response.ok) {
        setisotpSent(true)
        toast.success(message.msg)
      } else {
        toast.error(message.detail);
      }
    } catch (error) {
      toast.error("Server down. Please try again later!");
    }
  }


  /*
 =========
 OTP VERIFICATION SUBMIT HANDLER FUNCTION
 =========
 */
  const onsubmitResetPasswordHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://panku-auth.onrender.com/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify({ "email": email, "password": user.password, "otp": user.otp })
      });
      const message = await response.json();
      if (response.ok) {
        toast.success(message.msg);
        navigate("/login");
      } else {
        toast.error(message.detail[0]?.msg || "Invalid Reset Attempt");
      }
    } catch (error) {
      toast.error("Failed to connect to server.");
    }
    setUser({
      password: "",
      otp: ""
    });
    setEmail("");
  }


  return (
    <div className="forgot-password-wrapper-container">
      <div className='forgot-main-container'>
        <h2 style={{ textAlign: 'center', color: '#1e293b', marginBottom: '20px', fontFamily: 'sans-serif' }}>Reset Password</h2>

        {/* --- STEP 1: GENERATE OTP --- */}
        <form onSubmit={(e) => generateOTP(e)} className='form-1'>
          <div className="generate-otp-email-input-div">
            <label htmlFor="email" className="forgot-password-input-label">Enter Your Email:</label>
            <input type="email"
              className='forgot-password-input'
              name='email'
              placeholder='example@gmail.com'
              id='email'
              autoComplete='off'
              value={email}
              onChange={inputEmailHandler}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              required
            />
          </div>
          <button type="submit" className="submit-btn" style={{ width: '100%', padding: '10px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
            Generate OTP
          </button>
        </form>

        <div className='timer-container' style={{ textAlign: 'center', color: '#64748b', fontSize: '14px' }}>
          {isotpSent && <Timer initialTime={initialTime} setinitialTime={setinitialTime} />}
        </div>

        {/* --- STEP 2: RESET PASSWORD --- */}
        <form onSubmit={(e) => onsubmitResetPasswordHandler(e)}>
          <div className="reset-password-form-2-email-div">
            <label className="reset-password-form-2-email-label">Sending to:</label>
            <p id="emailHelp" className="reset-password-form-2-email-text">
              {email ? email : "example@gmail.com"}
            </p>
          </div>

          <div className="otp-input-div" style={{ marginBottom: '15px' }}>
            <label htmlFor="password" className="forgot-password-input-label" >New Password:</label>
            <input type="password"
              className='forgot-password-input'
              name='password'
              placeholder='********'
              id='password'
              value={user.password}
              onChange={inputHandler}
              onFocus={(e) => e.target.style.borderColor = '#10b981'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              required
            />
          </div>

          <div className="otp-input-div" style={{ marginBottom: '20px' }}>
            <label htmlFor="otp" className="forgot-password-input-label">Enter 6-Digit OTP:</label>
            <input type="text"
              className='forgot-password-otp-input'
              name='otp'
              placeholder='000000'
              id='otp'
              value={user.otp}
              onChange={inputHandler}
              onFocus={(e) => e.target.style.borderColor = '#10b981'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              maxLength="6"
              required
            />
          </div>

          <button type="submit" className="reset-password-form-2-submit-btn">
            Reset Password
          </button>
        </form>

      </div>
    </div>
  )
}

export default ForgotPassword