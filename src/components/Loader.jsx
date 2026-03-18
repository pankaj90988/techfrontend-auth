import React from 'react';

const Loader = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '90px',
            height: '20vh',
            width: '100%',
            // border:'1px solid red'
        }}>
            <div style={{
                width: '50px',
                height: '50px',
                border: '6px solid #f0e8e8',
                borderTop: '6px solid #14e348',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
            }}></div>
            <style>
                {`
          @keyframes spin {
            0% { 
              transform: rotate(0deg);
            }
            50%{
               border-radius: 50%;
               border-top: 6px solid #14e348;
              }
            100% { 
               transform: rotate(360deg);
            }
          }
        `}
            </style>
        </div>
    );
};

export default Loader;