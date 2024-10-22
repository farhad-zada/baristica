import React from 'react'
import HomeAdvantages from './HomeAdvantages'
import HomeBanner from './HomeBanner'
import HomeContact from './HomeContact'
import HomeInfo from './HomeInfo'
import ProductCard from '../../../components/productCard/ProductCard'

const Home = () => {
  return (
    <div className='home'>
      <HomeBanner/>
      <HomeAdvantages/>
      <HomeInfo/>
      <HomeContact/>
      <ProductCard />
    </div>
  )
}

export default Home