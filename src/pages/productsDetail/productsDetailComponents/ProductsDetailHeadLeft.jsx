import React, { useEffect, useState } from 'react'
import MockImg from '../../../assets/img/detailMock.png'
import Gallery from '../../../components/gallery/Gallery'

export default function ProductsDetailHeadLeft({ product }) {
    const [images, setImages] = useState([])

    useEffect(() => {
        if (product?.images) {
            setImages(product.images)
        }
    }, [product])
    return (
        <div>
            {
                images.length && images.length > 1
                    ?
                    <Gallery images={images} />
                    :
                    <div className="flex j-center">
                        <img src={images.length ? images[0] : MockImg} alt="" />
                    </div>
            }
        </div>
    )
}
