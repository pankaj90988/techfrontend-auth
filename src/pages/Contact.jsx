import React, { useState } from 'react'
import Swal from 'sweetalert2'
import './Contact.css'
import contactImage from '../assets/registration-3.png'

const Contact = () => {

  const [contact, setContact] = useState({
    username: "",
    email: "",
    message: "",
  })

  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setContact({
      ...contact,
      [name]: value,
    });

    // setContact((previousData) => ({
    //   ...previousData,
    //   [name]: value,
    // }));
  };

  const formHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://techbackend-h4vp.onrender.com/api/form/contact', {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(contact),
      });

      if (response.ok) {
        setContact({
          username: "",
          email: "",
          message: "",
        });

        const data = await response.json();
        Swal.fire({
          title: "Message sent successfully",
          icon: "success",
          draggable: true
        });

      }
    } catch (error) {
      Swal.fire({
        title: "Message not sent successfully",
        icon: "success",
        draggable: true
      });
      setContact({
        username: "",
        email: "",
        message: "",
      });
      console.log(error)
    }
  };

  return (
    <>
      <section className='contact-section-wrapper'>
        <div className="contact-heading-container">
          <div className="main-heading">
            <h2>Contact Us</h2>
          </div>
        </div>
        <div className="contact-content-container">


          <div className="contact-image-container">
            <img src={contactImage} height="400" alt="Contact Image" loading="lazy" />
          </div>


          <div className="contact-form-container">
            <form onSubmit={formHandler}>
              <div className='contact-label-input-cont'>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name='username'
                  id='username'
                  placeholder='Username'
                  value={contact.username}
                  onChange={inputHandler}
                  required
                />
              </div>
              <div className='contact-label-input-cont'>
                <label htmlFor="Email">Email</label>
                <input
                  type="email"
                  name='email'
                  id='email'
                  placeholder='Your Email'

                  value={contact.email}
                  onChange={inputHandler}
                  required
                />
              </div>
              <div className='contact-label-input-cont'>
                <label htmlFor="message">Message</label>
                <textarea
                  name="message"
                  id="message"
                  cols="40"
                  rows="6"
                  placeholder='Write Your Message here..'
                  style={{ resize: 'none' }}
                  value={contact.message}
                  onChange={inputHandler}
                ></textarea>
              </div>

              <div>
                <button type='submit' className='submit-btn'>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <section className='map-container-wrapper'>
        <div className='map-container'>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56985.23027858809!2d82.12122642514011!3d26.78975387061512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399a07937e6d2823%3A0x5fc8f683b17f222b!2sAyodhya%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1728987543892!5m2!1sen!2sin"
            width="92%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </>
  )
}

export default Contact