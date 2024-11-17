// Gallery.js
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import styles from './Gallery.module.css';
import { Navigation, Thumbs } from 'swiper/modules';

const Gallery = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = React.useState(null);

  return (
    <div className={styles.galleryContainer}>
      {/* Main Image Slider */}
      <Swiper
        modules={[Navigation, Thumbs]}
        navigation
        thumbs={{ swiper: thumbsSwiper }}
        spaceBetween={10}
        className={styles.mainSlider}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} alt={`Slide ${index + 1}`} className={styles.mainImage} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Navigation */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        className={styles.thumbnailSlider}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className={styles.thumbnailSlide}>
            <img src={image} alt={`Thumbnail ${index + 1}`} className={styles.thumbnailImage} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Gallery;
