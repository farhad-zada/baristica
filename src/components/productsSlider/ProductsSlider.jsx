import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import styles from './ProductSlider.module.css'; // Custom styles
import ProductCard from '../productCard/ProductCard'

const ProductSlider = ({ products }) => {
    return (
        <div className={styles.sliderContainer}>
            <Swiper
                spaceBetween={20} // Adjust the space between slides
                slidesPerView={3} // Show 3 products at once
                breakpoints={{
                    // Define breakpoints for responsive design
                    640: {
                        slidesPerView: 1, // Show 1 product on small screens
                        spaceBetween: 10, // Space between slides on small screens
                    },
                    768: {
                        slidesPerView: 2, // Show 2 products on medium screens
                        spaceBetween: 15, // Space between slides on medium screens
                    },
                    1024: {
                        slidesPerView: 3, // Show 3 products on larger screens
                        spaceBetween: 80, // Space between slides on larger screens
                    },
                    1440:{
                        slidesPerView: 3, // Show 3 products on larger screens
                        spaceBetween: 100, // Space between slides on larger screens
                    }
                }}
            >
                {products && products.map((product, index) => (
                    <SwiperSlide key={index}>
                        <ProductCard product={product} /> {/* Render each product card */}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ProductSlider;
