import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Timer from './Timer';
import './VerifyOTP.css'

const VerifyOTP = () => {
  const { email } = useParams();

  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [initialTime, setinitialTime] = useState(300); // 5 minutes

  /*=========
 OTP INPUT HANDLER
 =========*/
  const otpInputHandler = (e) => {
    setOtp(e.target.value.replace(/[^0-9]/g, ''))
  }


  /*=========
 OTP SUBMIT HANDLER FUNCTION
 =========*/
  const onsubmitOTPHandler = async (e) => {
    e.preventDefault();
    console.log(email)
    if (otp.length != 6) {
      return toast.warning("Please enter 6-digit OTP");
    }

    try {
      const response = await fetch('https://panku-auth.onrender.com/api/auth/verify-otp', {
        method: "POST",
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify({ email: email, otp: otp })
      });

      const message = await response.json();
      console.log(message)
      if (response.ok) {
        toast.success(message.msg || "OTP Verified!");
        setOtp("")
        navigate("/login");
      } else {
        toast.error(message.detail);
      }
    } catch (error) {
      toast.error("Connection failed. Check your server.", error);
    }
  };


  return (
    <div className="otp-container">
      <div className="otp-form-container">

        {/* Header Icon */}
        <div className='header-icon'>📧</div>
        <h2 className='header-heading' >Verify OTP</h2>
        <p>
          We've sent a 6-digit code to <br />
          <strong style={{ color: '#334155' }}>{email}</strong>
        </p>

        <form onSubmit={onsubmitOTPHandler}>
          <div style={{ marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="0 0 0 0 0 0"
              value={otp}
              onChange={otpInputHandler}
              maxLength="6"

              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              required
            />
          </div>

          <button
            type="submit"
            onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
          >
            Verify Account
          </button>
        </form>

        <div className='timer-container'>
          {
            <Timer initialTime={initialTime} setinitialTime={setinitialTime} />
          }
        </div>

        {initialTime === 0 && (
          <Link className='register-btn'
            to='/register'
          >
            Register Again
          </Link>
        )}

      </div>
    </div>
  );
};

export default VerifyOTP;
