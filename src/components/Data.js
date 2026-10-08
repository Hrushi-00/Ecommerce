import hero2 from "../assets/hero/hero-2.jpg";
import hero1 from "../assets/hero/hero-1.jpg";

export const responsive = {
    superLargeDesktop: {

      breakpoint: { max: 4000, min: 1024 },
      items: 1
    },
  
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  export const productData =[
    {
        id:1,
        image: hero2,
    
        description:"A specialist label creating luxury essentials. Ethically crafted  with an unwavering commitment to exceptional quality.",
        name:"Fall - Winter Collections 2025"
    },
    {
        id:2,
        image: hero1,
     
        description:"A specialist label creating luxury essentials. Ethically  crafted with an unwavering commitment to exceptional quality.",
        name:"Fall - Winter Collections 2025"
    },
    
  ]

