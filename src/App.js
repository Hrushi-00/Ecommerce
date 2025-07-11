import React from "react";
import "./index.css";
import Home from "./routes/Home"
import Shop from "./routes/Shop"
import Pages from "./routes/Pages"
import Blog from "./routes/Blog"
import Contact from "./routes/Contact"
import Addcart from "./components/Addcart";
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import PaymentDetails from "./components/pages/PaymentDetails"
import PaymentSucess from "./components/pages/PaymentSucess"
import Login from "./components/loginPages/Login";


const App = () => {
  
  return (
    <Provider store={appStore}>
  
   
  <Routes>
    
      <Route path="/" element={<Home/>} />
      <Route path="/shop" element={<Shop/>} />
      <Route path="/pages" element={<Pages/>} />
      <Route path="/blog" element={<Blog/>} />
      <Route path="/contact" element={<Contact/>} />
      <Route path="/Addtocart" element={<Addcart />}/>
      <Route path="/paymentdetail" element={<PaymentDetails/>} />
      <Route path="/paymentsucess" element={<PaymentSucess/>}/>
      <Route path="/login" element={<Login/>} />
   
      

      
    </Routes>
    
  
    </Provider>
  )
}

export default App