import React from 'react'
import HomeAdvantages from './homeComponents/HomeAdvantages'
import HomeBanner from './homeComponents/HomeBanner'
import HomeContact from './homeComponents/HomeContact'
import HomeInfo from './homeComponents/HomeInfo'
import HomeProducts from './homeComponents/HomeProducts'

const Home = () => {
  return (
    <div className='home'>
      <HomeBanner/>
      <HomeProducts />
      <HomeAdvantages/>
      <HomeInfo/>
      <HomeContact/>
    </div>
  )
}

export default Home