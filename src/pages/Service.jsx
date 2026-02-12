import React, { useEffect, useState } from 'react'
import './Service.css'
import ServiceImage from '../assets/registration-3.png'
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { GiToken } from 'react-icons/gi';
import { useAuth } from '../store/AuthContextAPI';

const Service = () => {

  const { logoutUser } = useAuth();
  const [servicedata, setServicedata] = useState([]);
  const token = localStorage.getItem('token');

  /*
   =========
   SERVICE PAGE GET DATA HANDLER FUNCTION
   =========
  */
  const getServices = async () => {
    try {
      const response = await fetch('https://panku-auth.onrender.com/api/data/service', {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });


      const data = await response.json();
      if (response.ok) {
        const alldata = await data.message;
        setServicedata(alldata);

      } else {
        logoutUser();

        toast.error(data.detail)
      }
    } catch (error) {
      logoutUser();
      console.log("Something went wrong with internal server", error);
    }
  }

  useEffect(() => {
    getServices();
  }, []);


  return (
    <>
      <section className="service-section-wrapper">
        <div className="service-container">
          <h1 className="main-heading">Services</h1>
        </div>

        {
          <div className="card-container">

            {
              servicedata && servicedata.length > 0 ?
                (
                  servicedata.map((elem) => {
                    const { _id, price, description, provider, service, image } = elem;
                    return (
                      <>
                        {servicedata != null ?
                          <div className="card" key={_id}>
                            <div className="card-image">
                              <img src={image} alt="service image" width="200" />
                            </div>

                            <div className="card-details">
                              <div className="price-provider">
                                <p>{provider}</p>
                                <p>${price}</p>
                              </div>
                              <h2>{service}</h2>
                              <p>{description}</p>
                            </div>
                          </div> :
                          <>
                            <h1>loading...</h1>
                          </>
                        }
                      </>
                    )
                  })

                ) :
                (
                  <div>
                    <Loader />
                    <br />
                    <p style={{ color: "red" }}>Please check your internet connection</p>
                  </div>
                )
            }
          </div>
        }
      </section>
    </>
  )
}

export default Service