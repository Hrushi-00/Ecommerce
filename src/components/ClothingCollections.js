  // import React, { useEffect, useState } from "react";
  // import "./Clothing.css";
  // import { Link } from "react-router-dom";
  // import banner1 from "../assets/banner/banner-1.jpg"; // Clothing
  // import banner2 from "../assets/banner/banner-2.jpg"; // Accessories
  // import banner3 from "../assets/banner/banner-3.jpg"; // Shoes

  // const ClothingCollections = () => {
  //   const [visible, setVisible] = useState(false);

  //   useEffect(() => {
  //     setTimeout(() => setVisible(true), 200);
  //   }, []);

  //   return (
  //     <section className={`collection-section ${visible ? "fade-in" : ""}`}>
  //       <h2 className="collection-title">Explore Our Collections</h2>
  //       <p className="collection-subtitle">Fresh arrivals and timeless essentials</p>

  //       <div className="collection-grid">
  //         {/* Accessories */}
  //         <div className="collection-card large">
  //           <img src={banner2} alt="Accessories" />
  //           <div className="collection-overlay">
  //             <h3>Accessories</h3>
  //             <Link to="/shop" className="shop-link">
  //               Shop Now
  //             </Link>
  //           </div>
  //         </div>

  //         {/* Clothing */}
  //         <div className="collection-card">
  //           <img src={banner1} alt="Clothing" />
  //           <div className="collection-overlay">
  //             <h3>Clothing Collections 2030</h3>
  //             <Link to="/shop" className="shop-link">
  //               Shop Now
  //             </Link>
  //           </div>
  //         </div>

  //         {/* Shoes */}
  //         <div className="collection-card">
  //           <img src={banner3} alt="Shoes" />
  //           <div className="collection-overlay">
  //             <h3>Shoes Spring 2030</h3>
  //             <Link to="/shop" className="shop-link">
  //               Shop Now
  //             </Link>
  //           </div>
  //         </div>
  //       </div>
  //     </section>
  //   );
  // };

  // export default ClothingCollections;
  import React, { useEffect, useState } from "react";
  import "./Clothing.css";
  import { Link } from "react-router-dom";
  import banner1 from "../assets/banner/banner-1.jpg"; // clothing
  import banner2 from "../assets/banner/banner-2.jpg"; // accessories
  import banner3 from "../assets/banner/banner-3.jpg"; // shoes

  const ClothingCollections = () => {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
      setTimeout(() => setAnimate(true), 300);
    }, []);

    return (
      <section className={`collections-section ${animate ? "fade-in" : ""}`}>
        <div className="collections-header">
          <h2>New Season Collections</h2>
          <p>Discover timeless styles and trending essentials</p>
        </div>

        <div className="collections-grid">
          {/* Left Featured */}
          <div className="collection-box large">
            <img src={banner1} alt="Clothing" />
            <div className="text-overlay">
              <h3>Clothing Collection 2030</h3>
              <Link to="/shop" className="btn-shop">Shop Now</Link>
            </div>
          </div>

          {/* Right Small - Top */}
          <div className="collection-box small">
            <img src={banner2} alt="Accessories" />
            <div className="text-overlay">
              <h3>Accessories</h3>
              <Link to="/shop" className="btn-shop">Shop Now</Link>
            </div>
          </div>

          {/* Right Small - Bottom */}
          <div className="collection-box small">
            <img src={banner3} alt="Shoes" />
            <div className="text-overlay">
              <h3>Shoes Spring 2030</h3>
              <Link to="/shop" className="btn-shop">Shop Now</Link>
            </div>
          </div>
        </div>
      </section>
    );
  };

  export default ClothingCollections;
