import React, { useState } from 'react'
import styles from './reviewsHead.module.css'
import { LockReview, Star } from '../../../../icons'
import Rating from '../../../../components/rating/Rating'
import PageText from '../../../../content/PagesText.json'
import { useSelector } from 'react-redux'
import PhotoUploader from '../../../../components/photoUploader/PhotoUploader'
import { Link } from 'react-router-dom'

const { productDetail } = PageText

export default function ReviewsHead() {
    const { lang, token } = useSelector((state) => state.baristica);
    const [selectedRating, setSelectedRating] = useState(0);
    const [commentText, setCommentText] = useState('')
    const [uploadedPhotos, setUploadedPhotos] = useState([]);

    const handlePhotosUpdate = (photos) => {
        setUploadedPhotos(photos);
    };

    const handleRatingChange = (rating) => {
        setSelectedRating(rating);
        console.log(`Выбранный рейтинг: ${rating}`);
    };

    const onSubmit = () => {
        const formData = {
            text: commentText,
            rating: selectedRating,
            images: uploadedPhotos
        }
        try {

        } catch (error) {

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
            <h2 className="f28 darkGrey_color fw500">{lang ? productDetail[lang].reviews.headerHeading : ''} </h2>

            {
                token
                    ?
                    <form action="" className={styles.reviewForm + ' mt24'}>
                        <input
                            type="text"
                            placeholder={lang ? productDetail[lang].reviews.inputPlaceHolder : ''}
                            onChange={(e) => setCommentText(e.target.value)}
                        />

                        <Rating totalStars={5} Star={Star} onChange={handleRatingChange} />

                        <PhotoUploader onPhotosUpdate={handlePhotosUpdate} text={lang ? productDetail[lang].reviews.addImg : ''} />

                        <ul>
                            {uploadedPhotos.map((url, index) => (
                                <img src={url} alt="" key={index} />
                            ))}
                        </ul>

                        <button className={styles.sendBtn}>
                            {lang ? productDetail[lang].reviews.sendBtn : ''}
                        </button>
                    </form>
                    :
                    unregisteredUserContent()
            }
        </div>
    )
}
