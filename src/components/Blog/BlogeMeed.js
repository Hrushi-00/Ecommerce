/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./BlogeMeed.css";
import cal from "../../assets/icon/calendar.png";
import img1 from "../../assets/blog/blog-1.jpg";
import img2 from "../../assets/blog/blog-2.jpg";
import img3 from "../../assets/blog/blog-3.jpg";
import img4 from "../../assets/blog/blog-4.jpg";
import img5 from "../../assets/blog/blog-5.jpg";
import img6 from "../../assets/blog/blog-6.jpg";
import img7 from "../../assets/blog/blog-7.jpg";
import img8 from "../../assets/blog/blog-8.jpg";
import img9 from "../../assets/blog/blog-9.jpg";


const fetchApi = [
  { id: 1, ImageData: img1, calendar: cal, date: "28 February 2020", title: "What Curling Irons Are The Best Ones" },
  { id: 2, ImageData: img2, calendar: cal, date: "28 February 2020", title: "Eternity Bands Do Last Forever" },
  { id: 3, ImageData: img3, calendar: cal, date: "28 February 2020", title: "The Health Benefits Of Sunglasses" },
  { id: 4, ImageData: img4, calendar: cal, date: "28 February 2020", title: "What Curling Irons Are The Best Ones" },
  { id: 5, ImageData: img5, calendar: cal, date: "28 February 2020", title: "Eternity Bands Do Last Forever" },
  { id: 6, ImageData: img6, calendar: cal, date: "28 February 2020", title: "The Health Benefits Of Sunglasses" },
  { id: 7, ImageData: img7, calendar: cal, date: "28 February 2020", title: "Eternity Bands Do Last Forever" },
  { id: 8, ImageData: img8, calendar: cal, date: "28 February 2020", title: "The Health Benefits Of Sunglasses" },
  { id: 9, ImageData: img9, calendar: cal, date: "28 February 2020", title: "The Health Benefits Of Sunglasses" },
];

function FashionNew() {
  return (
    <>
      <div className="bn-wrapper">
        <div className="blog-container">
  {fetchApi.map((val) => (
    <div key={val.id} className="blog-item">
      
      <div className="blog-trend-img">
        <img src={val.ImageData} alt={val.title} />
      </div>

      <div className="blog-info">
        <div className="calendar">
          <img src={val.calendar} alt="calendar" />
          <span className="date">{val.date}</span>
        </div>
        <h4>{val.title}</h4>
        <a href="#">Read More</a>
      </div>

    </div>
  ))}
</div>

      </div>
    </>
  );
}

export default FashionNew;
