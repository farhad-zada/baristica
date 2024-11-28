import React, { useState } from 'react'
import Review from './Review'

import pagesText from '../../../../content/PagesText.json'
import { useSelector } from 'react-redux'
const {productDetail} = pagesText
export default function ReviewsBody({reviews}) {
    // const [reviews,setReviews] = useState([{photourls: [1,2,3]},{photourls: [1,2,3]},{photourls: [1,2,3]}])
    const { lang } = useSelector((state) => state.baristica);

  return (
    <div>
        {
            reviews.length
            ?
            reviews.map((review, key) => (
                <Review review={review} key={key} />
            ))
            :
            <p className='text-center f20 fw400 darkGrey_color ptb58'>{lang ? productDetail[lang].reviews.noReviews : ''}</p>
        }
    </div>
  )
}
