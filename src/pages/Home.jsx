import React from 'react'
import MainBanner from '../components/MainBanner'
import Categories from '../components/Categories'
import BestSeller from '../components/BestSeller'
import MissionSection from '../components/below';
import Producers from '../components/meet';
import LatestBlogs from '../components/LatestBlogs';

import BottomBanner from '../components/BottomBanner'
import NewsLetter from '../components/NewsLetter'

const Home = () => {
  return (
    <div className='mt-10'>
      <MainBanner />
      
      <Categories />
      

      
      <NewsLetter />
    </div>
  )
}

export default Home