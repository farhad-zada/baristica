import React, { useEffect, useState } from 'react';
import styles from './rating.module.css';

const Rating = ({ submitted, setSubmitted ,totalStars = 5, Star, onChange }) => {
    const [rating, setRating] = useState(0);

    const handleRating = (index) => {
        const newRating = index + 1;
        setRating(newRating);
        if (onChange) {
            onChange(newRating); // Отправляем в родительский компонент
        }
    };

    useEffect(() => {
        if(submitted){
            setRating(0)
            setSubmitted(false)
        }
    },[submitted])

    return (
        <div className={styles.rating_container}>
            {Array.from({ length: totalStars }, (_, index) => (
                <span
                    key={index}
                    className={`${styles.star} ${
                        index < rating ? styles.active : styles.inactive
                    }`}
                    onClick={() => handleRating(index)}
                >
                    {Star}
                </span>
            ))}
        </div>
    );
};

export default Rating;
