import React from 'react'
import style from "./wholesale.module.css"
import WholesaleBanner from './wholesaleComponents/WholesaleBanner';
import WholesaleContact from './wholesaleComponents/WholesaleContact';
import WholesaleCooperation from './wholesaleComponents/WholesaleCooperation';
import WholesaleFAQ from './wholesaleComponents/WholesaleFAQ';
import WholesaleForm from './wholesaleComponents/WholesaleForm';
import WholesaleInformation from './wholesaleComponents/WholesaleInformation';
import WholesaleOffer from './wholesaleComponents/WholesaleOffer';

const Wholesale = () => {
  return (
    <div className={`${style.wholesale}`}>
      <WholesaleBanner/>
      <WholesaleCooperation/>
      <WholesaleOffer/>
      <WholesaleForm/>
      <WholesaleInformation/>
      <WholesaleContact/>
      <WholesaleFAQ/>
    </div>
  )
}

export default Wholesale;