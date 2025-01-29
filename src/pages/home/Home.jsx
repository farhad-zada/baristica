import React, { useEffect, useState } from 'react'
import HomeAdvantages from './homeComponents/HomeAdvantages'
import HomeBanner from './homeComponents/HomeBanner'
import HomeContact from './homeComponents/HomeContact'
import HomeInfo from './homeComponents/HomeInfo'
import HomeProducts from './homeComponents/HomeProducts'
import { useLocation } from 'react-router-dom'
import Loading from '../../components/loading/Loading'

const Home = () => {
  const [isProductsLoaded, setIsProductsLoaded] = useState(false);
  const [loading,setLoading] = useState(false)
  const location = useLocation();

  // Выполняем скролл, если хеш присутствует в URL
  useEffect(() => {
    if(location.hash){
      setLoading(true)
    }
    if (isProductsLoaded && location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setLoading(false)
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, [isProductsLoaded, location.hash]);

  
  return (
    <div className='home'>
      <Loading status={loading} />
      <HomeBanner />
      <HomeProducts onLoad={() => {
        setIsProductsLoaded(true)
      }} />
      <HomeAdvantages />
      <HomeInfo />
      <HomeContact />
    </div>
  )
}

export default Home