import React from 'react'
import Navbar from '../components/Navbar'
const Shop = () => {
  return (
   <div>

      <Navbar />

      {/* INTERNAL CSS */}
      <style>{`
        .loader-fullscreen {
          height: 80vh;              /* takes full page height below navbar */
          display: flex;
          justify-content: center;   /* horizontally center */
          align-items: center;       /* vertically center */
          flex-direction: column;
        }

        .loader {
          width: 28px;
          height: 28px;
          border: 3px solid #ddd;
          border-top-color: #000;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          margin-bottom: 12px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .loader-text {
          font-size: 20px;
          font-weight: 600;
          color: #444;
        }
      `}
      </style>

      {/* CENTERED LOADER */}
      <div className="loader-fullscreen">
        <div className="loader"></div>
        <p className="loader-text">We’re working on this page. It will be available soon.....</p>
      </div>

    </div>
  )
}

export default Shop
