import React from 'react'
import "./Instagram.css"
import instaImage1 from "../assets/instagram/instagram-1.jpg"
import instaImage2 from "../assets/instagram/instagram-2.jpg"
import instaImage3 from "../assets/instagram/instagram-3.jpg"
import instaImage4 from "../assets/instagram/instagram-4.jpg"
import instaImage5 from "../assets/instagram/instagram-5.jpg"
import instaImage6 from "../assets/instagram/instagram-6.jpg"
const Instagram = () => {
  return (
   <>
<div className='insta-main'>
    <div className='insta-img'>
      <img src={instaImage1} alt='Multi-insta' />
      <img src={instaImage2} alt='Multi-insta' />
      <img src={instaImage3} alt='Multi-insta' />
      <img src={instaImage4} alt='Multi-insta' />
      <img src={instaImage5} alt='Multi-insta' />
      <img src={instaImage6} alt='Multi-insta' />
    </div>
    <div className="instagram__text">
        <h2 className='first-head'>Instagram</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <h3 className='second-head'>#Male_Fashion</h3>
    </div>
</div>
    </>
   
  )
}

export default Instagram
