import React, { useState } from 'react'
import styles from './reviewsHead.module.css'
import { LockReview, Star } from '../../../../icons'
import Rating from '../../../../components/rating/Rating'
import PageText from '../../../../content/PagesText.json'
import { useSelector } from 'react-redux'
import PhotoUploader from '../../../../components/photoUploader/PhotoUploader'
import { Link } from 'react-router-dom'
import CommentsService from '../../../../services/comments.service'
import Loading from '../../../../components/loading/Loading'
import ProductsService from '../../../../services/products.service'

const { productDetail } = PageText

export default function ReviewsHead({ getComments,product }) {
    const { lang, token } = useSelector((state) => state.baristica);
    const [selectedRating, setSelectedRating] = useState(0);
    const [commentText, setCommentText] = useState('')
    const [uploadedPhotos, setUploadedPhotos] = useState([]);
    const [loading, setLoading] = useState(false)
    const [submitted,setSubmitted] = useState(false)

    const commentsService = new CommentsService()
    const productsService = new ProductsService()

    const handlePhotosUpdate = (photos) => {
        setUploadedPhotos(photos);
    };

    const handleRatingChange = (rating) => {
        setSelectedRating(rating);
    };
    const addRating = async () => {
        const formData = {
            rating: selectedRating
        }

        try {
            const response = await productsService.rateProduct(token, product._id, formData)
            setCommentText('')
            setUploadedPhotos([])
            handleRatingChange(0)
            setSubmitted(true)
            await getComments()
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }

    const onSubmit = async () => {
        const formData = {
            comment: {
                text: commentText,
                // rating: selectedRating,  
                photourls: uploadedPhotos,
                productId: product._id
            }
        }

        setLoading(true)
        try {
            const response = await commentsService.createComment(token, formData)
            await addRating()

        } catch (error) {

        } finally {
            setLoading(false)
        }
    }

    const unregisteredUserContent = () => {
        return (
            <p className={styles.unregisteredUser + ' flex g10'}>
                {LockReview}
                <p>
                    <span>{lang ? productDetail[lang].reviews.unregisteredUser.text1 : ''}</span>
                    <Link to={'/login'}>{lang ? productDetail[lang].reviews.unregisteredUser.link1 : ''}</Link>
                    <span>{lang ? productDetail[lang].reviews.unregisteredUser.text2 : ''}</span>
                    <Link to={'/login'}>{lang ? productDetail[lang].reviews.unregisteredUser.link2 : ''}</Link>
                </p>
            </p>
        )
    }

    return (
        <div className={styles.reviewsHead}>
            <Loading status={loading} />
            <h2 className="f28 darkGrey_color fw500">{lang ? productDetail[lang].reviews.headerHeading : ''} </h2>

            {
                token
                    ?
                    <form action="" className={styles.reviewForm + ' mt24'}>
                        <input
                            type="text"
                            value={commentText}
                            placeholder={lang ? productDetail[lang].reviews.inputPlaceHolder : ''}
                            onChange={(e) => setCommentText(e.target.value)}
                        />

                        <Rating submitted={submitted} setSubmitted={setSubmitted} totalStars={5} Star={Star} onChange={handleRatingChange} />

                        <PhotoUploader photos={uploadedPhotos} setPhotos={setUploadedPhotos} onPhotosUpdate={handlePhotosUpdate} text={lang ? productDetail[lang].reviews.addImg : ''} />

                        <ul>
                            {
                                uploadedPhotos.length
                                    ?
                                    uploadedPhotos.map((url, index) => (
                                        <img src={url} alt="" key={index} />
                                    ))
                                    :
                                    <></>
                            }
                        </ul>

                        <button className={styles.sendBtn} type='button' onClick={onSubmit}>
                            {lang ? productDetail[lang].reviews.sendBtn : ''}
                        </button>
                    </form>
                    :
                    unregisteredUserContent()
            }
        </div>
    )
}
