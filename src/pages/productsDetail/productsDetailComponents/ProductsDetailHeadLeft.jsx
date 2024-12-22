import React, { useEffect, useState } from 'react'
import Gallery from '../../../components/gallery/Gallery'
import styles from '../productDetailComponentsCss/productsDetailHeadLeft.module.css'

export default function ProductsDetailHeadLeft({ product }) {
    const [images, setImages] = useState([])

    useEffect(() => {
        if (product?.images) {
            setImages(product.images)
        }
    }, [product])

    return (
        <div className={styles.image}>
            {
                images.length && images.length > 1
                    ?
                    <Gallery images={images} />
                    :
                    <div className={"flex j-center"}>
                        <img src={images.length ? images[0] : ''} alt="" />
                    </div>
            }
        </div>
    )
}
