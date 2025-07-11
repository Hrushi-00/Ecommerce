import React from 'react';
import CartWork from './CartWork';
import fetchApi from './CartData';
import "./Cart.css";

const Carts = () => {
  return (
    <div className="work-container">
      <h1 className="project-heading">Product</h1>
      <div className="main-project-container">
        {fetchApi.map((val, ind) => (
          <CartWork
            key={ind}
            items={val} 
          />
        ))}
      </div>
    </div>
  );
};

export default Carts;

