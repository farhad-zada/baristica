import React, { useState } from 'react'
import styles from './reviewsHead.module.css'
import { Star } from '../../../../icons'
import Rating from '../../../../components/rating/Rating'
import PageText from '../../../../content/PagesText.json'
import { useSelector } from 'react-redux'

const { productDetail } = PageText

export default function ReviewsHead() {
    const [selectedRating, setSelectedRating] = useState(0);
    const { lang } = useSelector((state) => state.baristica);

    const handleRatingChange = (rating) => {
        setSelectedRating(rating);
        console.log(`Выбранный рейтинг: ${rating}`);
    };
    return (
        <div>
            <h2 className="f28 darkGrey_color fw500">{lang ? productDetail[lang].reviews.headerHeading : ''} </h2>

            <form action="" className={styles.reviewForm + ' mt24'}>
                <input type="text" placeholder={lang ? productDetail[lang].reviews.inputPlaceHolder : ''} />

                <Rating totalStars={5} Star={Star} onChange={handleRatingChange} />

            </form>
        </div>
    )
}
