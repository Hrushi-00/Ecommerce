// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const ProductList = () => {
//   const [search, setSearch] = useState("");
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     if (search.trim() === "") {
//       setProducts([]);
//       return;
//     }

//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get(`http://localhost:8000/api/products/search?q=${search}`);
//         setProducts(res.data.products);
//       } catch (err) {
//         console.error("Search error:", err);
//       }
//     };

//     // Add a small delay (debounce) for better UX
//     const timeout = setTimeout(fetchProducts, 400);
//     return () => clearTimeout(timeout);
//   }, [search]);

//   return (
//     <div>
//       <input
//         type="search"
//         placeholder="Search products..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       <div className="product-grid">
//         {products.length > 0 ? (
//           products.map((p) => (
//             <div key={p._id} className="product-card">
//               <img src={p.image} alt={p.title} />
//               <h4>{p.title}</h4>
//               <p>{p.category}</p>
//               <p>₹{p.price}</p>
//               <p>⭐ {p.rating}</p>
//             </div>
//           ))
//         ) : (
//           <p>No products found</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductList;
