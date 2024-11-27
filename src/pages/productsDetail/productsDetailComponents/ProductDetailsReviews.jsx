import React, { useEffect, useState } from 'react'
import ReviewsHead from './reviewsComponents/ReviewsHead'
import styles from '../productDetailComponentsCss/productsDetailReviews.module.css'
import ReviewsBody from './reviewsComponents/ReviewsBody'
import CommentsService from '../../../services/comments.service'
import { useSelector } from 'react-redux'
import Loading from '../../../components/loading/Loading'

export default function ProductDetailsReviews({ product }) {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(false)
  const { token } = useSelector(state => state.baristica)

  const commentsService = new CommentsService()

  const getComments = async () => {
    setLoading(true)
    try {
      const response = await commentsService.getProductComments(token, product._id)
      const comments = response.data.comments
      setReviews(comments)
    } catch (error) {

    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (JSON.stringify(product) !== '{}') {
      getComments()
    }
  }, [product])

  return (
    <div className={styles.reviews}>
      <Loading status={loading} />
      <ReviewsHead product={product} getComments={getComments} />
      <ReviewsBody reviews={reviews} />
    </div>
  )
}
