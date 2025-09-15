import React from 'react'
import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';
import Tabs from '../components/Tabs';

import Footer from '../components/Footer';
export default function Home() {
  return (
    <div>
      <Navbar />
      <Carousel/>
        <Tabs/>
        
        <Footer/>
    </div>
  )
}
