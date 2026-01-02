import React from 'react'
import Navbar from '../components/Navbar'

import Carousel from '../components/Carousel'

import ClothingCollections from '../components/ClothingCollections'
import Product from '../components/Carts'
import Seal from '../components/Seal'
import Instagram from '../components/Instagram'
import FashionNew from '../components/FashionNew'
import Footer from '../components/Footer'
import ProductList from '../components/ProductList'

// import Focuscardsdemo from '../components/ui/Focuscardsdemo'


const Home = () => {
  
  
  return (
    <div style={{ position: 'relative', zIndex: 0 }}> 
      <Navbar/>
      <Carousel />
    <ClothingCollections />
    <Product />
    <Seal />
    <ProductList />
    <Instagram />
    <FashionNew/>
    {/* < Focuscardsdemo /> */}
    < Footer />

   
    </div>
  )
}

export default Home   ;
