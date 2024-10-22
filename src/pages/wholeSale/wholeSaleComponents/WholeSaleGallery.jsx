import React from 'react'
import style from "../wholeSaleCss/gallery.module.css"

import img1 from '../../../assets/img/img1.jpeg'
import img2 from '../../../assets/img/img2.jpeg'
import img3 from '../../../assets/img/img3.jpeg'
import img4 from '../../../assets/img/img4.jpeg'
import img5 from '../../../assets/img/img5.jpeg'

const WholeSaleGallery = () => {
    const images = [
        { id: 1, src: img1, alt: "Coffee Shop 1" },
        { id: 2, src: img2, alt: "Coffee Shop 2" },
        { id: 3, src: img3, alt: "Coffee Shop 3" },
        { id: 4, src: img4, alt: "Coffee Shop 4" },
        { id: 5, src: img5, alt: "Coffee Shop 5" },
      ];
    
      return (
        <div className={style.gallery_container}>
            <div className={style.horizontal_gallery}>
                {images.map((image) => (
                    <div key={image.id} className={style.gallery_item}>
                    <img src={image.src} alt={image.alt} className={style.gallery_image} />
                    </div>
                ))}
            </div>
        </div>
      );
}

export default WholeSaleGallery