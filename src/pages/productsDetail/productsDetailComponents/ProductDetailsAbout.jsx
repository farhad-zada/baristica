import React from 'react'
import CoffeeAccesoriesAbout from './common/CoffeeAccesoriesAbout'
import styles from '../productDetailComponentsCss/productsDetailAbout.module.css'

export default function ProductDetailsAbout() {
  return (
    <div className={styles.about}>
      {
        <CoffeeAccesoriesAbout />
      }
    </div>
  )
}
