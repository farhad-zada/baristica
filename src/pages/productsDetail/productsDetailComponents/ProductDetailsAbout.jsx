import React from 'react'
import CoffeeAccesoriesAbout from './common/CoffeeAccesoriesAbout'
import styles from '../productDetailComponentsCss/productsDetailAbout.module.css'
import MachineAbout from './machineAbout/MachineAbout'

export default function ProductDetailsAbout({ product }) {
  return (
    <div className={styles.about}>
      {
        product.productType === 'Machine'
          ?
          <MachineAbout product={product} />
          :
          <CoffeeAccesoriesAbout product={product} />
      }
    </div>
  )
}
