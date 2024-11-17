import React from 'react'
import { Star } from '../../../../icons'
import styles from './review.module.css'

export default function Review({ review }) {
    return (
        <div className={styles.review}>
            <div className="reviewHead flex j-between">
                <div className="reviewHead_left flex g23 a-center">
                    <span className={styles.profileImg}>
                        <img src="" alt="profileImg" />
                    </span>
                    <div>
                        <p className='f16 fw400 darkGrey_color'>{Star} {review?.rating ? review.rating : '4.0'}</p>
                        <p className='f24 fw400 mt4'>{review?.holder ? review.holder : 'Name Surname'}</p>
                    </div>
                </div>
                <div className="date f16 fw400 darkGrey_color">{review?.date ? review.date : '12 sen 2024'}</div>
            </div>
            <div className="reviewBody mt20">
                <p className="f20 fw400 darkGrey_color">{review?.text ? review.text : 'Кофе с нотами бергамота, розы, жасмина и маракуйи, жасмина и маракуйи, жасмина…'}</p>
                <div className={styles.reviewImg + " flex g10 mt12"}>
                    {review?.photourls?.length && review.photourls.map((url, key) => (
                        <img src={url} alt={`image ${key + 1}`} key={key} />
                    ))}
                </div>
            </div>
        </div>
    )
}
