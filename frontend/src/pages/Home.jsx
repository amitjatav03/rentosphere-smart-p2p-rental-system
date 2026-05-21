import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/homepage/Hero'
import FeaturedCategory from '../components/homepage/FeaturedCategory'
import HowItWorks from '../components/homepage/HowItWorks'
import Footer from '../components/homepage/Footer'
import Testimonials from '../components/homepage/Testimonials'
import FeaturedItems from '../components/homepage/FeaturedItems'
import WhyChooseUs from '../components/homepage/WhyChooseUs'
import axios from 'axios'

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const productsData = await axios.get(`http://localhost:4000/api/product/get-products/`);
        const allProductsData = productsData.data.products;
        setProducts(allProductsData || []);
      } catch(error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      }
    }

    fetchAllProducts();

  }, []);

  return (
    <div className='w-full relative'>
        <Hero />
        <FeaturedCategory />
        <HowItWorks />
        <FeaturedItems products={products} />
        <WhyChooseUs />
        <Testimonials />
        <Footer />
    </div>
  )
}

export default Home