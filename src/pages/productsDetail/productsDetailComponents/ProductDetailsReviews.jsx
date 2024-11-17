import React from 'react'
import ReviewsHead from './reviewsComponents/ReviewsHead'
import styles from '../productDetailComponentsCss/productsDetailReviews.module.css'

export default function ProductDetailsReviews() {

  return (
    <div className={styles.reviews}>
        <ReviewsHead />
    </div>
  )
}
