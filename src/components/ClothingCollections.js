import React, { useState, useEffect } from 'react';
import './Clothing.css';
import banner1 from '../assets/banner/banner-1.jpg';
import banner2 from '../assets/banner/banner-2.jpg';
import banner3 from '../assets/banner/banner-3.jpg';
import { Link } from "react-router-dom";

const ClothingCollections = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
   
    setAnimate(true);
  }, []);

  return (
    <div className={`main-container ${animate ? 'slide-in' : ''}`}>
      <div className='img-first'>
        <img src={banner2} alt="Logo" />
        <h1>Accessories</h1>
      <Link to="/shop">Shop Now</Link>
      </div>
      <div className='container'>
        <div className='img-Second'>
          <img src={banner1} alt="Logo" />
          <h1>Clothing Collections 2030</h1>
           <Link to="/shop">Shop Now</Link>
        </div>
        <div className='img-third'>
          <img src={banner3} alt="Logo" />
          <h1>Shoes Spring 2030</h1>
           <Link to="/shop">Shop Now</Link>
        </div>
      </div>
    </div>
  );
};

export default ClothingCollections;
