import React, { useEffect, useState } from 'react'
import './AdminPanel.css'
import { PiUserCircleThin } from "react-icons/pi";
import { toast } from 'react-toastify';
import Loader from './Loader';
import { use } from 'react';

const AdminPanel = () => {

    const [userData, setUserData] = useState([]);
    const [getawaitingEmail, setGetAwaitingEmail] = useState([]);
    const [messages, setMessages] = useState([]);

    /*
  =========
  DELETE MESSAGE HANDLER FUNCTION
  =========
 */
    const deleteMessageHandler = async (_id) => {
        try {
            const response = await fetch(`https://panku-auth.onrender.com/api/admin-dashboard/delete-contact/${_id}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            if (response.ok) {
                const updatedMessage = messages.filter((message) => message._id != _id)
                setMessages(updatedMessage);
                toast.success(data.msg);
            } else {
                toast.error(data.detail)
            }
        } catch (error) {
            console.log("Something went wrong in Contact delete:", error)
        }
    }

    /*
=========
FORMATE DATA AND TIME MESSAGE FUNCTION
=========
*/
    const formateDateTime = (created_at) => {
        const date = new Date(created_at);

        return new Intl.DateTimeFormat('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            timeZoneName: 'longOffset'
        }).format(date)

    }

    /*
=========
GET ALL MESSAGE HANDLER FUNCTION
=========
*/
    const getMessages = async () => {
        try {
            const response = await fetch('https://panku-auth.onrender.com/api/admin-dashboard/get-messages', {
                method: 'GET',
            });

            const data = await response.json();
            if (response.ok) {
                const allmessages = await data.queries;
                setMessages(allmessages);

            } else {
                toast.error(data.msg.detail);
            }
        } catch (error) {
            toast.error("Failed to connect to server.");
        }
    }


    /*
=========
GET ALL VERIFIED USERS FUNCTION HANDLER
=========
*/
    const getUser = async () => {
        try {
            const response = await fetch("https://panku-auth.onrender.com/api/admin-dashboard/get-user-details", {
                method: "GET",
            });

            const data = await response.json();
            if (response.ok) {
                const allusers = await data.users;
                setUserData(allusers);
            } else {
                toast.error(data.msg.detail[0]);
            }
        } catch (error) {
            toast.error("Failed to connect to server.");
        }
    }


    /*
=========
GET ALL AWAITED USERS FOR EMAIL VERIFICATION FUNCTION HANDLER
=========
*/
    const getAwaitingEmailVerification = async () => {
        try {
            const response = await fetch('https://panku-auth.onrender.com/api/admin-dashboard/awaiting-email-verification', {
                method: 'GET'
            });

            const data = await response.json();
            if (response.ok) {
                const awaitemail = await data.awaitedusers;
                setGetAwaitingEmail(awaitemail);
            } else {
                toast.error(data.msg.detail[0]);
            }
        } catch (error) {
            toast.error("Failed to connect to server.");
        }
    }

    useEffect(() => {
        getUser();
        getAwaitingEmailVerification();
        getMessages();
    }, []);





    return (
        <>
            <div className='admin-container'>
                <div className="left-cont">
                    <div>

                        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                            <h1 style={{ color: '#1a202c', fontSize: '24px', fontWeight: '700' }}>Verified Users</h1>

                            {/* <div className="search-cont">
                                <label htmlFor="search" style={{ color: 'black' }}>Find User:</label>
                                <input type='search' name='sear' id='search' placeholder='Find users'
                                    style={{ padding: '8px', outline: 'none' }}
                                /> 
                               //Later needs to be implimented
                            </div> */}

                        </div>


                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                            gap: '15px',
                            height:'900px',
                            overflowY:'auto',
                            fontFamily: 'system-ui, -apple-system, sans-serif'
                        }}>
                            {
                                userData && userData.length > 0 ?
                                    (
                                        userData.map((data) => {
                                            const { id, email, username } = data;
                                            return (
                                                <div key={id} style={{
                                                    backgroundColor: 'white',
                                                    borderRadius: '12px',
                                                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                                                    padding: '20px',
                                                    border: '1px solid #f1f5f9',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    position: 'relative',
                                                    transition: 'box-shadow 0.3s'
                                                }}>

                                                    <div style={{
                                                        position: 'absolute',
                                                        top: '15px',
                                                        right: '15px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '5px'
                                                    }}>
                                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }}></div>
                                                        <span style={{ fontSize: '11px', fontWeight: '600', color: '#10b981', textTransform: 'uppercase' }}>Active</span>
                                                    </div>


                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '18px' }}>
                                                        <div style={{
                                                            width: '45px',
                                                            height: '45px',
                                                            borderRadius: '10px',
                                                            backgroundColor: '#eff6ff',
                                                            color: '#3b82f6',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            fontSize: '18px',
                                                            fontWeight: '700',
                                                            border: '1px solid #dbeafe'
                                                        }}>
                                                            {username ? username[0].toUpperCase() : email[0].toUpperCase()}
                                                        </div>

                                                        <div>
                                                            <h3 style={{ margin: 0, fontSize: '15px', color: '#1e293b', fontWeight: '600' }}>
                                                                {username || 'Panku Member'}
                                                            </h3>
                                                            <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>Community Member</p>
                                                        </div>
                                                    </div>


                                                    <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontSize: '13px', marginBottom: '8px' }}>
                                                            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                                            <span style={{ wordBreak: 'break-all' }}>{email}</span>
                                                        </div>
                                                        <div style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'monospace' }}>
                                                            UID: {id}
                                                        </div>
                                                    </div>


                                                    <button
                                                        onClick={() => deleteUser(_id)}
                                                        style={{
                                                            width: '100%',
                                                            backgroundColor: 'transparent',
                                                            color: '#ef4444',
                                                            border: '1px solid #fee2e2',
                                                            padding: '8px',
                                                            borderRadius: '6px',
                                                            cursor: 'pointer',
                                                            fontWeight: '600',
                                                            fontSize: '13px',
                                                            transition: 'all 0.2s'
                                                        }}
                                                        onMouseOver={(e) => e.target.style.backgroundColor = '#fef2f2'}
                                                        onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                                                    >
                                                        Revoke Access
                                                    </button>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '50px' }}>
                                            <Loader />
                                            <p style={{ color: '#94a3b8', fontSize: '14px' }}>No verified members found.</p>
                                            <p style={{ color: '#de0e0e', fontSize: '14px' }}>Check your internet connection...</p>
                                        </div>
                                    )
                            }
                        </div>



                    </div>
                </div>

                {/* awaiting email verification and contact message section */}
                <div className="right-cont">
                    <div>
                        <div style={{ marginBottom: '20px' }}>
                            <h1 style={{ color: '#1a202c', fontSize: '24px', fontWeight: '700' }}>Awaiting Email Verification</h1>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                            gap: '15px',
                            fontFamily: 'system-ui, -apple-system, sans-serif'
                        }}>
                            {
                                getawaitingEmail && getawaitingEmail.length > 0 ?
                                    (
                                        getawaitingEmail.map((data) => {
                                            const { _id, email, username } = data;

                                            return (
                                                <div key={_id} style={{
                                                    backgroundColor: '#fff',
                                                    borderRadius: '12px',
                                                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                                                    padding: '20px',
                                                    border: '1px solid #e2e8f0',
                                                    borderLeft: '4px solid #f59e0b', // Amber border for "Warning/Pending" state
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    position: 'relative'
                                                }}>

                                                    <div style={{
                                                        position: 'absolute',
                                                        top: '12px',
                                                        right: '12px',
                                                        backgroundColor: '#fff7ed',
                                                        color: '#c2410c',
                                                        padding: '2px 8px',
                                                        borderRadius: '6px',
                                                        fontSize: '10px',
                                                        fontWeight: 'bold',
                                                        border: '1px solid #ffedd5'
                                                    }}>
                                                        OTP PENDING
                                                    </div>


                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
                                                        <div style={{
                                                            width: '40px',
                                                            height: '40px',
                                                            borderRadius: '50%',
                                                            backgroundColor: '#f8fafc',
                                                            color: '#64748b',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            fontSize: '16px',
                                                            fontWeight: 'bold',
                                                            border: '1px solid #e2e8f0'
                                                        }}>
                                                            {username ? username[0].toUpperCase() : '?'}
                                                        </div>
                                                        <div>
                                                            <h3 style={{ margin: 0, fontSize: '14px', color: '#334155', fontWeight: '600' }}>
                                                                {username || 'New Applicant'}
                                                            </h3>
                                                            <span style={{ fontSize: '11px', color: '#94a3b8' }}>Awaiting Verification</span>
                                                        </div>
                                                    </div>


                                                    <div style={{
                                                        backgroundColor: '#f1f5f9',
                                                        padding: '8px 12px',
                                                        borderRadius: '6px',
                                                        marginBottom: '18px',
                                                        fontSize: '12px',
                                                        color: '#475569'
                                                    }}>
                                                        <strong style={{ display: 'block', fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase' }}>Email Address</strong>
                                                        <span style={{ wordBreak: 'break-all' }}>{email}</span>
                                                    </div>


                                                    <div style={{ display: 'flex', gap: '10px' }}>
                                                        <button
                                                            onClick={() => handleManualApprove(_id)}
                                                            style={{
                                                                flex: 2,
                                                                backgroundColor: '#3b82f6',
                                                                color: 'white',
                                                                border: 'none',
                                                                padding: '10px',
                                                                borderRadius: '6px',
                                                                cursor: 'pointer',
                                                                fontWeight: '600',
                                                                fontSize: '13px'
                                                            }}
                                                        >
                                                            Force Approve
                                                        </button>
                                                        <button
                                                            onClick={() => deletePendingUser(_id)}
                                                            style={{
                                                                flex: 1,
                                                                backgroundColor: 'white',
                                                                color: '#ef4444',
                                                                border: '1px solid #fee2e2',
                                                                padding: '10px',
                                                                borderRadius: '6px',
                                                                cursor: 'pointer',
                                                                fontWeight: '600',
                                                                fontSize: '13px'
                                                            }}
                                                        >
                                                            Reject
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '30px', color: '#94a3b8' }}>
                                            <p>No users waiting for verification.</p>
                                        </div>
                                    )
                            }
                        </div>

                        {/* message section  */}
                        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', marginTop: "2rem" }}>
                            <h3 style={{ marginBottom: '15px', color: '#1a202c' }}>Contact Messages</h3>
                            <div style={{ display: 'grid', gap: '15px', height: '710px', overflowY: 'auto', borderTop: '1px solid #d1d5dc', paddingTop: '5px' }}>
                                {
                                    messages && messages.length > 0 ?
                                        (
                                            messages.map((msg) => {
                                                const { _id, username, email, message, created_at } = msg;

                                                return (
                                                    <>
                                                        <div style={{ border: '1px solid #edf2f7', padding: '15px', borderRadius: '8px' }} key={_id}>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                <strong style={{ color: '#2d3748' }}>From: {username}</strong>
                                                                <span style={{ fontSize: '12px', color: '#a0aec0' }}>{formateDateTime(created_at)}</span>
                                                            </div>
                                                            <p style={{ fontSize: '16px', color: '#4a5568', margin: '10px 0', textAlign: 'justify' }}>
                                                                {message}
                                                            </p>
                                                            <a href={`mailto:${email}`} style={{ fontSize: '13px', color: '#469ddb', textDecoration: 'none', border: '1px solid #63b3ed', padding: '5px', borderRadius: '5px', cursor: 'pointer' }}>
                                                                Reply via Email
                                                            </a>
                                                            <button onClick={() => deleteMessageHandler(_id)} style={{ fontSize: '13px', color: 'white', textDecoration: 'none', border: '1px solid #ed7a63', padding: '5px 10px', borderRadius: '5px', marginLeft: '90px', marginTop: '10px', cursor: 'pointer', backgroundColor: '#df4343', }}
                                                                onMouseOver={(e) => {
                                                                    e.target.style.backgroundColor = '#ed1d1d',
                                                                        e.target.style.color = 'white',
                                                                        e.target.style.scale = '1.1'
                                                                }}
                                                                onMouseOut={(e) => {
                                                                    e.target.style.backgroundColor = '#d46060'
                                                                    e.target.style.scale = '1'
                                                                }}
                                                            >Delete</button>
                                                        </div>

                                                    </>
                                                );
                                            })
                                        ) : (
                                            <>
                                                <Loader />
                                                <p style={{ color: "red", padding: "0px 10px" }}>Check your internet connection....</p>
                                            </>
                                        )

                                }

                            </div>

                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}

export default AdminPanel