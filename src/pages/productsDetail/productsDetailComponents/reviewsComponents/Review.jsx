import React from 'react'
import { Star } from '../../../../icons'
import styles from './review.module.css'

import moment from "moment";
import { useSelector } from 'react-redux';


export default function Review({ review }) {
    const { lang } = useSelector(state => state.baristica)

    const formatDate = (dateString, lang) => {
        // Устанавливаем текущий язык для moment
        moment.locale(lang);

        // Форматируем дату
        return moment(dateString).format("D MMM YYYY"); // Пример: 12 sen 2024
    };
    console.log(review)
    return (
        <div className={styles.review}>
            <div className="reviewHead flex j-between">
                <div className="reviewHead_left flex g23 a-center">
                    {/* <span className={styles.profileImg}>
                        <img src="" alt="profileImg" />
                    </span> */}
                    <div>
                        <p className='f16 fw400 darkGrey_color'>{Star} {review?.rating ? review.rating : '4.0'}</p>
                        <p className='f24 fw400 mt4'>{review?.user ? review.user?.name : 'Name Surname'}</p>
                    </div>
                </div>
                <div className="date f16 fw400 darkGrey_color">{review?.updatedAt ? formatDate(review.updatedAt, lang) : '12 sen 2024'}</div>
            </div>
            <div className="reviewBody mt20">
                <p className="f20 fw400 darkGrey_color">{review?.text ? review.text : 'Кофе с нотами бергамота, розы, жасмина и маракуйи, жасмина и маракуйи, жасмина…'}</p>
                <div className={styles.reviewImg + " flex g10 mt12"}>
                    {
                        review?.photourls?.length ?
                            review.photourls.map((url, key) => (
                                <img src={url} alt={`image ${key + 1}`} key={key} />
                            ))
                            :
                            <></>
                    }
                </div>
            </div>
        </div>
    )
}
