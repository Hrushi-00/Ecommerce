import React from "react";
import "./BlogHeader.css";
import BlogBanner from "../../assets/breadcrumb-bg.jpg";

const BlogHeader = () => {
  return (
    <div className="blog-header">
        <img src={BlogBanner} alt="Blog Banner" className="blog-image" />
      <h1 className="blog-title">Our Blog</h1>
    </div>
  );
};

export default BlogHeader;
