import React, { useState, useEffect } from 'react';
import './CarouselStyle.css';
import { Link } from "react-router-dom";

const Carousel2 = (props) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className={`cards ${animate ? 'slide-in' : ''}`}>
      
      {/* Social Icons */}
      <div className="social-icons">
        <a href="#"><i className="fab fa-facebook-f"></i></a>
        <a href="#"><i className="fab fa-twitter"></i></a>
        <a href="#"><i className="fab fa-pinterest-p"></i></a>
        <a href="#"><i className="fab fa-instagram"></i></a>
      </div>

      <div className={`components ${animate ? 'slide-in' : ''}`}>
        <p className="first">Summer Collection</p>
        <h1 className="heding">{props.name}</h1>
        <p className="discrip">{props.description}</p>
        <Link to="/shop">Shop Now</Link>
      </div>

      <div className="product--image">
        <img src={props.image} alt={props.name} />
      </div>

    </div>
  );
};

export default Carousel2;
