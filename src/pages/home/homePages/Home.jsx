import React from 'react'
import HomeAdvantages from './HomeAdvantages'
import HomeBanner from './HomeBanner'
import HomeContact from './HomeContact'
import HomeInfo from './HomeInfo'

const Home = () => {
  return (
    <div className='home'>
      <HomeBanner/>
      <HomeAdvantages/>
      <HomeInfo/>
      <HomeContact/>
    </div>
  )
}

export default Home