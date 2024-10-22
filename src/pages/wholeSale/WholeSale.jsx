import React from 'react'
import WholeSaleInfo from './wholeSaleComponents/WholeSaleInfo'
import WholeSaleAddress from './wholeSaleComponents/WholeSaleAddress'
import WholeSaleGallery from './wholeSaleComponents/WholeSaleGallery'

const WholeSale = () => {
  return (
    <div className='wholeSale'>
        <WholeSaleInfo/>
        <WholeSaleAddress/>
        <WholeSaleGallery/>
    </div>
  )
}

export default WholeSale