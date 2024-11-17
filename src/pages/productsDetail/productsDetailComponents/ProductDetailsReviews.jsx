import React from 'react'
import ReviewsHead from './reviewsComponents/ReviewsHead'
import styles from '../productDetailComponentsCss/productsDetailReviews.module.css'
import ReviewsBody from './reviewsComponents/ReviewsBody'

export default function ProductDetailsReviews() {

  return (
    <div className={styles.reviews}>
        <ReviewsHead />
        <ReviewsBody />
    </div>
  )
}
