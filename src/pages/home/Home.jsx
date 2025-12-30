import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Snowfall from 'react-snowfall'

import Loading from '../../components/loading/Loading'
import HomeAdvantages from './homeComponents/HomeAdvantages'
import HomeContact from './homeComponents/HomeContact'
import HomeInfo from './homeComponents/HomeInfo'
import HomeProducts from './homeComponents/HomeProducts'
import HomeVideoBanner from './homeComponents/HomeVideoBanner'

const Home = () => {
  const location = useLocation()

  const [isProductsLoaded, setIsProductsLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [snow, setSnow] = useState(true)

  const snowflakeCount = window.innerWidth > 768 ? 1000 : 250

  // Scroll to hash after products load
  useEffect(() => {
    if (location.hash) setLoading(true)

    if (isProductsLoaded && location.hash) {
      const element = document.querySelector(location.hash)
      if (element) element.scrollIntoView({ behavior: 'smooth' })

      setLoading(false)
      window.history.replaceState(null, '', window.location.pathname)
    }
  }, [isProductsLoaded, location.hash])

  return (
    <div className="home" style={{ position: 'relative' }}>
      {/* ❄️ Snowfall */}
      {snow && (
        <Snowfall
          snowflakeCount={snowflakeCount}
          speed={[0.2, 1.2]}
          wind={[-0.2, 2.4]}
          radius={[0.9, 4.3]}
        />
      )}

      <Loading status={loading} />

      <HomeVideoBanner />
      <HomeProducts onLoad={() => setIsProductsLoaded(true)} />
      <HomeAdvantages />
      <HomeInfo />
      <HomeContact />
    </div>
  )
}

export default Home
